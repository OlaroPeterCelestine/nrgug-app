# NRG UG Website API Security Configuration

## Overview
This document describes how the API URLs are hidden and secured in the NRG UG website.

## Architecture

### Client-Side (Browser)
- **API Base URL**: `/api/proxy` (relative URL, no external API exposed)
- **Configuration**: `src/lib/client-api.ts`
- **Usage**: All client-side API calls go through the proxy

### Server-Side (Next.js API Routes)
- **API Base URL**: `process.env.BACKEND_URL` (environment variable)
- **Configuration**: `src/lib/server-api.ts`
- **Proxy Route**: `src/app/api/proxy/[...path]/route.ts`

### Environment Variables
- **BACKEND_URL**: The actual API URL (hidden from client)
- **NEXT_PUBLIC_API_URL**: Removed (no longer needed)

## Security Benefits

1. **Hidden API Endpoints**: The real API URL is never exposed to the client
2. **Environment-Based**: API URL is configurable via environment variables
3. **Proxy Layer**: All requests go through Next.js API routes
4. **CORS Handling**: Proper CORS headers are set by the proxy
5. **Error Handling**: Centralized error handling in the proxy

## File Structure

```
nrg/
├── src/
│   ├── lib/
│   │   ├── api-utils.ts          # API utility functions
│   │   ├── client-api.ts         # Client-side configuration
│   │   └── server-api.ts         # Server-side configuration
│   └── app/
│       └── api/
│           └── proxy/
│               └── [...path]/
│                   └── route.ts  # Proxy implementation
├── vercel.json                   # Environment configuration
└── API_SECURITY.md              # This documentation
```

## Updated Components

The following components have been updated to use the secure API system:

### Pages
- `src/app/shows/page.tsx` - Shows listing
- `src/app/clients/page.tsx` - Clients listing
- `src/app/news/page.tsx` - News listing
- `src/app/news/[id]/page.tsx` - News detail
- `src/app/contact/page.tsx` - Contact form
- `src/app/video/page.tsx` - Video page
- `src/app/page.tsx` - Home page

### Components
- `src/components/BottomStickyPlayer.tsx` - Audio player
- `src/components/BottomVideoPlayer.tsx` - Video player
- `src/components/OnAirCarousel.tsx` - Shows carousel
- `src/components/ClientCarousel.tsx` - Clients carousel
- `src/components/Footer.tsx` - Newsletter subscription
- `src/components/NewsSection.tsx` - News section
- `src/components/VideosSection.tsx` - Videos section

## API Endpoints Used

The following API endpoints are now secured through the proxy:

- `GET /api/proxy/shows` - Fetch radio shows
- `GET /api/proxy/clients` - Fetch client partners
- `GET /api/proxy/news` - Fetch news articles
- `GET /api/proxy/news/{id}` - Fetch specific news article
- `POST /api/proxy/subscribers` - Newsletter subscription
- `POST /api/proxy/contact` - Contact form submission
- `GET /api/proxy/hero-selection` - Hero content selection
- `GET /api/proxy/videos` - Fetch videos

## Deployment

The API URL is hidden through:
1. Environment variables in Vercel
2. Next.js API routes as proxy
3. Client-side configuration using relative URLs

## Testing

To test the proxy:
```bash
# This will go through the proxy
curl https://your-website-domain.vercel.app/api/proxy/news

# This will be blocked (direct API access)
curl https://nrgug-api-production.up.railway.app/api/news
```

## Security Features

- ✅ **API URL Hidden**: Real backend URL is never exposed to users
- ✅ **Environment Configurable**: Easy to change backend URL via environment variables
- ✅ **CORS Handled**: Proper cross-origin request handling
- ✅ **Error Management**: Centralized error handling and logging
- ✅ **Performance**: Minimal overhead with efficient proxy implementation
- ✅ **Type Safety**: TypeScript interfaces for all API responses
- ✅ **Utility Functions**: Reusable API utility functions for consistency

