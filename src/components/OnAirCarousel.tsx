'use client'

import { useState, useEffect } from 'react'
import { apiUtils } from '@/lib/api-utils'
import Image from 'next/image'
import Link from 'next/link'

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
  const [selectedDay, setSelectedDay] = useState<string>('all')

  useEffect(() => {
    fetchShows()
  }, [])

  const fetchShows = async () => {
    try {
      console.log('🎯 Fetching shows from API...')
      setLoading(true)
      const data = await apiUtils.fetchShows()
      console.log('✅ Shows data received:', data)
      setShows((data || []).slice(0, 6)) // Show only the first 6 shows
    } catch (error) {
      console.error('💥 Error fetching shows:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredShows = () => {
    let filteredShows = []
    
    if (selectedDay === 'all') {
      filteredShows = shows
    } else if (selectedDay === 'weekdays') {
      filteredShows = shows.filter(show => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(show.day_of_week))
    } else {
      filteredShows = shows.filter(show => show.day_of_week === selectedDay)
    }
    
    // Sort shows by start time within each day, starting from current day
    return filteredShows
      .sort((a, b) => {
        // Get current day and create day order starting from today
        const today = new Date().getDay()
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const currentDayName = dayNames[today]
        
        // Create day order starting from current day
        const dayOrder = []
        for (let i = 0; i < 7; i++) {
          const dayIndex = (today + i) % 7
          dayOrder.push(dayNames[dayIndex])
        }
        
        const aDayIndex = dayOrder.indexOf(a.day_of_week)
        const bDayIndex = dayOrder.indexOf(b.day_of_week)
        
        if (aDayIndex !== bDayIndex) {
          return aDayIndex - bDayIndex
        }
        
        // Then sort by start time within the same day
        const aStartTime = a.time.split(' - ')[0]
        const bStartTime = b.time.split(' - ')[0]
        return aStartTime.localeCompare(bStartTime)
      })
      .slice(0, filteredShows.length)
  }

  const getUniqueDays = () => {
    const days = shows.map(show => show.day_of_week)
    const uniqueDays = Array.from(new Set(days))
    
    // Get current day and create day order starting from today, ending with Sunday
    const today = new Date().getDay()
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    // Create day order starting from current day, wrapping to include all days up to Sunday
    const dayOrder = []
    for (let i = 0; i < 7; i++) {
      const dayIndex = (today + i) % 7
      dayOrder.push(dayNames[dayIndex])
    }
    
    // Ensure Sunday is always at the end if it's not the current day
    if (today !== 0) { // If today is not Sunday
      const sundayIndex = dayOrder.indexOf('Sunday')
      if (sundayIndex !== -1) {
        dayOrder.splice(sundayIndex, 1)
        dayOrder.push('Sunday')
      }
    }
    
    // Group Monday-Thursday into weekdays
    const hasWeekdays = uniqueDays.some(day => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(day))
    const weekendDays = uniqueDays.filter(day => !['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(day))
    
    const groupedDays = ['all']
    if (hasWeekdays) {
      groupedDays.push('weekdays')
    }
    
    // Add weekend days in current day order
    const orderedWeekendDays = dayOrder.filter(day => weekendDays.includes(day))
    groupedDays.push(...orderedWeekendDays)
    
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
          {shows.length > 0 && (
            <p className="text-gray-400 text-sm mt-1">
              {selectedDay === 'all' 
                ? `Showing all ${shows.length} shows`
                : selectedDay === 'weekdays'
                  ? `Showing ${getFilteredShows().length} shows for Mon-Thu`
                  : selectedDay === 'Friday'
                    ? `Showing ${getFilteredShows().length} shows for Fri`
                    : selectedDay === 'Saturday'
                      ? `Showing ${getFilteredShows().length} shows for Sat`
                      : selectedDay === 'Sunday'
                        ? `Showing ${getFilteredShows().length} shows for Sun`
                        : `Showing ${getFilteredShows().length} shows for ${selectedDay}`
              }
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Day Filter */}
          <div className="flex flex-wrap gap-2">
            {getUniqueDays().map((day) => {
              const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' })
              const isToday = day === currentDay
              const isSelected = selectedDay === day
              
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors relative ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : isToday
                        ? 'bg-red-500 text-white border-2 border-red-400'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {day === 'all' ? 'All Days' : day === 'weekdays' ? 'Mon-Thu' : day === 'Friday' ? 'Fri' : day === 'Saturday' ? 'Sat' : day === 'Sunday' ? 'Sun' : day}
                  {isToday && !isSelected && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
                  )}
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
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {getFilteredShows().map((show) => (
              <div
                key={show.id}
                className="group"
              >
                <div className="relative">
                  <Image
                    src={getImageSrc(show)}
                    alt={show.presenters || `Show ${show.id}`}
                    width={300}
                    height={160}
                    className="w-full h-40 object-cover transition-transform duration-300 cursor-pointer rounded-xl hover:scale-105"
                  />
                </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold mb-2">{show.show_name}</h3>
          <p className="text-gray-300 text-sm mb-1">{show.presenters}</p>
          <p className="text-red-500 font-semibold mb-1">{show.time}</p>
          <p className="text-gray-400 text-sm">{show.day_of_week}</p>
        </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
