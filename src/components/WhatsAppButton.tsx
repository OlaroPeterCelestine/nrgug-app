'use client'

import { useState } from 'react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const inquiryOptions = [
    {
      id: 'general',
      title: 'General Inquiry',
      message: 'Hello! I have a general question about NRG Radio.'
    },
    {
      id: 'partnership',
      title: 'Partnership',
      message: 'Hello! I\'m interested in partnering with NRG Radio.'
    },
    {
      id: 'advertising',
      title: 'Advertising',
      message: 'Hello! I\'d like to know about advertising opportunities with NRG Radio.'
    },
    {
      id: 'events',
      title: 'Events',
      message: 'Hello! I\'m interested in NRG Radio events and shows.'
    },
    {
      id: 'support',
      title: 'Technical Support',
      message: 'Hello! I need technical support with NRG Radio services.'
    },
    {
      id: 'feedback',
      title: 'Feedback',
      message: 'Hello! I\'d like to share feedback about NRG Radio.'
    }
  ]

  const handleInquiryClick = (inquiry: typeof inquiryOptions[0]) => {
    const phoneNumber = '256740674674' // NRG Radio WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(inquiry.message)}`
    window.open(whatsappUrl, '_blank')
    setIsMenuOpen(false)
  }

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="fixed bottom-24 right-8 z-[100]">
      {/* Inquiry Menu */}
      {isMenuOpen && (
        <div className="absolute bottom-20 right-0 bg-black rounded-2xl shadow-2xl border border-gray-700 w-64 max-h-80 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-3 text-center">How can we help you?</h3>
            <div className="space-y-2">
              {inquiryOptions.map((inquiry) => (
                <button
                  key={inquiry.id}
                  onClick={() => handleInquiryClick(inquiry)}
                  className="w-full text-left p-3 rounded-xl hover:bg-gray-800 hover:text-green-400 transition-colors duration-200 border border-transparent hover:border-gray-600"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-white">{inquiry.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 group border-2 border-white ${
          isMenuOpen ? 'ring-4 ring-green-200' : ''
        }`}
        title="Select inquiry type"
      >
        {isMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        )}
      </button>
      
      {/* Chat Bubble Tooltip */}
      {isHovered && !isMenuOpen && (
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 text-sm px-4 py-3 rounded-2xl whitespace-nowrap shadow-xl border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Select inquiry type</span>
          </div>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      )}
    </div>
  )
}
