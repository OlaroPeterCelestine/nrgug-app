# API Integration Guide

The Flutter app has been integrated with the Go API backend. This document explains how to configure and use the API integration.

## Setup

1. **Install Dependencies**
   ```bash
   cd app/nrgug
   flutter pub get
   ```

2. **API Base URL**
   
   The app is currently configured to use the Railway production API:
   ```dart
   static const String baseUrl = 'https://nrgug-api-production.up.railway.app';
   ```
   
   To switch to local development, edit `lib/config/api_config.dart`:
   - Comment out the Railway URL
   - Uncomment the local development code block

## Integrated Features

### 1. News API
- **HomeScreen**: Displays news carousel with real data from `/api/news`
- **NewsScreen**: Shows all news articles from the API
- Fetches: title, story, author, category, image, timestamp

### 2. Shows API
- **ScheduleScreen**: Displays all shows from `/api/shows`
- Fetches: show name, time, presenters, day of week, image

### 3. Videos API
- **HomeScreen**: Displays popular videos from `/api/videos`
- Fetches: title, video URL, creation date

### 4. Clients API
- **HomeScreen**: Ready to display clients from `/api/clients`
- Fetches: name, image, link

## API Services

All API services are located in `lib/services/`:
- `api_service.dart` - Base HTTP service
- `news_service.dart` - News API operations
- `show_service.dart` - Shows API operations
- `video_service.dart` - Videos API operations
- `client_service.dart` - Clients API operations

## Models

Data models matching the Go API are in `lib/models/`:
- `news.dart` - News model
- `show.dart` - Show model
- `video.dart` - Video model
- `client.dart` - Client model

## Error Handling

All screens include:
- Loading states while fetching data
- Error messages with retry functionality
- Empty state handling when no data is available

## Testing

1. Make sure your Go API server is running on port 8080
2. Update the `baseUrl` in `api_config.dart` to match your setup
3. Run the Flutter app:
   ```bash
   flutter run
   ```

## Notes

- The app handles network errors gracefully
- Images fall back to placeholder images if API images fail to load
- All API calls have a 10-second timeout
- CORS is handled by the Go API backend

