'use client'

import { useState, useRef, useEffect } from 'react'
import { apiUtils } from '@/lib/api-utils'

interface BottomStickyPlayerProps {
  isVisible: boolean
  shouldStartPlaying?: boolean
  onPlaybackStarted?: () => void
}

interface Show {
  id: number
  show_name: string
  image: string
  time: string
  presenters: string
  day_of_week: string
}

export default function BottomStickyPlayer({ isVisible, shouldStartPlaying, onPlaybackStarted }: BottomStickyPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFullyExpanded, setIsFullyExpanded] = useState(false)
  const [shows, setShows] = useState<Show[]>([])
  const [currentShow, setCurrentShow] = useState<Show | null>(null)
  const [loading, setLoading] = useState(true)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fetch shows from API
  const fetchShows = async () => {
    try {
      const data = await apiUtils.fetchShows()
      setShows(data)
    } catch (error) {
      console.error('Failed to fetch shows:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get current day of week
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date().getDay()]
  }

  // Get current time in HH:MM format
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Find current show based on day and time
  const getCurrentShow = () => {
    if (shows.length === 0) return null

    const currentDay = getCurrentDay()
    const currentTime = getCurrentTime()
    
    // Filter shows for current day and sort by start time
    const todayShows = shows
      .filter(show => show.day_of_week === currentDay)
      .sort((a, b) => {
        const aStartTime = a.time.split(' - ')[0]
        const bStartTime = b.time.split(' - ')[0]
        return aStartTime.localeCompare(bStartTime)
      })
    
    if (todayShows.length === 0) return null

    // Find show that matches current time
    for (const show of todayShows) {
      const [startTime, endTime] = show.time.split(' - ')
      if (currentTime >= startTime && currentTime <= endTime) {
        return show
      }
    }

    // If no show matches current time, return the first show of the day (earliest)
    return todayShows[0]
  }

  useEffect(() => {
    fetchShows()
  }, [])

  useEffect(() => {
    if (shows.length > 0) {
      const show = getCurrentShow()
      setCurrentShow(show)
    }
  }, [shows])

  // Update current show every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (shows.length > 0) {
        const show = getCurrentShow()
        setCurrentShow(show)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [shows])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = "https://dc4.serverse.com/proxy/nrgugstream/stream"
      audioRef.current.preload = "none"
    }
  }, [])

  // Cleanup effect to handle component unmounting
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        // Pause and reset audio on cleanup
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  // Handle start playing signal
  useEffect(() => {
    if (shouldStartPlaying && audioRef.current && !isPlaying) {
      const audio = audioRef.current
      
      // Check if audio is still in the DOM
      if (audio.isConnected) {
        // Play immediately
        audio.play().then(() => {
          setIsPlaying(true)
          console.log('Audio started playing')
          if (onPlaybackStarted) {
            onPlaybackStarted()
          }
        }).catch((error) => {
          console.error('Play failed:', error)
          // Reset playing state on error
          setIsPlaying(false)
        })
      } else {
        console.warn('Audio element not connected to DOM, skipping play')
      }
    }
  }, [shouldStartPlaying, isPlaying, onPlaybackStarted])

  const togglePlayPause = () => {
    if (audioRef.current && audioRef.current.isConnected) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch((error) => {
          console.error('Play failed:', error)
          setIsPlaying(false)
        })
      }
    } else {
      console.warn('Audio element not available or not connected to DOM')
    }
  }


  // volume slider removed per design

  const toggleExpanded = () => {
    if (!isExpanded) {
      // First click: fully expand to nav bar
      setIsExpanded(true)
      setIsFullyExpanded(true)
    } else {
      // Reset to collapsed
      setIsExpanded(false)
      setIsFullyExpanded(false)
    }
  }

  const handlePlayerClick = () => {
    if (!isExpanded) {
      // Click anywhere: fully expand to nav bar
      setIsExpanded(true)
      setIsFullyExpanded(true)
    }
  }


  if (!isVisible) return null

  return (
    <div 
      className={`fixed left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-white/10 shadow-2xl transition-all duration-500 ease-in-out ${
        isFullyExpanded 
          ? 'top-16 bottom-0' // Expand to nav bar (assuming nav bar is ~64px/16 units)
          : 'bottom-0'
      }`}
    >
      {/* Expand/Collapse Handle */}
      <div className="flex justify-center py-2">
        <div
          onClick={(e) => {
            e.stopPropagation()
            toggleExpanded()
          }}
          className="cursor-pointer hover:opacity-70 transition-opacity p-1"
        >
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>

      {/* Close Button - Only visible when fully expanded */}
      {isFullyExpanded && (
        <div className="absolute top-4 right-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(false)
              setIsFullyExpanded(false)
            }}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Main Player Content */}
      <div className={`transition-all duration-500 ease-in-out ${
        isFullyExpanded 
          ? 'h-full flex flex-col justify-center px-6' 
          : isExpanded 
            ? 'h-20 sm:h-24' 
            : 'h-16 sm:h-18'
      }`}>
        <div 
          className={`flex items-center h-full ${
            isFullyExpanded ? 'flex-col space-y-8' : 'px-4'
          }`}
          onClick={handlePlayerClick}
        >
          {/* Album Art */}
          <div className={`flex-shrink-0 ${isFullyExpanded ? 'mr-0' : 'mr-3 sm:mr-4'}`}>
            <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
              isFullyExpanded 
                ? 'w-48 h-48 sm:w-56 sm:h-56' 
                : isExpanded 
                  ? 'w-16 h-16 sm:w-20 sm:h-20' 
                  : 'w-12 h-12 sm:w-14 sm:h-14'
            }`}>
              <img 
                src={currentShow?.image || "https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg"} 
                alt={currentShow?.show_name || "NRG Live Radio"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Track Info */}
          <div className={`${isFullyExpanded ? 'text-center' : 'flex-1 min-w-0 mr-3 sm:mr-4'}`}>
            <div className={`${isFullyExpanded ? 'mb-4' : 'mb-1'}`}>
              <h3 className={`text-white font-semibold transition-all duration-500 ${
                isFullyExpanded 
                  ? 'text-2xl sm:text-3xl mb-2' 
                  : isExpanded 
                    ? 'text-sm sm:text-base truncate' 
                    : 'text-xs sm:text-sm truncate'
              }`}>
                {currentShow?.show_name || 'NRG Live Radio'}
              </h3>
              <p className={`text-gray-400 transition-all duration-500 ${
                isFullyExpanded 
                  ? 'text-lg sm:text-xl' 
                  : isExpanded 
                    ? 'text-xs sm:text-sm truncate' 
                    : 'text-xs truncate'
              }`}>
                {currentShow?.presenters || 'Live from Kampala, Uganda'}
              </p>
            </div>
            
            {/* Live Indicator and Show Time */}
            <div className={`flex items-center ${isFullyExpanded ? 'justify-center mb-6' : 'mb-1'}`}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className={`text-green-400 font-medium ${
                    isFullyExpanded ? 'text-sm sm:text-base' : 'text-xs'
                  }`}>
                    LIVE
                  </span>
                </div>
                {currentShow && (
                  <div className={`text-gray-300 ${
                    isFullyExpanded ? 'text-sm sm:text-base' : 'text-xs'
                  }`}>
                    {currentShow.time}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className={`flex items-center ${isFullyExpanded ? 'mt-8' : ''}`}>
            {/* Play/Pause */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePlayPause()
              }}
              className={`bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg ${
                isFullyExpanded 
                  ? 'w-20 h-20 sm:w-24 sm:h-24 shadow-2xl' 
                  : isExpanded 
                    ? 'w-12 h-12 sm:w-14 sm:h-14' 
                    : 'w-10 h-10 sm:w-12 sm:h-12'
              }`}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="black" className={`${
                  isFullyExpanded 
                    ? 'w-10 h-10 sm:w-12 sm:h-12' 
                    : isExpanded 
                      ? 'w-6 h-6 sm:w-7 sm:h-7' 
                      : 'w-5 h-5 sm:w-6 sm:h-6'
                }`}>
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="black" className={`${
                  isFullyExpanded 
                    ? 'w-10 h-10 sm:w-12 sm:h-12 ml-1 sm:ml-2' 
                    : isExpanded 
                      ? 'w-6 h-6 sm:w-7 sm:h-7 ml-0.5 sm:ml-1' 
                      : 'w-5 h-5 sm:w-6 sm:h-6 ml-0.5 sm:ml-1'
                }`}>
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  )
}


