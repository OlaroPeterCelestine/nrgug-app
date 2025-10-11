'use client'

import { useState, useEffect } from 'react'
import { apiUtils } from '@/lib/api-utils'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Player from '@/components/Player'
import Image from 'next/image'

interface NewsArticle {
  id: number
  title: string
  story: string
  image?: string
  timestamp?: string
  author?: string
  category?: string
}

export default function NewsStoryPage() {
  const params = useParams()
  const router = useRouter()
  const [players, setPlayers] = useState<Array<{ id: string; type: 'listen' | 'watch' }>>([])
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const createPlayer = (type: 'listen' | 'watch') => {
    const id = `player_${Date.now()}`
    setPlayers(prev => [...prev, { id, type }])
  }

  const removePlayer = (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id))
  }

  useEffect(() => {
    if (params.id) {
      console.log('useEffect triggered with ID:', params.id)
      fetchNewsStory(params.id as string)
      fetchRelatedNews()
    }
  }, [params.id])

  // Add a fallback to prevent infinite loading
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (loading && !article && !error) {
        console.log('Fallback timer triggered - setting error')
        setError('Loading is taking longer than expected. Please refresh the page.')
        setLoading(false)
      }
    }, 15000) // 15 second fallback

    return () => clearTimeout(fallbackTimer)
  }, [loading, article, error])

  const fetchNewsStory = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching news story with ID:', id) // Debug log
      
      // Add timeout to prevent hanging
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const data = await apiUtils.fetchNewsById(id)

      clearTimeout(timeoutId)
      console.log('Fetched article data:', data) // Debug log
      console.log('Story content:', data.story) // Debug log
      setArticle(data)
      setError(null) // Clear any previous errors
    } catch (error) {
      console.error('Error fetching news story:', error)
      if (error instanceof Error && error.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError('Failed to load news story. Please check your connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedNews = async () => {
    try {
      const data = await apiUtils.fetchNews()
      // Filter out the current article and get up to 3 related articles
      const related = data.filter((item: NewsArticle) => item.id !== parseInt(params.id as string)).slice(0, 3)
      setRelatedArticles(related)
    } catch (error) {
      console.error('Error fetching related news:', error)
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

  const getImageSrc = (image: string | null | undefined, fallback: string): string => {
    if (isValidImageUrl(image)) {
      // Check for known problematic URLs and use fallback immediately
      if (image!.includes('alphalogic.co.za') || image!.includes('404') || image!.includes('timeout')) {
        return "https://mmo.aiircdn.com/1449/66d36cdd8c650.png"
      }
      return image!
    }
    return "https://mmo.aiircdn.com/1449/66d36cdd8c650.png"
  }

  if (loading) {
    return (
      <div className="relative bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-900/30 rounded-2xl p-8 md:p-12 border border-gray-800/50">
              <div className="animate-pulse">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gray-700 h-8 w-24 rounded-full"></div>
                  <div className="bg-gray-700 h-4 w-32 rounded"></div>
                  <div className="bg-gray-700 h-4 w-28 rounded"></div>
                </div>
                <div className="bg-gray-700 h-16 w-full rounded mb-6"></div>
                <div className="bg-gray-700 h-64 w-full rounded-xl mb-8"></div>
                <div className="space-y-4">
                  <div className="bg-gray-700 h-4 w-full rounded"></div>
                  <div className="bg-gray-700 h-4 w-full rounded"></div>
                  <div className="bg-gray-700 h-4 w-3/4 rounded"></div>
                  <div className="bg-gray-700 h-4 w-full rounded"></div>
                  <div className="bg-gray-700 h-4 w-5/6 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="relative bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-900/30 rounded-2xl p-12 border border-gray-800/50">
              <div className="text-6xl mb-6">📰</div>
              <h1 className="text-4xl font-bold mb-4 text-white">Story Not Found</h1>
              <p className="text-gray-300 mb-8 text-lg">
                {error || "The news story you're looking for doesn't exist or may have been removed."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => router.push('/news')}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to News
                </button>
                <button 
                  onClick={() => {
                    if (params.id) {
                      setError(null)
                      setLoading(true)
                      fetchNewsStory(params.id as string)
                    }
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <i className="fas fa-refresh mr-2"></i>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-black text-white">
      {/* Social Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-16 flex-col items-center justify-center bg-transparent z-50">
        <div className="flex flex-col items-center justify-center flex-grow space-y-8">
          <a href="https://www.youtube.com/" target="_blank" className="flex flex-col items-center space-y-2 text-white hover:text-red-500 transition-colors">
            <span className="vertical-text font-semibold text-xs tracking-wider uppercase underline">Youtube</span>
          </a>
          <a href="https://www.instagram.com/" target="_blank" className="flex flex-col items-center space-y-2 text-white hover:text-red-500 transition-colors">
            <span className="vertical-text font-semibold text-xs tracking-wider uppercase underline">Instagram</span>
          </a>
          <a href="https://twitter.com/" target="_blank" className="flex flex-col items-center space-y-2 text-white hover:text-red-500 transition-colors">
            <span className="vertical-text font-semibold text-xs tracking-wider uppercase underline">Twitter</span>
          </a>
          <a href="https://www.tiktok.com/" target="_blank" className="flex flex-col items-center space-y-2 text-white hover:text-red-500 transition-colors">
            <span className="vertical-text font-semibold text-xs tracking-wider uppercase underline">TikTok</span>
          </a>
        </div>
      </aside>

      {/* Hero Section */}
      <div className="relative bg-black text-white border-b-2 border-white">
        <div className="relative pl-16 pr-4 sm:pl-20 sm:pr-6 lg:pl-24 lg:pr-8 z-10">
          <Header createPlayer={createPlayer} />
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 bg-black">
        <div className="mb-8">
          <button 
            onClick={() => router.push('/news')}
            className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors mb-6 group"
          >
            <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
            Back to News
          </button>
        </div>

        <article className="bg-gray-900/30 rounded-2xl p-8 md:p-12 border border-gray-800/50 backdrop-blur-sm">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                {article.category || 'News'}
              </span>
              <span className="text-gray-400 text-sm flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i>
                {formatDate(article.timestamp || '')}
              </span>
              <span className="text-gray-400 text-sm flex items-center">
                <i className="fas fa-user mr-2"></i>
                {article.author || 'NRG Editorial'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {article.title}
            </h1>
          </header>

          {/* Article Image */}
          <div className="mb-12 relative group">
            <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gray-800">
              <Image 
                src={getImageSrc(article.image, "https://mmo.aiircdn.com/1449/66d36cdd8c650.png")}
                alt={article.title} 
                width={1000}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://mmo.aiircdn.com/1449/66d36cdd8c650.png";
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-lg md:text-xl text-gray-200 leading-relaxed whitespace-pre-line font-light">
              {article.story ? (
                <div>
                  <p className="mb-4 text-sm text-gray-400">Story Content:</p>
                  {article.story}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No story content available</p>
                </div>
              )}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">
                  Published on {formatDate(article.timestamp || '')}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <i className="fab fa-facebook text-xl"></i>
                </button>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </button>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </button>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <i className="fas fa-share text-xl"></i>
                </button>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Stories */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <article 
                  key={relatedArticle.id}
                  className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50 cursor-pointer hover:bg-gray-900/50 transition-all duration-300 group"
                  onClick={() => router.push(`/news/${relatedArticle.id}`)}
                >
                  <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-800">
                    <Image 
                      src={getImageSrc(relatedArticle.image, "https://mmo.aiircdn.com/1449/66d36cdd8c650.png")}
                      alt={relatedArticle.title} 
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://mmo.aiircdn.com/1449/66d36cdd8c650.png";
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {relatedArticle.category || 'News'}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-red-400 transition-colors">
                    {relatedArticle.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {relatedArticle.story.length > 120 ? `${relatedArticle.story.substring(0, 120)}...` : relatedArticle.story}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDate(relatedArticle.timestamp || '')}</span>
                    <span className="text-red-500 group-hover:text-red-400 transition-colors">
                      Read More <i className="fas fa-arrow-right ml-1"></i>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Back to Top */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
        title="Back to Top" 
        className="fixed bottom-8 right-8 bg-gray-800 text-white w-12 h-12 rounded-md flex items-center justify-center shadow-lg hover:bg-gray-700 border border-gray-600 z-20"
      >
        <i className="fas fa-chevron-up"></i>
      </button>

      {/* Container for floating players */}
      <div id="playerContainer" className="fixed inset-0 pointer-events-none">
        {players.map(player => (
          <Player
            key={player.id}
            type={player.type}
            id={player.id}
            removePlayer={removePlayer}
          />
        ))}
      </div>

      <Footer />
    </div>
  )
}
