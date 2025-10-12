'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  createPlayer?: (type: 'listen' | 'watch') => void
}

export default function Header({ createPlayer }: HeaderProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when clicking outside or on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Social Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-16 flex-col items-center justify-center bg-transparent z-50">
        <div className="flex flex-col items-center justify-center flex-grow space-y-8">
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-2 text-white hover:text-red-500 transition-colors"
          >
            <span className="vertical-text font-sans font-semibold text-xs tracking-wider uppercase underline">
              Youtube
            </span>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-2 text-white hover:text-red-500 transition-colors"
          >
            <span className="vertical-text font-sans font-semibold text-xs tracking-wider uppercase underline">
              Instagram
            </span>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-2 text-white hover:text-red-500 transition-colors"
          >
            <span className="vertical-text font-sans font-semibold text-xs tracking-wider uppercase underline">
              Twitter
            </span>
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-2 text-white hover:text-red-500 transition-colors"
          >
            <span className="vertical-text font-sans font-semibold text-xs tracking-wider uppercase underline">
              Tik-tok
            </span>
          </a>
        </div>
      </aside>

      {/* Main Header */}
      <header>
        {/* Navbar */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[80vw] max-w-[1300px] flex items-center justify-between px-4 py-0.5 z-20 border border-gray-800 bg-black/75 rounded-md backdrop-blur-sm">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <Image
                alt="NRG Radio Uganda logo"
                className="h-16 w-auto"
                src="/nrg-logo.webp"
                width={64}
                height={64}
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 text-gray-300 text-sm font-extrabold">
            <li className="text-lg font-bold hover:text-red-500 transition-colors">
              <Link href="/">Home</Link>
            </li>
            <li className="text-lg font-bold hover:text-red-500 transition-colors">
              <Link href="/news">News</Link>
            </li>
            <li className="text-lg font-bold hover:text-red-500 transition-colors">
              <Link href="/shop">Merchandise</Link>
            </li>
            <li className="text-lg font-bold hover:text-red-500 transition-colors">
              <Link href="/contact">Get In Touch</Link>
            </li>
          </ul>

          {/* Player Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/listen"
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-semibold text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Listen</span>
            </Link>
            <Link
              href="/watch"
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-semibold text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 1v1h8v-1l-1-1h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"/>
              </svg>
              <span>Watch</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            id="menu-toggle"
            className="md:hidden text-white text-2xl focus:outline-none p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

        </nav>

        {/* Mobile Drawer Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-600">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-900 rounded-lg"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex-1 p-6">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Merchandise
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get In Touch
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors border-l-2 border-red-600"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-red-400 font-semibold">Admin Access</span>
                  </Link>
                </li>
              </ul>
              
              {/* Player Buttons - Mobile */}
              <div className="mt-6 space-y-3">
                <Link
                  href="/listen"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-semibold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Listen Live</span>
                </Link>
                <Link
                  href="/watch"
                  onClick={closeMobileMenu}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-semibold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 1v1h8v-1l-1-1h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"/>
                  </svg>
                  <span>Watch Live</span>
                </Link>
              </div>
            </nav>

          </div>
        </div>
      </header>
    </>
  )
}
