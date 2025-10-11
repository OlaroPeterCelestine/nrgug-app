'use client'

import { useState, useEffect } from 'react'
import { apiUtils } from '@/lib/api-utils'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Client {
  id: number
  name: string
  image: string
  description?: string
  website?: string
  created_at?: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      console.log('🎯 Fetching clients from API...')
      setLoading(true)
      setError(null)
      
      const data = await apiUtils.fetchClients()
      console.log('✅ Clients data received:', data)
      setClients(data || [])
    } catch (error) {
      console.error('💥 Error fetching clients:', error)
      setError('Failed to load clients. Please try again later.')
    } finally {
      setLoading(false)
    }
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

  const getImageSrc = (client: Client): string => {
    if (isValidImageUrl(client.image)) {
      return client.image
    }
    return ''
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

  return (
    <div className="relative bg-black text-white">
      <Header createPlayer={() => {}} />
      
      <main className="pt-32 pb-20">
        {/* Page Header */}
        <div className="bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Our Clientele</h1>
                <p className="text-gray-300 text-lg">
                  Trusted partners and clients who work with NRG Radio Uganda
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg mb-4">
              <i className="fas fa-building text-6xl mb-6 block animate-pulse"></i>
              Loading our clients...
            </div>
            <p className="text-gray-500">Please wait while we fetch our client partners</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-400 text-lg mb-4">
              <i className="fas fa-exclamation-triangle text-6xl mb-6 block"></i>
              {error}
            </div>
            <button 
              onClick={fetchClients}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg mb-4">
              <i className="fas fa-building text-6xl mb-6 block"></i>
              No clients available at the moment
            </div>
            <p className="text-gray-500">Check back later for our client partners</p>
          </div>
        ) : (
          <>
            {/* Stats */}

            {/* Clients Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-24 h-24 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                        <Image
                          src={getImageSrc(client)}
                          alt={client.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-center mb-2 group-hover:text-red-400 transition-colors">
                      {client.name}
                    </h3>
                    
                    {client.description && (
                      <p className="text-gray-300 text-sm text-center mb-4 line-clamp-3">
                        {client.description}
                      </p>
                    )}
                    
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-3">
                      </div>
                      
                      {client.website && (
                        <a
                          href={client.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
                        >
                          Visit Website
                          <i className="fas fa-external-link-alt ml-2"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-4">Want to Partner with Us?</h2>
                <p className="text-red-100 mb-6 max-w-2xl mx-auto text-lg">
                  Join our growing list of satisfied clients and let us help you reach your audience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
                  >
                    Partner with Us
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 inline-block"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      </main>
      
      <Footer />
    </div>
  )
}


