'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NewsArticle {
  id: number
  title: string
  story: string
  image?: string
  created_at?: string
  timestamp?: string
  author?: string
  category?: string
}

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([])

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      console.log('🔍 Fetching news from API...')
      
      const response = await fetch('https://nrgug-api-production.up.railway.app/api/news', {
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
          console.log('✅ News data received:', data)
          // Get the first 4 articles
          setArticles((data || []).slice(0, 4))
        } else {
          console.error('❌ Response is not JSON:', contentType)
        }
      } else {
        console.log('❌ API response not ok:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('Error response body:', errorText)
      }
    } catch (error) {
      console.log('💥 API fetch failed:', error)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (!content || content.length <= maxLength) return content || ''
    return content.substring(0, maxLength) + '...'
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

  const mapToR2Url = (url: string): string => {
    // Map old local URLs to R2 URLs
    if (url.includes('nrgug-api-production.up.railway.app/uploads/')) {
      // Extract the path from local URL and convert to R2 URL
      const localPath = url.split('nrgug-api-production.up.railway.app/uploads')[1]
      return `https://pub-1a0cc46c23f84b8ebf3f69e9b90b4314.r2.dev/nrgug${localPath}`
    }
    // If it's already an R2 URL, return as is
    if (url.includes('pub-1a0cc46c23f84b8ebf3f69e9b90b4314.r2.dev') ||
        url.includes('pub-6481c927139b4654ace8022882acbd62.r2.dev') ||
        url.includes('pub-56fa6cb20f9f4070b3dcbdf365d81f80.r2.dev')) {
      return url
    }
    return url
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log('Image failed to load:', e.currentTarget.src)
    // Replace with placeholder
    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xNzUgMTAwSDIyNVYxNDBIMTc1VjEwMFoiIGZpbGw9IiM2QjcyODAiLz4KPHBhdGggZD0iTTE5NSAxMjBIMjA1VjEzMEgxOTVWMTIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+'
  }

  return (
    <section className="max-w-7xl mx-auto mt-24 mb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-black text-outline-red">Latest News</h2>
          <Link 
            href="/news" 
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            View All News →
          </Link>
        </div>
        
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              <i className="fas fa-newspaper text-4xl mb-4 block"></i>
              No news articles available at the moment
            </div>
            <p className="text-gray-500">Check back later for the latest updates</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-black border border-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col hover:border-red-500 hover:-translate-y-1 transition-all group"
              >
                <div className="relative h-48 bg-gray-800">
                  {article.image && isValidImageUrl(article.image) ? (
        <Image
          src={mapToR2Url(article.image)}
          alt={article.title || `News article ${article.id}`}
          width={400}
          height={240}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                      <i className="fas fa-image text-4xl mb-2"></i>
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                      {article.category || 'News'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <div className="text-xs text-gray-400 mb-2 flex items-center">
                    <i className="fas fa-calendar mr-2"></i>
                    {formatDate(article.timestamp || article.created_at || '')}
                    {article.author && (
                      <>
                        <span className="mx-2">•</span>
                        <i className="fas fa-user mr-1"></i>
                        {article.author}
                      </>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
                    {article.title || 'Untitled Article'}
                  </h3>

                

                  <div className="mt-auto">
                    <Link
                      href={`/news/${article.id}`}
                      className="inline-flex items-center text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
                    >
                      Read More
                      <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
