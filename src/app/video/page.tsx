'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'

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

  // Fetch shows from API
  const fetchShows = async () => {
    try {
      const response = await fetch('https://nrgug-api-production.up.railway.app/api/shows')
      if (response.ok) {
        const data = await response.json()
        setShows(data)
      }
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
    
    // Filter shows for current day
    const todayShows = shows.filter(show => show.day_of_week === currentDay)
    
    if (todayShows.length === 0) return null

    // Find show that matches current time
    for (const show of todayShows) {
      const [startTime, endTime] = show.time.split(' - ')
      if (currentTime >= startTime && currentTime <= endTime) {
        return show
      }
    }

    // If no show matches current time, return the first show of the day
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

  const createPlayer = (type: 'listen' | 'watch') => {
    // This function is required by Header but not used on this page
    console.log('Player creation not needed on video page')
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{ paddingBottom: 0 }}>
      <Header createPlayer={createPlayer} />
      
      {/* Full Screen Video Container */}
      <div className="relative w-full bg-black" style={{ height: 'calc(100vh - 64px)' }}>
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

        {/* Overlay with Show Information */}
        <div className="absolute top-20 left-4 right-4 z-10">
          <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 max-w-md">
            {currentShow && (
              <>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {currentShow.show_name}
                </h1>
                <p className="text-gray-300 text-lg mb-2">
                  {currentShow.presenters}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <span className="text-red-400 font-medium text-lg">LIVE</span>
                  </div>
                  <span className="text-gray-300 text-lg">
                    {currentShow.time}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={currentShow?.image || "https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg"} 
                  alt={currentShow?.show_name || "NRG Live Video"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {currentShow?.show_name || 'NRG Live Video'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {currentShow?.presenters || 'Live from Kampala, Uganda'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>
                <span className="text-red-400 font-medium">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
