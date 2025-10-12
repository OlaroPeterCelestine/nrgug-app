'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Player from '@/components/Player'
import Image from 'next/image'

export default function ShopPage() {
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
  const products = [
    {
      id: 1,
      name: "Bucket Hats",
      price: 5000,
      image: "https://playtz-1iiy.vercel.app/HUT.png",
      category: "Accessories",
      description: "Stylish bucket hat with NRG Radio logo"
    },
    {
      id: 2,
      name: "Water Bottles",
      price: 5000,
      image: "https://playtz-1iiy.vercel.app/BOTTLEE.png",
      category: "Accessories",
      description: "High-quality water bottle with NRG branding"
    },
    {
      id: 3,
      name: "T-Shirts",
      price: 5000,
      image: "https://playtz-1iiy.vercel.app/BOTTLEE.png",
      category: "Clothing",
      description: "Comfortable cotton t-shirt with NRG design"
    },
    {
      id: 4,
      name: "Bangles",
      price: 5000,
      image: "https://playtz-1iiy.vercel.app/BANGLE.png",
      category: "Accessories",
      description: "Colorful bangles featuring NRG colors"
    },
    {
      id: 5,
      name: "Hoodies",
      price: 15000,
      image: "https://playtz-1iiy.vercel.app/HUT.png",
      category: "Clothing",
      description: "Warm and cozy hoodie with NRG logo"
    },
    {
      id: 6,
      name: "Caps",
      price: 8000,
      image: "https://playtz-1iiy.vercel.app/BANGLE.png",
      category: "Accessories",
      description: "Classic cap with embroidered NRG logo"
    },
    {
      id: 7,
      name: "Mugs",
      price: 3000,
      image: "https://playtz-1iiy.vercel.app/BOTTLEE.png",
      category: "Accessories",
      description: "Ceramic mug perfect for your morning coffee"
    },
    {
      id: 8,
      name: "Stickers",
      price: 1000,
      image: "https://playtz-1iiy.vercel.app/HUT.png",
      category: "Accessories",
      description: "Vinyl stickers to show your NRG pride"
    }
  ]

  const categories = ["All", "Clothing", "Accessories"]

  // Filter products based on category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-5xl font-bold mb-4">NRG Merchandise</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Show your NRG pride with our exclusive merchandise. From clothing to accessories, 
              we have everything you need to represent the brand.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-400">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-black border border-gray-800 rounded-xl shadow-md overflow-hidden group flex flex-col text-center transition-all duration-300 hover:border-red-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10"
              >
                <div className="relative p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="mx-auto h-64 object-contain group-hover:scale-105 transition-transform"
                    width={256}
                    height={256}
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-red-500">UGX {product.price.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-600/25 group-hover:bg-red-500">
                    <i className="fa-solid fa-cart-plus mr-2"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <i className="fa-solid fa-search text-6xl text-gray-600 mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Featured Products */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Limited Edition Collection</h3>
                <p className="text-red-100 mb-6">
                  Get your hands on our exclusive limited edition items before they&apos;re gone forever.
                </p>
                <button className="bg-white text-red-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Bundle Deals</h3>
                <p className="text-gray-300 mb-6">
                  Save more when you buy multiple items. Check out our amazing bundle offers.
                </p>
                <button className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
                  View Bundles
                </button>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-gray-900 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Be the first to know about new products and exclusive offers.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-gray-800 text-white p-3 border border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
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
