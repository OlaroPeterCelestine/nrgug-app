class ApiConfig {
  // Railway API production URL
  // This is the deployed Go API on Railway
  static const String baseUrl = 'https://nrgug-api-production.up.railway.app';
  
  // For local development, uncomment the lines below and comment out the Railway URL above:
  // import 'dart:io';
  // static String get baseUrl {
  //   if (Platform.isAndroid) {
  //     return 'http://10.0.2.2:8080';
  //   } else {
  //     return 'http://localhost:8080';
  //   }
  // }
  
  // API endpoints
  static const String newsEndpoint = '/api/news';
  static const String showsEndpoint = '/api/shows';
  static const String videosEndpoint = '/api/videos';
  static const String clientsEndpoint = '/api/clients';
  static const String contactEndpoint = '/api/contact';
  static const String heroSelectionEndpoint = '/api/hero-selection';
  static const String healthEndpoint = '/health';
  static const String pointsUserEndpoint = '/api/points/user';
  static const String pointsLeaderboardEndpoint = '/api/points/leaderboard';
  static const String streakUpdateEndpoint = '/api/streak/update';
  static const String streakInfoEndpoint = '/api/streak';
  
  // Helper method to get full URL
  static String getUrl(String endpoint) {
    return '$baseUrl$endpoint';
  }
}

