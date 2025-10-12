'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Player from '@/components/Player'
import OnAirCarousel from '@/components/OnAirCarousel'
import NewsSection from '@/components/NewsSection'
import VideosSection from '@/components/VideosSection'
import ClientCarousel from '@/components/ClientCarousel'

interface NewsArticle {
  id: number
  title: string
  story: string
  image?: string
  timestamp: string
  author?: string
  category?: string
}

export default function Home() {
  const router = useRouter()
  const [players, setPlayers] = useState<Array<{ id: string; type: 'listen' | 'watch' }>>([])
  const [loading, setLoading] = useState(true)
  const [heroNews, setHeroNews] = useState<NewsArticle[]>([])

  const createPlayer = (type: 'listen' | 'watch') => {
    const id = `player_${Date.now()}`
    setPlayers(prev => [...prev, { id, type }])
  }

  const removePlayer = (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id))
  }

  useEffect(() => {
    // Simulate loading time - reduced for faster display
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    fetchHeroNews()
    
    return () => clearTimeout(timer)
  }, [])

  const fetchHeroNews = async () => {
    try {
      console.log('🚀 Starting to fetch hero news...')
      // First check if there's a hero selection from API
      const heroResponse = await fetch('https://nrgug-api-production.up.railway.app/api/hero-selection', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
      
      console.log('📡 Hero selection response status:', heroResponse.status)

      if (heroResponse.ok) {
        const contentType = heroResponse.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const heroData = await heroResponse.json()
          const selectedArticles = []
          
          // Get the selected articles
          if (heroData.main_story) {
            selectedArticles.push(heroData.main_story)
          }
          if (heroData.minor_story_1) {
            selectedArticles.push(heroData.minor_story_1)
          }
          if (heroData.minor_story_2) {
            selectedArticles.push(heroData.minor_story_2)
          }
          
          if (selectedArticles.length > 0) {
            setHeroNews(selectedArticles)
            return
          }
        } else {
          console.error('❌ Hero response is not JSON:', contentType)
        }
      }

      // Fallback: fetch regular news if no hero selection
      console.log('No hero selection found, fetching regular news as fallback')
      const newsResponse = await fetch('https://nrgug-api-production.up.railway.app/api/news', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
      
      if (newsResponse.ok) {
        const newsData = await newsResponse.json()
        if (newsData && newsData.length > 0) {
          // Use first 3 news articles as hero content
          setHeroNews(newsData.slice(0, 3))
          return
        }
      }
      
      // If all else fails, show empty
      setHeroNews([])
    } catch (error) {
      console.error('Error fetching hero news:', error)
      // No fallback data - keep empty array
      setHeroNews([])
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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

  const getImageSrc = (image: string | null | undefined): string => {
    if (isValidImageUrl(image)) {
      return image!
    }
    return ''
  }

  return (
    <div className="relative bg-black text-white">
      <Header createPlayer={createPlayer} />

      <main>
        {loading ? (
          <div className="min-h-screen">
            {/* Hero Section Shimmer */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Story Shimmer */}
                <div className="lg:col-span-2">
                  <div className="skeleton-image h-[38rem]"></div>
                </div>
                
                {/* Minor Stories Shimmer */}
                <div className="lg:col-span-1 grid grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-8">
                  <div className="skeleton-image h-[200px] lg:h-[288px]"></div>
                  <div className="skeleton-image h-[200px] lg:h-[288px]"></div>
                </div>
                
                {/* Videos Shimmer */}
                <div className="lg:col-span-1">
                  <div className="skeleton-heading w-32 mb-4"></div>
                  <div className="space-y-4">
                    <div className="skeleton-image h-21 lg:h-25"></div>
                    <div className="skeleton-image h-21 lg:h-25"></div>
                    <div className="skeleton-image h-21 lg:h-25"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Clients Shimmer */}
            <section className="text-white py-12 px-4 w-full">
              <div className="max-w-7xl mx-auto">
                <div className="skeleton-heading w-32 mb-8"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="skeleton-image h-20"></div>
                  ))}
                </div>
              </div>
            </section>

            {/* On Air Shimmer */}
            <section className="text-white py-6 px-4 w-full mt-8">
              <div className="max-w-7xl mx-auto">
                <div className="skeleton-heading w-24 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="group">
                      <div className="skeleton-image h-40 rounded-xl"></div>
                      <div className="mt-4 text-center">
                        <div className="skeleton-title w-24 mx-auto mb-2"></div>
                        <div className="skeleton-text w-16 mx-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* News Shimmer */}
            <section className="max-w-7xl mx-auto mt-24">
              <div className="container mx-auto px-4">
                <div className="skeleton-heading w-32 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-black border border-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col">
                      <div className="skeleton-image h-48"></div>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="skeleton-text w-24 mb-2"></div>
                        <div className="skeleton-title mb-3"></div>
                        <div className="skeleton-text mb-2"></div>
                        <div className="skeleton-text w-3/4 mb-4"></div>
                        <div className="skeleton-text w-20 mt-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <>
            {/* Hero Section */}
          

            {/* Client Carousel */}
            <ClientCarousel />

            {/* Container for floating players */}
            <div id="playerContainer" className="fixed inset-0 pointer-events-none">
              {players.map(player => (
                <Player
                  key={player.id}
                  id={player.id}
                  type={player.type}
                  removePlayer={removePlayer}
                />
              ))}
            </div>

            {/* About NRG Radio Section - SEO Content */}
         

            {/* On Air Carousel */}
            <OnAirCarousel />

            {/* News Section */}
            <NewsSection />

            {/* Floating Action Buttons */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-20">
              {/* Back to Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Back to Top"
                className="bg-gray-800 text-white w-12 h-12 rounded-md flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors border border-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* WhatsApp Button */}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}