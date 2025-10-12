import { Metadata } from 'next'
import { STREAMING_CONFIG, getStreamUrl } from '@/config/streaming'

export const metadata: Metadata = {
  title: 'Stream Test Page',
  description: 'Test page to verify NRG Radio streaming URLs are working',
}

export default function StreamTestPage() {
  const audioUrl = getStreamUrl('audio')
  const videoUrl = getStreamUrl('video')
  const audioBackup = getStreamUrl('audio', true)
  const videoBackup = getStreamUrl('video', true)

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-red-500">NRG Radio Stream Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Audio Stream Test */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">🎵 Audio Stream Test</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Primary Audio Stream</h3>
                <p className="text-sm text-gray-400 mb-2">URL: {audioUrl}</p>
                <audio 
                  controls 
                  className="w-full"
                  preload="none"
                >
                  <source src={audioUrl} type="audio/mpeg" />
                  <source src={audioUrl} type="audio/ogg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Backup Audio Stream</h3>
                <p className="text-sm text-gray-400 mb-2">URL: {audioBackup}</p>
                <audio 
                  controls 
                  className="w-full"
                  preload="none"
                >
                  <source src={audioBackup} type="audio/mpeg" />
                  <source src={audioBackup} type="audio/ogg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>

          {/* Video Stream Test */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">📺 Video Stream Test</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Primary Video Stream</h3>
                <p className="text-sm text-gray-400 mb-2">URL: {videoUrl}</p>
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; fullscreen; microphone; camera"
                    allowFullScreen
                    title="NRG Radio Primary Video Stream"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Backup Video Stream</h3>
                <p className="text-sm text-gray-400 mb-2">URL: {videoBackup}</p>
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    src={videoBackup}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; fullscreen; microphone; camera"
                    allowFullScreen
                    title="NRG Radio Backup Video Stream"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Info */}
        <div className="mt-8 bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">⚙️ Configuration Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Audio Configuration</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Primary: {STREAMING_CONFIG.audio.primary}</li>
                <li>• Backup: {STREAMING_CONFIG.audio.backup}</li>
                <li>• Alternatives: {STREAMING_CONFIG.audio.alternatives.length} options</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Video Configuration</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Primary: {STREAMING_CONFIG.video.primary}</li>
                <li>• Backup: {STREAMING_CONFIG.video.backup}</li>
                <li>• Alternatives: {STREAMING_CONFIG.video.alternatives.length} options</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">API Configuration</h3>
            <p className="text-sm text-gray-300">Base URL: {STREAMING_CONFIG.api.baseUrl}</p>
          </div>
        </div>

        {/* Test Instructions */}
        <div className="mt-8 bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">🧪 Test Instructions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Audio Testing</h3>
              <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                <li>Click play on the primary audio stream</li>
                <li>Verify you can hear NRG Radio audio</li>
                <li>Test the backup stream if primary fails</li>
                <li>Check volume controls work properly</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Video Testing</h3>
              <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
                <li>Check if the video player loads correctly</li>
                <li>Verify the iframe displays the NRG Radio player</li>
                <li>Test fullscreen functionality</li>
                <li>Check if video controls are accessible</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <a href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
              Go to Home
            </a>
            <a href="/listen" className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
              Go to Listen
            </a>
            <a href="/watch" className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
              Go to Watch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
