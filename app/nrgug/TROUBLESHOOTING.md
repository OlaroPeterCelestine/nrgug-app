# API Integration Troubleshooting Guide

## Current Issue: DNS Resolution Failure

If you see this error:
```
Failed host lookup: 'nrgug-api-production.up.railway.app' (OS Error: No address associated with hostname, errno = 7)
```

This means the device cannot resolve the Railway domain name.

## Solutions

### 1. Check Device Internet Connection
- Ensure the device/emulator has active internet connection
- Try opening a browser on the device and visiting: `https://nrgug-api-production.up.railway.app/health`
- If the browser can't load it, the device has network issues

### 2. Check DNS Settings
- On Android emulator: DNS should be automatically configured
- On physical device: Check WiFi settings and DNS configuration
- Try switching between WiFi and mobile data

### 3. Verify API is Accessible
Run this command on your computer:
```bash
curl https://nrgug-api-production.up.railway.app/api/news
```

If this works, the API is fine and the issue is with the device's network.

### 4. Test with IP Address (Temporary)
If DNS continues to fail, you can temporarily use the Railway IP:
1. Find Railway IP: `nslookup nrgug-api-production.up.railway.app`
2. Update `lib/config/api_config.dart` to use IP (not recommended for production)

### 5. Network Security Configuration
For Android, ensure network security config allows HTTPS:
- Check `android/app/src/main/AndroidManifest.xml` has internet permission
- Verify no network security config is blocking Railway domains

## Current Configuration

- **API URL**: `https://nrgug-api-production.up.railway.app`
- **Retry Logic**: 2 retries with exponential backoff
- **Timeout**: 30 seconds per request
- **Error Handling**: User-friendly error messages

## Testing the API

The app now includes:
- ✅ Automatic retry on failure (2 retries)
- ✅ Better error messages
- ✅ Debug logging for API requests
- ✅ Graceful error handling with retry buttons

## Next Steps

1. **Ensure device has internet**: Check WiFi/mobile data
2. **Test in browser**: Open `https://nrgug-api-production.up.railway.app/health` on device
3. **Check logs**: Look for `API Request:` and `API Response:` in Flutter console
4. **Use retry button**: The app shows a retry button when errors occur

## API Endpoints Being Used

- `/api/news` - News articles
- `/api/shows` - Radio shows schedule
- `/api/videos` - Video content
- `/api/clients` - Client logos

All endpoints are tested and working from the server side.

