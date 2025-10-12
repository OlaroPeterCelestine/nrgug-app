// Streaming configuration for NRG Radio
export const STREAMING_CONFIG = {
  // Audio streaming URLs
  audio: {
    primary: process.env.NEXT_PUBLIC_AUDIO_STREAM_URL || 'https://dc4.serverse.com/proxy/nrgugstream/stream',
    backup: process.env.NEXT_PUBLIC_AUDIO_STREAM_URL_BACKUP || 'https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html',
    // Alternative streaming services
    alternatives: [
      'https://dc4.serverse.com/proxy/nrgugstream/stream',
      'https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html',
      'https://stream.radio.co/s02012345/listen'
    ]
  },
  
  // Video streaming URLs
  video: {
    primary: process.env.NEXT_PUBLIC_VIDEO_STREAM_URL || 'https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html',
    backup: process.env.NEXT_PUBLIC_VIDEO_STREAM_URL_BACKUP || 'https://dc4.serverse.com/proxy/nrgugstream/stream',
    // Alternative video platforms
    alternatives: [
      'https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html',
      'https://dc4.serverse.com/proxy/nrgugstream/stream',
      'https://www.youtube.com/embed/live_stream_id'
    ]
  },
  
  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://nrgug-api-production.up.railway.app',
    endpoints: {
      streamStatus: '/api/stream/status',
      currentShow: '/api/shows/current',
      listenerCount: '/api/stream/listeners'
    }
  },
  
  // Stream metadata
  metadata: {
    stationName: 'NRG Radio Uganda',
    frequency: '104.1 FM',
    location: 'Kampala, Uganda',
    website: 'https://nrgug.vercel.app',
    social: {
      facebook: 'https://facebook.com/nrgradiouganda',
      twitter: 'https://twitter.com/nrgradiouganda',
      instagram: 'https://instagram.com/nrgradiouganda'
    }
  }
}

// Helper functions
export const getStreamUrl = (type: 'audio' | 'video', useBackup = false) => {
  const config = STREAMING_CONFIG[type]
  return useBackup ? config.backup : config.primary
}

export const getApiUrl = (endpoint: string) => {
  return `${STREAMING_CONFIG.api.baseUrl}${STREAMING_CONFIG.api.endpoints[endpoint as keyof typeof STREAMING_CONFIG.api.endpoints] || endpoint}`
}
