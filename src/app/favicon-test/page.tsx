import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favicon Test Page',
  description: 'Test page to verify favicon is working correctly',
}

export default function FaviconTestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-red-500">Favicon Test Page</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Favicon Configuration</h2>
            <p className="text-gray-300 mb-4">
              This page should display the same favicon as the index page. The favicon is configured in the root layout.tsx file.
            </p>
            
            <div className="space-y-2 text-sm text-gray-400">
              <p>✅ Root layout.tsx has favicon configuration</p>
              <p>✅ Multiple favicon formats supported (ICO, SVG, PNG)</p>
              <p>✅ Apple touch icon configured</p>
              <p>✅ Web app manifest included</p>
              <p>✅ Viewport meta tag configured</p>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Favicon Files Available</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• /favicon.ico - Main favicon file</li>
              <li>• /favicon.svg - Vector favicon for modern browsers</li>
              <li>• /favicon-16x16.png - 16x16 PNG favicon</li>
              <li>• /favicon-32x32.png - 32x32 PNG favicon</li>
              <li>• /manifest.json - Web app manifest</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Browser Support</h2>
            <p className="text-gray-300 mb-4">
              The favicon should work in all modern browsers and devices:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• Chrome, Firefox, Safari, Edge</li>
              <li>• Mobile browsers (iOS Safari, Chrome Mobile)</li>
              <li>• PWA installations</li>
              <li>• Bookmark icons</li>
              <li>• Tab icons</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Test Instructions</h2>
            <ol className="space-y-2 text-gray-300 list-decimal list-inside">
              <li>Check the browser tab - should show NRG Radio favicon</li>
              <li>Bookmark this page - favicon should appear in bookmarks</li>
              <li>Add to home screen (mobile) - should use the favicon</li>
              <li>Check browser history - favicon should be visible</li>
              <li>Navigate to other pages - favicon should remain consistent</li>
            </ol>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Navigation Test</h2>
            <div className="space-x-4">
              <a href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Go to Home
              </a>
              <a href="/listen" className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                Go to Listen
              </a>
              <a href="/watch" className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                Go to Watch
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              All pages should display the same favicon in the browser tab.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
