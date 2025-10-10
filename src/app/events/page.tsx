'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Player from '@/components/Player'
import Image from 'next/image'

export default function EventsPage() {
  const [players, setPlayers] = useState<Array<{ id: string; type: 'listen' | 'watch' }>>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const createPlayer = (type: 'listen' | 'watch') => {
    const id = `player_${Date.now()}`
    setPlayers(prev => [...prev, { id, type }])
  }

  const removePlayer = (id: string) => {
    setPlayers(prev => prev.filter(player => player.id !== id))
  }
  const events = [
    {
      id: 1,
      title: "Funny Bunny Comedy Club July Edition",
      category: "Comedy And Entertainment",
      date: "31st Jul 2025 19:30",
      venue: "Wombo Restaurant",
      price: "UGX 20,000",
      image: "https://mmo.aiircdn.com/1449/689d9a4cd8ac6.jpg",
      views: 10841,
      shares: 85
    },
    {
      id: 2,
      title: "MASTER NTAKKY: SOLO ART EXHIBITION Titled 'Ij...'",
      category: "Arts And Culture",
      date: "1st Aug 2025 15:00",
      venue: "Nommo Gallery",
      price: "UGX 100,000",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC_JB70tDYmLQyH5u_MT96_5THwY2j5BkIGA&s",
      views: 8873,
      shares: 77
    },
    {
      id: 3,
      title: "Cotilda Inapo; Funny But True Stand Up Comedy S...",
      category: "Comedy And Entertainment",
      date: "1st Aug 2025 19:00",
      venue: "Uganda National Theatre",
      price: "UGX 30,000",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvRoohPYJEZAxEX-p21M5meZJ_6KIpcP8hZQ&s",
      views: 17759,
      shares: 80
    },
    {
      id: 4,
      title: "Chozen Blood Live in Jubilation Concert",
      category: "Music And Concerts",
      date: "1st Aug 2025 18:00",
      venue: "Kampala Serena Hotel",
      price: "UGX 100,000",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyI8d8dPwcHnRXSQCKWKWjJFYizm-Jw2-A5g&s",
      views: 16049,
      shares: 59
    },
    {
      id: 5,
      title: "Kampala Fashion Week 2025",
      category: "Fashion And Lifestyle",
      date: "15th Aug 2025 18:00",
      venue: "Kampala Convention Centre",
      price: "UGX 50,000",
      image: "https://mmo.aiircdn.com/1449/689d9a4cd8ac6.jpg",
      views: 12500,
      shares: 120
    },
    {
      id: 6,
      title: "Tech Innovation Summit Uganda",
      category: "Technology And Innovation",
      date: "20th Aug 2025 09:00",
      venue: "Sheraton Kampala Hotel",
      price: "UGX 75,000",
      image: "https://mmo.aiircdn.com/1449/67d91116c5a11.jpg",
      views: 8900,
      shares: 45
    }
  ]

  // Get unique categories from events
  const categories = ["All", ...Array.from(new Set(events.map(event => event.category)))]

  // Filter events based on category and search term
  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Simulate loading state
  const handleCategoryChange = (category: string) => {
    setIsLoading(true)
    setSelectedCategory(category)
    setTimeout(() => setIsLoading(false), 300)
  }

  const handleSearchChange = (term: string) => {
    setIsLoading(true)
    setSearchTerm(term)
    setTimeout(() => setIsLoading(false), 300)
  }

  return (
    <div className="relative bg-black text-white">
      <Header createPlayer={createPlayer} />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join us for the hottest events in Kampala. From comedy shows to concerts, 
              we bring you the best entertainment the city has to offer.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-gray-800 text-white p-4 pr-12 border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
              <i className="fa-solid fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                disabled={isLoading}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  category === selectedCategory
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-400">Loading events...</p>
              </div>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-black border border-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col hover:border-red-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 group"
              >
                <div className="relative">
                  <Image
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={192}
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                    Trending
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs font-semibold text-gray-400 mb-2">
                    <i className="fa-solid fa-list-ul mr-1"></i> {event.category}
                  </p>
                  <h3 className="text-lg font-bold text-white mb-3">{event.title}</h3>
                  <div className="text-sm text-gray-300 mb-4 flex items-center">
                    <i className="fa-regular fa-calendar mr-2"></i> {event.date} • {event.venue}
                  </div>
                  <div className="mb-4">
                    <span className="border border-gray-600 rounded-full px-3 py-1 text-sm font-medium text-gray-300">
                      {event.price} <i className="fa-solid fa-circle-question text-xs"></i>
                    </span>
                  </div>
                  <div className="mt-auto border-t border-gray-600 pt-3 flex items-center text-xs text-gray-400 font-medium">
                    <div className="flex items-center mr-4">
                      <i className="fa-solid fa-chart-simple mr-1"></i> {event.views.toLocaleString()}
                    </div>
                    <div className="flex items-center mr-auto">
                      <i className="fa-regular fa-eye mr-1"></i> {event.shares}
                    </div>
                    <button className="hover:text-white hover:scale-105 transition-all duration-200 group-hover:text-red-400">
                      <i className="fa-solid fa-share-nodes mr-1"></i> Share
                    </button>
                  </div>
                </div>
              </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <i className="fa-solid fa-calendar-xmark text-6xl text-gray-600 mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Load More Events
            </button>
          </div>
        </section>
      </main>

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
