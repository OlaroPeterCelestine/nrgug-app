'use client'

import { useState, useEffect } from 'react'
import { apiUtils } from '@/lib/api-utils'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Player from '@/components/Player'
import Image from 'next/image'

interface NewsArticle {
  id: number
  title: string
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
      const data = await apiUtils.fetchNews()

      if (data && data.length > 0) {
        setMainArticle(data[0]) // First article as main story
        setArticles(data.slice(1)) // Rest as side articles
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
      <div className="relative text-white overflow-hidden">
        
        <div className="relative pl-16 pr-4 sm:pl-20 sm:pr-6 lg:pl-24 lg:pr-8 z-10">
          <Header createPlayer={createPlayer} />
          
          {/* Page Heading */}
          <div className="py-24 md:py-36 text-left">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
                <span>/</span>
                <span className="text-red-500">News</span>
              </nav>
              
              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                  News
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed mb-8">
                Stay updated with the latest news and stories from NRG Radio. 
                Breaking news, entertainment updates, and community stories.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Live Updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Fresh Content</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Community Stories</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block">
            <div className="w-32 h-32 border-2 border-red-500/30 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 border-2 border-red-500/50 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-red-500/70 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-black" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="currentColor" opacity="0.5"></path>
          </svg>
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
                      src={getImageSrc(mainArticle.image, "https://mmo.aiircdn.com/1449/66d36cdd8c650.png")}
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
                      src={getImageSrc(article.image, "https://www.alphalogic.co.za/nrgug/wp-content/uploads/2025/03/67d90f047a25c.jpg")}
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
