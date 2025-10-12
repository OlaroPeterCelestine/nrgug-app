'use client'

import { useState, useEffect } from 'react'
import { apiUtils } from '@/lib/api-utils'
import Image from 'next/image'
import Link from 'next/link'

interface Client {
  id: number
  name: string
  image: string
  link?: string
}

export default function ClientCarousel() {
  // Initialize with empty array - no fallback data
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      console.log('Fetching clients from API...')
      
      // Try to fetch from API
      const data = await apiUtils.fetchClients()

      console.log('API clients data received:', data)
      console.log('Number of API clients:', data?.length || 0)
      // Update with API data if successful
      if (data && data.length > 0) {
        setClients(data)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
      // No fallback data - keep empty array
      setClients([])
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
    // No fallback - return empty string if no valid image
    return ''
  }

  return (
    <section className="text-white py-12 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Clientele</h2>
          </div>
          <Link 
            href="/clients"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            View All Clients
          </Link>
        </header>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              <i className="fas fa-building text-4xl mb-4 block"></i>
              No clients available at the moment
            </div>
            <p className="text-gray-500">Check back later for our client partners</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {clients.slice(0, 6).map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                {client.link ? (
                  <a
                    href={client.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Image
                      src={getImageSrc(client)}
                      alt={client.name || `Client ${client.id}`}
                      width={120}
                      height={90}
                      className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      title={client.name || `Client ${client.id}`}
                    />
                  </a>
                ) : (
                  <Image
                    src={getImageSrc(client)}
                    alt={client.name || `Client ${client.id}`}
                    width={120}
                    height={90}
                    className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    title={client.name || `Client ${client.id}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
