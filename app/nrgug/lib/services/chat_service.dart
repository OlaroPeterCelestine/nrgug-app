import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/api_config.dart';
import 'api_service.dart';

class ChatService {
  final ApiService _apiService = ApiService();

  Future<void> sendMessage(String message) async {
    try {
      // Get JWT token from SharedPreferences
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwtToken');
      
      if (token == null) {
        throw Exception('Not authenticated. Please login.');
      }

      final response = await _apiService.postWithAuth(
        ApiConfig.chatMessagesEndpoint,
        {'message': message},
        token,
      );

      if (response.statusCode == 201) {
        // Message sent successfully
        return;
      } else if (response.statusCode == 401) {
        throw Exception('Authentication failed. Please login again.');
      } else {
        final errorData = json.decode(response.body);
        throw Exception(errorData['error'] ?? errorData['message'] ?? 'Failed to send message');
      }
    } catch (e) {
      throw Exception('Error sending message: $e');
    }
  }

  Future<List<Map<String, dynamic>>> getMessages({int limit = 50}) async {
    try {
      // Get JWT token from SharedPreferences
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('jwtToken');
      
      if (token == null) {
        throw Exception('Not authenticated. Please login.');
      }

      final endpoint = '${ApiConfig.chatMessagesEndpoint}?limit=$limit';
      final response = await _apiService.getWithAuth(endpoint, token);

      if (response.statusCode == 200) {
        final List<dynamic> jsonList = json.decode(response.body);
        return jsonList.map((json) => json as Map<String, dynamic>).toList();
      } else if (response.statusCode == 401) {
        throw Exception('Authentication failed. Please login again.');
      } else {
        throw Exception('Failed to load messages');
      }
    } catch (e) {
      throw Exception('Error fetching messages: $e');
    }
  }
}

