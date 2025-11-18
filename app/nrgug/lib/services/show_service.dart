import 'dart:convert';
import '../config/api_config.dart';
import '../models/show.dart';
import 'api_service.dart';

class ShowService {
  final ApiService _apiService = ApiService();

  Future<List<Show>> getShows() async {
    try {
      final response = await _apiService.get(ApiConfig.showsEndpoint);
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = jsonDecode(response.body);
        return jsonList.map((json) => Show.fromJson(json as Map<String, dynamic>)).toList();
      } else {
        throw Exception('Failed to load shows: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching shows: $e');
    }
  }

  Future<Show> getShowById(int id) async {
    try {
      final response = await _apiService.get('${ApiConfig.showsEndpoint}/$id');
      
      if (response.statusCode == 200) {
        return Show.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
      } else {
        throw Exception('Failed to load show: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching show: $e');
    }
  }
}

