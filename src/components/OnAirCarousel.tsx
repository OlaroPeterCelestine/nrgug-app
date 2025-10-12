'use client'

import { useState, useEffect } from 'react'
import { apiUtils } from '@/lib/api-utils'
import Image from 'next/image'

interface Show {
  id: number
  show_name: string
  image: string
  time: string
  presenters: string
  day_of_week: string
}

export default function OnAirCarousel() {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  
  // Get current day and map to our day filter options
  const getCurrentDayFilter = () => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    
    if (['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(currentDay)) {
      return 'weekdays'
    } else if (currentDay === 'Friday') {
      return 'Friday'
    } else if (currentDay === 'Saturday') {
      return 'Saturday'
    } else if (currentDay === 'Sunday') {
      return 'Sunday'
    }
    
    return 'weekdays' // fallback
  }
  
  const [selectedDay, setSelectedDay] = useState<string>(getCurrentDayFilter())

  useEffect(() => {
    fetchShows()
    
    // Set up auto-refresh every minute to update when shows end
    const interval = setInterval(() => {
      fetchShows()
    }, 60000) // Refresh every 60 seconds
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (shows.length > 0 && !selectedDay) {
      const availableDays = getUniqueDays()
      if (availableDays.length > 0) {
        setSelectedDay(availableDays[0])
      }
    }
  }, [shows, selectedDay])

  const fetchShows = async () => {
    try {
      console.log('🎯 Fetching shows from API... (Cache-busted)')
      setLoading(true)
      
      // Force fresh data by adding timestamp
      const timestamp = Date.now()
      console.log('🕐 Cache bust timestamp:', timestamp)
      
      const data = await apiUtils.fetchShows()
      console.log('✅ Shows data received:', data)
      console.log('📊 Total shows count:', data?.length || 0)
      console.log('📅 Shows by day:', data?.reduce((acc: Record<string, number>, show: Show) => {
        acc[show.day_of_week] = (acc[show.day_of_week] || 0) + 1
        return acc
      }, {} as Record<string, number>) || {})
      setShows(data || []) // Show all available shows
    } catch (error) {
      console.error('💥 Error fetching shows:', error)
    } finally {
      setLoading(false)
    }
  }

  // Function to check if a show is currently on air or upcoming
  const isShowOnAirOrUpcoming = (show: Show) => {
    const now = new Date()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' })
    const currentTime = now.toTimeString().slice(0, 5) // HH:MM format
    
    // Check if it's the right day
    if (show.day_of_week !== currentDay) {
      return false
    }
    
    // Parse show time - handle both "08:00" and "08:00 - 10:00" formats
    let startTime, endTime
    if (show.time.includes(' - ')) {
      [startTime, endTime] = show.time.split(' - ')
    } else {
      // If no end time, assume 2-hour duration
      startTime = show.time
      const [hours, minutes] = startTime.split(':').map(Number)
      const endHours = hours + 2
      endTime = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }
    
    // Check if current time is within the show's time range
    return currentTime >= startTime && currentTime <= endTime
  }

  // Function to check if a show is upcoming today
  const isShowUpcomingToday = (show: Show) => {
    const now = new Date()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' })
    const currentTime = now.toTimeString().slice(0, 5) // HH:MM format
    
    // Check if it's the right day
    if (show.day_of_week !== currentDay) {
      return false
    }
    
    // Parse show start time - handle both formats
    let startTime
    if (show.time.includes(' - ')) {
      [startTime] = show.time.split(' - ')
    } else {
      startTime = show.time
    }
    
    // Check if show starts after current time
    return currentTime < startTime
  }

  const getFilteredShows = () => {
    let filteredShows: Show[] = []
    
    console.log('🔍 Filtering shows for selectedDay:', selectedDay)
    console.log('📋 All shows:', shows.map(s => ({ id: s.id, name: s.show_name, day: s.day_of_week })))
    
    if (selectedDay === 'weekdays') {
      filteredShows = shows.filter(show => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(show.day_of_week))
    } else if (selectedDay === 'Saturday') {
      filteredShows = shows.filter(show => show.day_of_week === 'Saturday')
    } else if (selectedDay === 'Sunday') {
      filteredShows = shows.filter(show => show.day_of_week === 'Sunday')
    } else if (selectedDay === 'Friday') {
      filteredShows = shows.filter(show => show.day_of_week === 'Friday')
    } else {
      // If no day selected or invalid selection, return empty array
      filteredShows = []
    }
    
    console.log('✅ Filtered shows result:', filteredShows.length, 'shows for', selectedDay)
    console.log('📝 Filtered shows:', filteredShows.map(s => ({ id: s.id, name: s.show_name, day: s.day_of_week })))
    
    // Show all shows for the selected day - no time filtering
    
    // Sort shows in order: Saturday → Sunday → Mon-Thu → Friday
    return filteredShows
      .sort((a, b) => {
        // Create fixed day order: Saturday → Sunday → Mon-Thu → Friday
        const dayOrder = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        
        const aDayIndex = dayOrder.indexOf(a.day_of_week)
        const bDayIndex = dayOrder.indexOf(b.day_of_week)
        
        if (aDayIndex !== bDayIndex) {
          return aDayIndex - bDayIndex
        }
        
        // Then sort by start time within the same day
        const aStartTime = a.time.includes(' - ') ? a.time.split(' - ')[0] : a.time
        const bStartTime = b.time.includes(' - ') ? b.time.split(' - ')[0] : b.time
        return aStartTime.localeCompare(bStartTime)
      })
      .slice(0, filteredShows.length)
  }

  const getUniqueDays = () => {
    const days = shows.map(show => show.day_of_week)
    const uniqueDays = Array.from(new Set(days))
    
    const today = new Date().getDay()
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    // Check for each day group
    const hasWeekdays = uniqueDays.some(day => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(day))
    const hasSaturday = uniqueDays.includes('Saturday')
    const hasSunday = uniqueDays.includes('Sunday')
    const hasFriday = uniqueDays.includes('Friday')
    
    const groupedDays = []
    
    // Always show in order: Saturday → Sunday → Mon-Thu → Friday
    // But highlight current day
    if (hasSaturday) {
      groupedDays.push('Saturday')
    }
    if (hasSunday) {
      groupedDays.push('Sunday')
    }
    if (hasWeekdays) {
      groupedDays.push('weekdays')
    }
    if (hasFriday) {
      groupedDays.push('Friday')
    }
    
    return groupedDays
  }

  const isValidImageUrl = (url: string | null | undefined): boolean => {
    if (!url || url.trim() === '') return false
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const getImageSrc = (show: Show): string => {
    if (isValidImageUrl(show.image)) {
      return show.image
    }
    // Fallback to a default image or placeholder
    return '/shows/default-show.jpg'
  }

  return (
    <section className="text-white py-6 px-4 w-full mt-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 max-w-7xl mx-auto gap-4">
        <div>
          <h1 className="text-3xl font-bold">On Air</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Day Filter */}
          <div className="flex flex-wrap gap-2">
            {['weekdays', 'Friday', 'Saturday', 'Sunday'].map((day) => {
              const isSelected = selectedDay === day
              
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {day === 'weekdays' ? 'Mon-Thu' : day === 'Friday' ? 'Fri' : day === 'Saturday' ? 'Sat' : day === 'Sunday' ? 'Sun' : day}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              <i className="fas fa-radio text-4xl mb-4 block"></i>
              Loading shows...
            </div>
          </div>
        ) : shows.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              <i className="fas fa-radio text-4xl mb-4 block"></i>
              No shows available at the moment
            </div>
            <p className="text-gray-500">Check back later for our schedule</p>
          </div>
        ) : getFilteredShows().length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              <i className="fas fa-calendar text-4xl mb-4 block"></i>
              No shows scheduled for {selectedDay === 'all' ? 'this period' : selectedDay}
            </div>
            <p className="text-gray-500">Check back later or try a different day</p>
            <div className="mt-4 text-sm text-gray-600">
              <p>Current time: {new Date().toLocaleTimeString()}</p>
              <p>Current day: {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <p>Total shows available: {shows.length}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {getFilteredShows().map((show) => {
              // Only show LIVE/UPCOMING status for shows on the current day
              const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' })
              const isCurrentDay = show.day_of_week === currentDay
              const isCurrentlyOnAir = isCurrentDay && isShowOnAirOrUpcoming(show)
              const isUpcoming = isCurrentDay && isShowUpcomingToday(show)
              
              return (
                <div key={show.id} className="group">
                  <div className="relative">
                    <Image
                      src={getImageSrc(show)}
                      alt={show.presenters || `Show ${show.id}`}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 cursor-pointer rounded-xl hover:scale-105"
                    />
                    {isCurrentlyOnAir && (
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
                    <h3 className="text-lg font-bold mb-2">{show.show_name}</h3>
                    <p className="font-semibold text-red-500">{show.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
