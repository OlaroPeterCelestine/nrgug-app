'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { STREAMING_CONFIG, getStreamUrl, getApiUrl } from '@/config/streaming'
import { apiUtils } from '@/lib/api-utils'

export default function ListenPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [listenerCount, setListenerCount] = useState(1234)
  const [currentShow, setCurrentShow] = useState('Live Music')
  const [currentShowData, setCurrentShowData] = useState(null)
  const [streamError, setStreamError] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [schedule, setSchedule] = useState([])
  const [scheduleLoading, setScheduleLoading] = useState(true)


  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    audio.crossOrigin = 'anonymous'
    audio.preload = 'none'
    setAudioElement(audio)

    // Set up event listeners
    audio.addEventListener('loadstart', () => setStreamError(false))
    audio.addEventListener('error', () => setStreamError(true))
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
    audio.addEventListener('durationchange', () => setDuration(audio.duration))
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Load stream data
  useEffect(() => {
    const fetchStreamData = async () => {
      try {
        // Fetch listener count
        const listenerResponse = await fetch(getApiUrl('listenerCount'))
        if (listenerResponse.ok) {
          const data = await listenerResponse.json()
          setListenerCount(data.count || 1234)
        }

        // Fetch current show
        const showResponse = await fetch(getApiUrl('currentShow'))
        if (showResponse.ok) {
          const data = await showResponse.json()
          setCurrentShow(data.name || 'Live Music')
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

  // Update current show data when schedule changes
  useEffect(() => {
    const currentShow = getCurrentShowOnAir()
    if (currentShow) {
      setCurrentShowData(currentShow)
      setCurrentShow(currentShow.show_name)
    } else {
      setCurrentShowData(null)
      setCurrentShow('Live Music')
    }
  }, [schedule])

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

  // Helper function to get current show on air
  const getCurrentShowOnAir = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    const todaysShows = schedule.filter(show => show.day_of_week === today)
    
    return todaysShows.find(show => isShowOnAir(show)) || null
  }

  const togglePlay = () => {
    if (!audioElement) return

    if (isPlaying) {
      audioElement.pause()
    } else {
      // Set the audio source to the NRG Radio stream
      audioElement.src = getStreamUrl('audio')
      audioElement.play().catch(error => {
        console.error('Error playing audio:', error)
        setStreamError(true)
        // Try backup stream if primary fails
        audioElement.src = getStreamUrl('audio', true)
        audioElement.play().catch(backupError => {
          console.error('Backup stream also failed:', backupError)
        })
      })
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (audioElement) {
      audioElement.volume = newVolume / 100
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value)
    setCurrentTime(newTime)
    if (audioElement && isFinite(audioElement.duration) && audioElement.duration > 0) {
      audioElement.currentTime = newTime
    }
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
              Listen to <span className="text-red-500">NRG Radio</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tune in to the hottest music, latest news, and engaging shows. 
              Experience the best of Ugandan radio with NRG Radio Uganda.
            </p>
          </div>

          {/* Main Player */}
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col items-center space-y-8">
              {/* Station Info */}
              <div className="text-center">
                
                {currentShowData ? (
                  <div className="mb-4">
                    <div className="flex justify-center">
                      <Image
                        src={getShowImage(currentShowData)}
                        alt={currentShowData.show_name}
                        width={600}
                        height={250}
                        className="w-full max-w-4xl h-64 rounded-lg object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 mb-4">• {currentShow}</p>
                )}
                
              </div>

              {/* Show Name */}
              {currentShowData && (
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-white">{currentShowData.show_name}</h3>
                  <p className="text-gray-400 text-sm">Hosted by {currentShowData.presenters || 'NRG Team'}</p>
                </div>
              )}

              {/* Main Controls */}
              <div className="flex items-center justify-center">
                <button 
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors shadow-lg"
                >
                  {isPlaying ? (
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
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
              Get the NRG Radio app for the best listening experience on your mobile device
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
