'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiUtils } from '@/lib/api-utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Show {
  id: number
  show_name: string
  image: string
  time: string
  presenters: string
  day_of_week: string
}

export default function VideoPage() {
  const [shows, setShows] = useState<Show[]>([])
  const [currentShow, setCurrentShow] = useState<Show | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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
  const getCurrentShow = (shows: Show[]) => {
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
      const show = getCurrentShow(shows)
      setCurrentShow(show)
    }
  }, [shows])

  // Update current show every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (shows.length > 0) {
        const show = getCurrentShow(shows)
        setCurrentShow(show)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [shows])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header createPlayer={() => {}} />
      
      {/* Full Screen Video Container */}
      <div className="relative w-full bg-black" style={{ height: '100vh' }}>
        {/* Video Player */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html"
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            title="NRG Radio Live Video"
          />
        </div>

        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => router.push('/')}
            className="w-12 h-12 bg-black/80 hover:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-600 hover:border-gray-400"
            title="Close Video"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* Show Information Card */}
        {currentShow && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black/90 backdrop-blur-md rounded-lg p-4 max-w-sm border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={currentShow.image || "https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg"} 
                    alt={currentShow.show_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg truncate">
                    {currentShow.show_name}
                  </h3>
                  <p className="text-gray-300 text-sm truncate">
                    {currentShow.presenters}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </div>
                    <span className="text-red-400 font-medium text-xs">LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      
      <Footer />
    </div>
  )
}
