import 'dart:convert';
import '../config/api_config.dart';
import '../models/news.dart';
import 'api_service.dart';

class NewsService {
  final ApiService _apiService = ApiService();

  Future<List<News>> getNews() async {
    try {
      final response = await _apiService.get(ApiConfig.newsEndpoint);
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = jsonDecode(response.body);
        return jsonList.map((json) => News.fromJson(json as Map<String, dynamic>)).toList();
      } else {
        throw Exception('Failed to load news: ${response.statusCode}');
      }
    } catch (e) {
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

