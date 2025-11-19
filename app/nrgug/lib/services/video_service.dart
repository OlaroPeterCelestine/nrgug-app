import 'dart:convert';
import '../config/api_config.dart';
import '../models/video.dart';
import '../utils/cache_helper.dart';
import 'api_service.dart';

class VideoService {
  final ApiService _apiService = ApiService();
  static const String _cacheKey = 'videos_list';

  Future<List<Video>> getVideos({bool useCache = true}) async {
    // Try to load from cache first
    if (useCache) {
      final cachedData = await CacheHelper.getCache(_cacheKey);
      if (cachedData != null) {
        try {
          final List<dynamic> jsonList = cachedData as List<dynamic>;
          return jsonList.map((json) => Video.fromJson(json as Map<String, dynamic>)).toList();
        } catch (e) {
          // Silently fail - will fetch from API instead
        }
      }
    }

    // Fetch from API
    try {
      final response = await _apiService.get(ApiConfig.videosEndpoint);
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = jsonDecode(response.body);
        final videosList = jsonList.map((json) => Video.fromJson(json as Map<String, dynamic>)).toList();
        
        // Save to cache
        await CacheHelper.saveCache(_cacheKey, jsonList);
        
        return videosList;
      } else {
        throw Exception('Failed to load videos: ${response.statusCode}');
      }
    } catch (e) {
      // If API fails, try to return cached data
      if (useCache) {
        final cachedData = await CacheHelper.getCache(_cacheKey);
        if (cachedData != null) {
          try {
            final List<dynamic> jsonList = cachedData as List<dynamic>;
            return jsonList.map((json) => Video.fromJson(json as Map<String, dynamic>)).toList();
          } catch (_) {}
        }
      }
      throw Exception('Error fetching videos: $e');
    }
  }

  Future<Video> getVideoById(int id) async {
    try {
      final response = await _apiService.get('${ApiConfig.videosEndpoint}/$id');
      
      if (response.statusCode == 200) {
        return Video.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
      } else {
        throw Exception('Failed to load video: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching video: $e');
    }
  }
}

