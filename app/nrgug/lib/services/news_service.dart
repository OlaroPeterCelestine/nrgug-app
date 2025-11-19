import 'dart:convert';
import '../config/api_config.dart';
import '../models/news.dart';
import '../utils/cache_helper.dart';
import 'api_service.dart';

class NewsService {
  final ApiService _apiService = ApiService();
  static const String _cacheKey = 'news_list';

  Future<List<News>> getNews({bool useCache = true}) async {
    // Try to load from cache first
    if (useCache) {
      final cachedData = await CacheHelper.getCache(_cacheKey);
      if (cachedData != null) {
        try {
          final List<dynamic> jsonList = cachedData as List<dynamic>;
          return jsonList.map((json) => News.fromJson(json as Map<String, dynamic>)).toList();
        } catch (e) {
          // Silently fail - will fetch from API instead
        }
      }
    }

    // Fetch from API
    try {
      final response = await _apiService.get(ApiConfig.newsEndpoint);
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = jsonDecode(response.body);
        final newsList = jsonList.map((json) => News.fromJson(json as Map<String, dynamic>)).toList();
        
        // Save to cache
        await CacheHelper.saveCache(_cacheKey, jsonList);
        
        return newsList;
      } else {
        throw Exception('Failed to load news: ${response.statusCode}');
      }
    } catch (e) {
      // If API fails, try to return cached data
      if (useCache) {
        final cachedData = await CacheHelper.getCache(_cacheKey);
        if (cachedData != null) {
          try {
            final List<dynamic> jsonList = cachedData as List<dynamic>;
            return jsonList.map((json) => News.fromJson(json as Map<String, dynamic>)).toList();
          } catch (_) {}
        }
      }
      throw Exception('Error fetching news: $e');
    }
  }

  Future<News> getNewsById(int id) async {
    try {
      final response = await _apiService.get('${ApiConfig.newsEndpoint}/$id');
      
      if (response.statusCode == 200) {
        return News.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
      } else {
        throw Exception('Failed to load news: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching news: $e');
    }
  }

  Future<News> createNews({
    required String title,
    required String story,
    required String author,
    required String category,
    String? image,
  }) async {
    try {
      final body = {
        'title': title,
        'story': story,
        'author': author,
        'category': category,
        if (image != null) 'image': image,
      };
      
      final response = await _apiService.post(ApiConfig.newsEndpoint, body);
      
      if (response.statusCode == 200 || response.statusCode == 201) {
        return News.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
      } else {
        throw Exception('Failed to create news: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error creating news: $e');
    }
  }
}

