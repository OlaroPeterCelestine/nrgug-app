'use client'

export default function VideoPage() {

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Full Screen Video Container */}
      <div className="relative w-full bg-black" style={{ height: '100vh' }}>
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
