# 🎵 NRG Radio Streaming Configuration

This document explains how to configure the streaming URLs for the Listen and Watch pages.

## 📁 Configuration Files

The streaming configuration is managed in `/src/config/streaming.ts`. This file contains:

- Audio streaming URLs
- Video streaming URLs  
- API endpoints
- Station metadata
- Helper functions

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Audio streaming URLs
NEXT_PUBLIC_AUDIO_STREAM_URL=https://dc4.serverse.com/proxy/nrgugstream/stream
NEXT_PUBLIC_AUDIO_STREAM_URL_BACKUP=https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html

# Video streaming URLs
NEXT_PUBLIC_VIDEO_STREAM_URL=https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html
NEXT_PUBLIC_VIDEO_STREAM_URL_BACKUP=https://dc4.serverse.com/proxy/nrgugstream/stream

# API configuration
NEXT_PUBLIC_API_URL=https://nrgug-api-production.up.railway.app
```

## 🎵 Audio Streaming Services

### NRG Radio Stream (Primary)
```bash
NEXT_PUBLIC_AUDIO_STREAM_URL=https://dc4.serverse.com/proxy/nrgugstream/stream
```

### NRG Radio Player (Backup)
```bash
NEXT_PUBLIC_AUDIO_STREAM_URL_BACKUP=https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html
```

### Alternative Services
```bash
# Radio.co
NEXT_PUBLIC_AUDIO_STREAM_URL=https://stream.radio.co/s[STATION_ID]/listen

# Icecast
NEXT_PUBLIC_AUDIO_STREAM_URL=https://icecast.example.com/stream

# Shoutcast
NEXT_PUBLIC_AUDIO_STREAM_URL=https://shoutcast.example.com:8000/stream
```

## 📺 Video Streaming Services

### NRG Radio Player (Primary)
```bash
NEXT_PUBLIC_VIDEO_STREAM_URL=https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html
```

### NRG Radio Stream (Backup)
```bash
NEXT_PUBLIC_VIDEO_STREAM_URL_BACKUP=https://dc4.serverse.com/proxy/nrgugstream/stream
```

### Alternative Services
```bash
# YouTube Live
NEXT_PUBLIC_VIDEO_STREAM_URL=https://www.youtube.com/embed/[VIDEO_ID]

# Twitch
NEXT_PUBLIC_VIDEO_STREAM_URL=https://player.twitch.tv/embed?channel=[CHANNEL_NAME]

# Vimeo Live
NEXT_PUBLIC_VIDEO_STREAM_URL=https://player.vimeo.com/video/[VIDEO_ID]

# Facebook Live
NEXT_PUBLIC_VIDEO_STREAM_URL=https://www.facebook.com/plugins/video.php?href=[VIDEO_URL]
```

## 🔌 API Endpoints

The app expects these API endpoints to be available:

- `GET /api/stream/status` - Stream status information
- `GET /api/shows/current` - Current show information
- `GET /api/stream/listeners` - Listener/viewer count

## 🛠️ Customization

### Station Information
Update the metadata in `/src/config/streaming.ts`:

```typescript
metadata: {
  stationName: 'Your Radio Station',
  frequency: '104.1 FM',
  location: 'Your City, Country',
  website: 'https://yourwebsite.com',
  social: {
    facebook: 'https://facebook.com/yourstation',
    twitter: 'https://twitter.com/yourstation',
    instagram: 'https://instagram.com/yourstation'
  }
}
```

### Adding New Streaming Services
Add new URLs to the alternatives array:

```typescript
audio: {
  alternatives: [
    'https://stream.radio.co/s02012345/listen',
    'https://icecast.example.com/nrg-radio',
    'https://your-new-service.com/stream'
  ]
}
```

## 🚀 Deployment

1. Set environment variables in your deployment platform
2. Update the API URL to point to your production API
3. Test the streaming URLs to ensure they work correctly
4. Monitor the console for any streaming errors

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your streaming service allows cross-origin requests
2. **Autoplay Blocked**: Modern browsers block autoplay - users need to interact first
3. **Stream Not Loading**: Check if the streaming URL is correct and accessible
4. **API Errors**: Verify the API endpoints are working and returning correct data

### Debug Mode

Enable debug logging by adding to your environment:

```bash
NEXT_PUBLIC_DEBUG_STREAMING=true
```

This will log detailed information about streaming attempts and errors.

## 📱 Mobile Considerations

- iOS Safari has strict autoplay policies
- Some streaming formats may not work on all devices
- Consider providing fallback URLs for different platforms
- Test on actual devices, not just desktop browsers

## 🔒 Security

- Never expose sensitive API keys in client-side code
- Use HTTPS for all streaming URLs
- Validate streaming URLs before using them
- Implement proper error handling for failed streams
