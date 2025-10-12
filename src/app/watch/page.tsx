'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { STREAMING_CONFIG, getStreamUrl, getApiUrl } from '@/config/streaming'
import { apiUtils } from '@/lib/api-utils'

export default function WatchPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewerCount, setViewerCount] = useState(2156)
  const [currentShow, setCurrentShow] = useState('Live Show')
  const [streamError, setStreamError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [schedule, setSchedule] = useState([])
  const [scheduleLoading, setScheduleLoading] = useState(true)


  // Initialize iframe player
  useEffect(() => {
    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Load stream data
  useEffect(() => {
    const fetchStreamData = async () => {
      try {
        // Fetch viewer count
        const viewerResponse = await fetch(getApiUrl('listenerCount'))
        if (viewerResponse.ok) {
          const data = await viewerResponse.json()
          setViewerCount(data.count || 2156)
        }

        // Fetch current show
        const showResponse = await fetch(getApiUrl('currentShow'))
        if (showResponse.ok) {
          const data = await showResponse.json()
          setCurrentShow(data.name || 'Live Show')
        }

        // Fetch real schedule from API
        const scheduleData = await apiUtils.fetchShows()
        if (scheduleData) {
          setSchedule(scheduleData)
          setScheduleLoading(false)
        }
      } catch (error) {
        console.error('Error fetching stream data:', error)
        setScheduleLoading(false)
      }
    }

    fetchStreamData()
    const interval = setInterval(fetchStreamData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  // Helper function to get today's shows
  const getTodaysShows = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    return schedule.filter(show => show.day_of_week === today)
  }

  // Helper function to check if show is currently on air
  const isShowOnAir = (show) => {
    const now = new Date()
    const currentTime = now.toTimeString().slice(0, 5) // HH:MM format
    
    let startTime, endTime
    if (show.time.includes(' - ')) {
      [startTime, endTime] = show.time.split(' - ')
    } else {
      startTime = show.time
      const [hours, minutes] = startTime.split(':').map(Number)
      const endHours = hours + 2
      endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }
    
    return currentTime >= startTime && currentTime <= endTime
  }

  // Helper function to check if show is upcoming today
  const isShowUpcoming = (show) => {
    const now = new Date()
    const currentTime = now.toTimeString().slice(0, 5) // HH:MM format
    
    let startTime
    if (show.time.includes(' - ')) {
      [startTime] = show.time.split(' - ')
    } else {
      startTime = show.time
    }
    
    return currentTime < startTime
  }

  // Helper function to get show image
  const getShowImage = (show) => {
    if (show.image && show.image.startsWith('http')) {
      return show.image
    }
    return '/shows/default-show.jpg'
  }

  const togglePlay = () => {
    // For iframe-based video players, we can't directly control play/pause
    // The iframe handles its own controls
    // This is just for visual feedback
    setIsPlaying(!isPlaying)
  }

  const toggleFullscreen = () => {
    const iframe = document.querySelector('iframe')
    if (!iframe) return

    if (!isFullscreen) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen().then(() => {
          setIsFullscreen(true)
        }).catch(err => {
          console.error('Error attempting to enable fullscreen:', err)
        })
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false)
        }).catch(err => {
          console.error('Error attempting to exit fullscreen:', err)
        })
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    // Volume control is handled by the iframe player
    // This is just for visual feedback
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value)
    setCurrentTime(newTime)
    // Seek control is handled by the iframe player
    // This is just for visual feedback
  }

  const formatTime = (seconds: number) => {
    // Handle invalid or infinite duration (common with live streams)
    if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) {
      return '--:--'
    }
    
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Watch <span className="text-red-500">NRG TV</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience NRG Radio like never before with our live video stream. 
              Watch your favorite shows, see the hosts, and enjoy the full visual experience.
            </p>
          </div>

          {/* Main Video Player */}
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Video Container */}
            <div className={`relative ${isFullscreen ? 'h-screen' : 'aspect-video'} bg-black`}>
              {/* Video Player */}
              {!streamError ? (
                <iframe
                  src={getStreamUrl('video')}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen; microphone; camera"
                  allowFullScreen
                  title="NRG Radio Live Video Stream"
                  onError={() => setStreamError(true)}
                  onLoad={() => {
                    setIsLoading(false)
                    setStreamError(false)
                  }}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              ) : null}

              {/* Shimmer Loading Effect */}
              {isLoading && !streamError && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative">
                      {/* Shimmer Animation */}
                      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse mb-6 mx-auto relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        <div className="absolute inset-4 rounded-full bg-gray-800 flex items-center justify-center">
                          <Image
                            src="/nrg-logo.webp"
                            alt="NRG Radio Logo"
                            width={60}
                            height={60}
                            className="w-15 h-15 opacity-80"
                          />
                        </div>
                      </div>
                      
                      {/* Loading Text with Shimmer */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white mb-2 relative overflow-hidden">
                          <span className="relative z-10">Loading NRG TV...</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </h3>
                        <p className="text-gray-400 text-sm relative overflow-hidden">
                          <span className="relative z-10">Preparing your live stream experience</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                        </p>
                      </div>
                      
                      {/* Loading Dots */}
                      <div className="flex justify-center space-x-2 mt-6">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {streamError ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Image
                        src="/nrg-logo.webp"
                        alt="NRG Radio Logo"
                        width={80}
                        height={80}
                        className="w-20 h-20"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">NRG TV Live Stream</h3>
                    <p className="text-gray-400 mb-4">{currentShow}</p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        Stream Error
                      </span>
                      <span>•</span>
                      <span>HD Quality</span>
                      <span>•</span>
                      <span>{viewerCount.toLocaleString()} viewers</span>
                    </div>
                    <button 
                      onClick={() => setStreamError(false)}
                      className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      Retry Stream
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Video Controls Overlay - Only Fullscreen Button */}
              <div className={`absolute bottom-0 right-0 p-6 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex items-center space-x-4">
                  {/* Fullscreen Button */}
                  <button 
                    onClick={toggleFullscreen}
                    className="w-10 h-10 rounded bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">NRG TV Live Stream</h2>
                  <p className="text-gray-400">Live from Kampala, Uganda</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>


          {/* Today's Schedule */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Today's Schedule</h2>
            {scheduleLoading ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  <i className="fas fa-radio text-4xl mb-4 block"></i>
                  Loading today's schedule...
                </div>
              </div>
            ) : getTodaysShows().length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  <i className="fas fa-calendar text-4xl mb-4 block"></i>
                  No shows scheduled for today
                </div>
                <p className="text-gray-500">Check back later for our schedule</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {getTodaysShows().map((show, index) => {
                  const isOnAir = isShowOnAir(show)
                  const isUpcoming = isShowUpcoming(show)
                  
                  return (
                    <div key={show.id || index} className="group">
                      <div className="relative">
                        <Image
                          src={getShowImage(show)}
                          alt={show.presenters || `Show ${show.id}`}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover transition-transform duration-300 cursor-pointer rounded-xl hover:scale-105"
                        />
                        {isOnAir && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                            LIVE
                          </div>
                        )}
                        {isUpcoming && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            UPCOMING
                          </div>
                        )}
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="text-xl font-bold mb-2">{show.show_name}</h3>
                        <p className="font-semibold text-red-500 text-lg">{show.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Mobile App Downloads */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Download Our Mobile App</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get the NRG Radio app for the best viewing experience on your mobile device
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.nrgug.radio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-lg transition-colors duration-200 border border-gray-700"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
              
              <a
                href="https://apps.apple.com/app/nrg-radio-uganda/id1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-lg transition-colors duration-200 border border-gray-700"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
