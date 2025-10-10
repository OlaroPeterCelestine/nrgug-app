'use client'

import { useState, useEffect } from 'react'
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
      const response = await fetch('https://nrgug-api-production.up.railway.app/api/shows', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })

      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          console.log('✅ Shows data received:', data)
          setShows((data || []).slice(0, 6)) // Show only the first 6 shows
        } else {
          console.error('❌ Response is not JSON:', contentType)
        }
      } else {
        console.error('❌ API response not ok:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('Error response body:', errorText)
      }
    } catch (error) {
      console.error('💥 Error fetching shows:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredShows = () => {
    if (selectedDay === 'all') {
      return shows.slice(0, 6) // Show only first 6 shows when all days selected
    }
    if (selectedDay === 'weekdays') {
      return shows.filter(show => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(show.day_of_week))
    }
    return shows.filter(show => show.day_of_week === selectedDay)
  }

  const getUniqueDays = () => {
    const days = shows.map(show => show.day_of_week)
    const uniqueDays = Array.from(new Set(days))
    
    // Group Monday-Thursday into weekdays
    const hasWeekdays = uniqueDays.some(day => ['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(day))
    const weekendDays = uniqueDays.filter(day => !['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(day))
    
    const groupedDays = ['all']
    if (hasWeekdays) {
      groupedDays.push('weekdays')
    }
    groupedDays.push(...weekendDays)
    
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
                ? `Showing ${Math.min(6, shows.length)} of ${shows.length} shows`
                : selectedDay === 'weekdays'
                  ? `Showing ${getFilteredShows().length} shows for Weekdays (Mon-Thu)`
                  : `Showing ${getFilteredShows().length} shows for ${selectedDay}`
              }
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Day Filter */}
          <div className="flex flex-wrap gap-2">
            {getUniqueDays().map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedDay === day
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {day === 'all' ? 'All Days' : day === 'weekdays' ? 'Weekdays' : day}
              </button>
            ))}
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
