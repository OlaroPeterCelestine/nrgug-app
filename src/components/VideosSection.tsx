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
          {videos.map((video) => {
            console.log('🎬 Rendering video:', video)
            const embedUrl = getEmbedUrl(video.video_url)
            console.log('🎬 Final embed URL:', embedUrl)
            
            // Use original smaller rectangle heights for all videos
            const videoHeight = 'h-21 lg:h-25'
            
            return (
              <div key={video.id} className="flex flex-col rounded-lg hover:bg-gray-900/50 transition-colors">
                <iframe
                  className={`w-full ${videoHeight} rounded-lg flex-shrink-0`}
                  src={embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <div className="mt-2">
                  <h4 className="font-bold text-xs lg:text-sm text-center">{video.title}</h4>
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
    </div>
  )
}
