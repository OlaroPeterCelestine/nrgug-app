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
      const response = await fetch('https://nrgug-api-production.up.railway.app/api/videos', {
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
          console.log('Videos data received:', data)
          // Show only the first 3 videos
          setVideos((data || []).slice(0, 3))
        } else {
          console.error('❌ Response is not JSON:', contentType)
          // Use fallback data
        }
      } else {
        console.error('API response not ok:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('Error response body:', errorText)
        // Use fallback data
        setVideos([
          {
            id: 1,
            title: 'NRG Radio Live Stream',
            video_url: 'https://www.youtube.com/watch?v=dFcXTOIDJLk',
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            title: 'Music Mix 2025',
            video_url: 'https://www.youtube.com/watch?v=dFcXTOIDJLk',
            created_at: new Date().toISOString()
          },
          {
            id: 3,
            title: 'NRG Highlights',
            video_url: 'https://www.youtube.com/watch?v=dFcXTOIDJLk',
            created_at: new Date().toISOString()
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      // Use fallback data
      setVideos([
        {
          id: 1,
          title: 'NRG Radio Live Stream',
          video_url: 'https://www.youtube.com/watch?v=dFcXTOIDJLk',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Music Mix 2025',
          video_url: 'https://www.youtube.com/watch?v=dFcXTOIDJLk',
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          title: 'NRG Highlights',
          video_url: 'https://www.youtube.com/watch?v=dFcXTOIDJLk',
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // Convert YouTube watch URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?mute=1`
    }
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
      ) : (
        <div className="grid grid-cols-3 lg:block lg:space-y-0 gap-0">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col p-1 rounded-lg hover:bg-gray-900/50 transition-colors">
              <iframe
                className="w-full h-21 lg:h-25 rounded-lg flex-shrink-0"
                src={getEmbedUrl(video.video_url)}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="mt-2">
                <h4 className="font-bold text-xs lg:text-sm text-center">{video.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
