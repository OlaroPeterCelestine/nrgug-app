import 'dart:convert';
import '../config/api_config.dart';
import '../models/video.dart';
import 'api_service.dart';

class VideoService {
  final ApiService _apiService = ApiService();

  Future<List<Video>> getVideos() async {
    try {
      final response = await _apiService.get(ApiConfig.videosEndpoint);
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = jsonDecode(response.body);
        return jsonList.map((json) => Video.fromJson(json as Map<String, dynamic>)).toList();
      } else {
        throw Exception('Failed to load videos: ${response.statusCode}');
      }
    } catch (e) {
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

