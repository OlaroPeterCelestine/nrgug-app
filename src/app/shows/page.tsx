'use client'

import { useState, useEffect } from 'react'
import { apiUtils } from '@/lib/api-utils'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Show {
  id: number
  show_name: string
  image: string
  time: string
  presenters: string
  day_of_week: string
  description?: string
  created_at?: string
}

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchShows()
  }, [])

  const fetchShows = async () => {
    try {
      console.log('🎯 Fetching shows from API...')
      setLoading(true)
      setError(null)
      
      const data = await apiUtils.fetchShows()
      console.log('✅ Shows data received:', data)
      setShows(data || [])
    } catch (error) {
      console.error('💥 Error fetching shows:', error)
      setError('Failed to load shows. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Time is now provided directly from API

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
    return '/shows/default-show.jpg'
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Recently added'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Recently added'
    }
  }

  const getCurrentShow = () => {
    const now = new Date()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' })
    return shows.find(show => show.day_of_week === currentDay)
  }

  const getUpcomingShows = () => {
    const now = new Date()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' })
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const currentDayIndex = days.indexOf(currentDay)
    
    return shows.filter(show => {
      const showDayIndex = days.indexOf(show.day_of_week)
      return showDayIndex >= currentDayIndex
    }).sort((a, b) => {
      const aIndex = days.indexOf(a.day_of_week)
      const bIndex = days.indexOf(b.day_of_week)
      return aIndex - bIndex
    })
  }

  const currentShow = getCurrentShow()
  const upcomingShows = getUpcomingShows()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header createPlayer={() => {}} />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Radio Shows</h1>
              <p className="text-gray-300 text-lg">
                Discover our diverse lineup of radio shows and programs
              </p>
            </div>
            <Link 
              href="/"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg mb-4">
              <i className="fas fa-radio text-6xl mb-6 block animate-pulse"></i>
              Loading our shows...
            </div>
            <p className="text-gray-500">Please wait while we fetch our program schedule</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-400 text-lg mb-4">
              <i className="fas fa-exclamation-triangle text-6xl mb-6 block"></i>
              {error}
            </div>
            <button 
              onClick={fetchShows}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : shows.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg mb-4">
              <i className="fas fa-radio text-6xl mb-6 block"></i>
              No shows available at the moment
            </div>
            <p className="text-gray-500">Check back later for our program schedule</p>
          </div>
        ) : (
          <>
            {/* Current Show */}
            {currentShow && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="relative flex h-3 w-3 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  Currently On Air
                </h2>
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <Image
                        src={getImageSrc(currentShow)}
                        alt={currentShow.presenters}
                        width={200}
                        height={200}
                        className="w-48 h-48 object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-3xl font-bold mb-4">{currentShow.show_name}</h3>
                      <p className="text-red-100 text-xl mb-4">
                        {currentShow.presenters}
                      </p>
                      <p className="text-red-100 text-lg mb-4">
                        {currentShow.time}
                      </p>
                      <p className="text-red-200 text-lg mb-4">
                        {currentShow.day_of_week}
                      </p>
                      {currentShow.description && (
                        <p className="text-red-100 mb-6">{currentShow.description}</p>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                          <i className="fas fa-play mr-2"></i>
                          Play
                        </button>
                        <button className="bg-red-800 text-white hover:bg-red-900 px-6 py-3 rounded-lg font-semibold transition-colors">
                          <i className="fas fa-share mr-2"></i>
                          Share Show
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="mb-12">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-2">{shows.length}</div>
                    <div className="text-gray-300">Total Shows</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">{upcomingShows.length}</div>
                    <div className="text-gray-300">Upcoming</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
                    <div className="text-gray-300">Broadcast</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">Live</div>
                    <div className="text-gray-300">Streaming</div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Shows */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">All Shows</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shows.map((show) => (
                  <div
                    key={show.id}
                    className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors group"
                  >
                    <div className="relative">
                      <Image
                        src={getImageSrc(show)}
                        alt={show.presenters}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {show.time}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                        {show.show_name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-1">
                        {show.presenters}
                      </p>
                      <p className="text-gray-400 text-sm mb-2">
                        {show.day_of_week}
                      </p>
                      
                      {show.description && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {show.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Added {formatDate(show.created_at)}
                        </div>
                        <button className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors">
                          View Details
                          <i className="fas fa-arrow-right ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4">Never Miss a Show</h2>
                <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                  Stay updated with our latest shows and programs. Follow us for notifications and updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                    <i className="fas fa-bell mr-2"></i>
                    Get Notifications
                  </button>
                  <button className="bg-red-800 text-white hover:bg-red-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                    <i className="fas fa-calendar mr-2"></i>
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  )
}


