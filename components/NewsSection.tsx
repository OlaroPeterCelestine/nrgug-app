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

  return (
    <section className="max-w-7xl mx-auto mt-24">
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
                      src={article.image}
                      alt={article.title || `News article ${article.id}`}
                      width={400}
                      height={240}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fas fa-image text-gray-600 text-4xl"></i>
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

                  <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
                    {truncateContent(article.story || '')}
                  </p>

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
