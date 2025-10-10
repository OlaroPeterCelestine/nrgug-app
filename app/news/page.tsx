'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

export default function NewsPage() {
  const router = useRouter()
  const [players, setPlayers] = useState<Array<{ id: string; type: 'listen' | 'watch' }>>([])
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [mainArticle, setMainArticle] = useState<NewsArticle | null>(null)

  const createPlayer = (type: 'listen' | 'watch') => {
    const id = `player_${Date.now()}`
    setPlayers(prev => [...prev, { id, type }])
  }

  const removePlayer = (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id))
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
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
          if (data && data.length > 0) {
            setMainArticle(data[0]) // First article as main story
            setArticles(data.slice(1)) // Rest as side articles
          }
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
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
          
          {/* Page Heading */}
          <div className="py-20 md:py-32 text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              News
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
              Stay updated with the latest news and stories from NRG Radio
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-screen-xl mx-auto p-4 md:p-8 bg-black">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-800 pb-6">
                <div className="flex flex-col justify-center">
                  <div className="skeleton-heading mb-3"></div>
                  <div className="skeleton-title mb-4"></div>
                  <div className="skeleton-text w-32"></div>
                </div>
                <div className="skeleton-image h-64"></div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="border-b border-gray-800 pb-6">
                    <div className="skeleton-image h-48 mb-3"></div>
                    <div className="skeleton-title mb-2"></div>
                    <div className="skeleton-text mb-3"></div>
                    <div className="skeleton-text w-24"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Story */}
            <div className="lg:col-span-8">
              {mainArticle && (
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-800 pb-6 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => router.push(`/news/${mainArticle.id}`)}
                >
                  
                  {/* Text Content */}
                  <div className="flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                      {mainArticle.title}
                    </h1>
                    <p className="text-gray-300 mb-4 text-lg">
                      {mainArticle.story}
                    </p>
                    <div className="text-sm text-gray-500 mb-4">
                      <span>{formatDate(mainArticle.timestamp || '')}</span>
                      <span className="mx-2 text-gray-600">|</span>
                      <span>{mainArticle.author || 'NRG Editorial'}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/news/${mainArticle.id}`);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors w-fit"
                    >
                      Read More
                    </button>
                  </div>

                  {/* Image Content */}
                  <div className="relative group bg-gray-800">
                    <Image 
                      src={getImageSrc(mainArticle.image)}
                      alt={mainArticle.title} 
                      width={600}
                      height={400}
                      className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://mmo.aiircdn.com/1449/66d36cdd8c650.png";
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute top-4 right-4 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded">
                      {mainArticle.category || 'News'}
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Row - Show 3 more articles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                {articles.slice(0, 3).map((article, index) => (
                  <article 
                    key={article.id}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => router.push(`/news/${article.id}`)}
                  >
                    <Image 
                      src={getImageSrc(article.image)}
                      alt={article.title} 
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover mb-3 brightness-90 hover:brightness-100 transition"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://mmo.aiircdn.com/1449/66d36cdd8c650.png";
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <h2 className="text-xl font-bold text-white mb-2 leading-tight hover:underline cursor-pointer">
                      {article.title}
                    </h2>
                    <p className="text-gray-300 mb-3 text-base">
                      {article.story.length > 100 ? `${article.story.substring(0, 100)}...` : article.story}
                    </p>
                    <div className="text-sm text-gray-500">
                      <span>{formatDate(article.timestamp || '')}</span>
                      <span className="mx-2 text-gray-600">|</span>
                      <span>{article.category || 'News'}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Side Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {articles.slice(3).map((article, index) => (
                <article 
                  key={article.id} 
                  className={`${index < articles.length - 4 ? "border-b border-gray-800 pb-6" : ""} cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => router.push(`/news/${article.id}`)}
                >
                  {article.image && (
                    <div className="relative mb-3">
                      <Image 
                        src={getImageSrc(article.image, "")}
                        alt={article.title} 
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover brightness-90 hover:brightness-100 transition"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://mmo.aiircdn.com/1449/66d36cdd8c650.png";
                        }}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                      <span className="absolute top-4 right-4 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded">
                        {article.category || 'News'}
                      </span>
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-gray-300 mb-3 text-base">
                    {article.story.length > 120 ? `${article.story.substring(0, 120)}...` : article.story}
                  </p>
                  <div className="text-sm text-gray-500">
                    <span>{formatDate(article.timestamp || '')}</span>
                    <span className="mx-2 text-gray-600">|</span>
                    <span>{article.author || 'NRG Editorial'}</span>
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
