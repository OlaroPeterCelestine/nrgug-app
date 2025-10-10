'use client'

import { useState, useRef, useEffect } from 'react'

interface BottomStickyPlayerProps {
  isVisible: boolean
}

export default function BottomStickyPlayer({ isVisible }: BottomStickyPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = "https://dc4.serverse.com/proxy/nrgugstream/stream"
      audioRef.current.preload = "none"
      
      // Simulate buffering for a few seconds
      setTimeout(() => {
        setIsBuffering(false)
      }, 2000)
    }
  }, [])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }


  // volume slider removed per design

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }


  if (!isVisible) return null

  return (
    <div className={`fixed left-0 right-0 bottom-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 shadow-2xl transition-all duration-300 ease-in-out`}>
      {/* Expand/Collapse Button */}
      <div className="flex justify-center py-1">
        <button
          onClick={toggleExpanded}
          className="w-8 h-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors"
        >
          <div className="flex justify-center items-center h-full">
            {isExpanded ? (
              <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                <path d="M7 14l5-5 5 5z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Main Player Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isExpanded ? 'h-24 sm:h-28' : 'h-16 sm:h-20'
      }`}>
        <div className="flex items-center px-2 sm:px-4 py-2 sm:py-3 h-full">
          {/* Album Art */}
          <div className="flex-shrink-0 mr-2 sm:mr-4">
            <div className={`bg-gray-700 rounded-lg overflow-hidden transition-all duration-300 ${
              isExpanded ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-16 sm:h-16'
            }`}>
              <img 
                src="https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg" 
                alt="NRG Live Radio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0 mr-2 sm:mr-4 lg:ml-8">
            <div className="flex items-center mb-1 lg:ml-2">
              <div className={`mr-1 sm:mr-2 transition-all duration-300 ${
                isExpanded ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-3 h-3 sm:w-4 sm:h-4'
              }`}>
                <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              </div>
              <span className={`text-white font-medium truncate transition-all duration-300 ${
                isExpanded ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
              }`}>
                {isBuffering ? 'Buffering...' : 'NRG Live Radio Stream'}
              </span>
            </div>
            <div className={`text-gray-300 truncate transition-all duration-300 ${
              isExpanded ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
            }`}>
              Live from Kampala, Uganda
            </div>
            {isExpanded && (
              <div className="flex items-center mt-1">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-red-400 text-xs font-semibold">LIVE</span>
              </div>
            )}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center mr-2 sm:mr-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className={`bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 ${
                isExpanded ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10 sm:w-12 sm:h-12'
              }`}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="black" className={`${
                  isExpanded ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-5 h-5 sm:w-6 sm:h-6'
                }`}>
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="black" className={`${
                  isExpanded ? 'w-6 h-6 sm:w-7 sm:h-7 ml-0.5 sm:ml-1' : 'w-5 h-5 sm:w-6 sm:h-6 ml-0.5 sm:ml-1'
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


