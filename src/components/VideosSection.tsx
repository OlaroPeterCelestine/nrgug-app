'use client'

import { useState, useEffect } from 'react'

interface Video {
  id: number
  title: string
  video_url: string
  created_at: string
}

export default function VideosSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      console.log('🎬 Fetching videos from API...')
      
      const response = await fetch('https://nrgug-api-production.up.railway.app/api/videos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })

      console.log('🎬 API response status:', response.status)
      console.log('🎬 API response ok:', response.ok)

      if (response.ok) {
        const contentType = response.headers.get('content-type')
        console.log('🎬 Content type:', contentType)
        
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          console.log('🎬 Videos data received:', data)
          console.log('🎬 Number of videos:', data?.length || 0)
          
          // Show only the first 3 videos
          const videosToShow = (data || []).slice(0, 3)
          console.log('🎬 Videos to display:', videosToShow)
          setVideos(videosToShow)
        } else {
          console.error('❌ Response is not JSON:', contentType)
          setVideos([])
        }
      } else {
        console.error('❌ API response not ok:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('❌ Error response body:', errorText)
        setVideos([])
      }
    } catch (error) {
      console.error('❌ Error fetching videos:', error)
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  // Convert video URL to embed URL (supports YouTube)
  const getEmbedUrl = (url: string) => {
    console.log('🎬 Converting URL to embed:', url)
    
    // Handle YouTube youtube.com/watch?v= format
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0]
      const embedUrl = `https://www.youtube.com/embed/${videoId}?mute=1`
      console.log('🎬 Converted YouTube to embed URL:', embedUrl)
      return embedUrl
    }
    
    // Handle YouTube youtu.be/ format
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0]
      const embedUrl = `https://www.youtube.com/embed/${videoId}?mute=1`
      console.log('🎬 Converted YouTube to embed URL:', embedUrl)
      return embedUrl
    }
    
    console.log('🎬 URL not recognized, returning as-is:', url)
    return url
  }

  // Convert video URL to full-screen embed URL (autoplay enabled)
  const getFullScreenEmbedUrl = (url: string) => {
    console.log('🎬 Converting URL to full-screen embed:', url)
    
    // Handle YouTube youtube.com/watch?v= format
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0]
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&showinfo=0&modestbranding=1`
      console.log('🎬 Converted YouTube to full-screen embed URL:', embedUrl)
      return embedUrl
    }
    
    // Handle YouTube youtu.be/ format
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0]
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&showinfo=0&modestbranding=1`
      console.log('🎬 Converted YouTube to full-screen embed URL:', embedUrl)
      return embedUrl
    }
    
    console.log('🎬 URL not recognized, returning as-is:', url)
    return url
  }

  // Handle video click to open full-screen modal
  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleCloseModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isModalOpen])

  return (
    <div className="lg:col-span-1">
      <h3 className="text-2xl font-bold mb-4 border-b-2 border-red-500 pb-2">Latest Videos</h3>
      {loading ? (
        <div className="grid grid-cols-3 lg:block lg:space-y-0 gap-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col p-1 rounded-lg">
              <div className="skeleton-image h-21 lg:h-25 flex-shrink-0"></div>
              <div className="mt-2">
                <div className="skeleton-text w-24 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-3 lg:block lg:space-y-0 gap-0">
          {videos.map((video, index) => {
            console.log('🎬 Rendering video:', video)
            const embedUrl = getEmbedUrl(video.video_url)
            console.log('🎬 Final embed URL:', embedUrl)
            
            // Use original smaller rectangle heights for all videos
            const videoHeight = 'h-21 lg:h-25'
            
            return (
              <div key={video.id} className="flex flex-col rounded-lg hover:bg-gray-900/50 transition-colors">
                <div 
                  className={`w-full ${videoHeight} rounded-lg flex-shrink-0 relative cursor-pointer group`}
                  onClick={() => handleVideoClick(video)}
                >
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={embedUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  {/* Overlay with play button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="font-bold text-xs lg:text-sm text-center">{video.title}</h4>
                  <p className="text-xs text-gray-400 text-center mt-1">Click to watch full screen</p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No videos available at the moment</p>
        </div>
      )}

      {/* Full-screen Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative w-full h-full max-w-7xl max-h-screen p-4">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video container */}
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="w-full h-full max-w-5xl">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={getFullScreenEmbedUrl(selectedVideo.video_url)}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Video title */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-400 text-sm">Press ESC or click the X to close</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
