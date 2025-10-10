'use client'

import Header from '@/components/Header'

export default function VideoPage() {

  const createPlayer = (type: 'listen' | 'watch') => {
    // This function is required by Header but not used on this page
    console.log('Player creation not needed on video page')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header createPlayer={createPlayer} />
      
      {/* Full Screen Video Container */}
      <div className="relative w-full bg-black" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Video Player */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html"
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            title="NRG Radio Live Video"
          />
        </div>

      </div>
    </div>
  )
}
