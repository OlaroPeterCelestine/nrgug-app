import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/api_config.dart';
import 'api_service.dart';

class ChatService {
  final ApiService _apiService = ApiService();

  Future<void> sendMessage(String message) async {
    // Get JWT token from SharedPreferences
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('jwtToken');
    
    if (token == null || token.isEmpty) {
      throw Exception('Not authenticated. Please login to send messages.');
    }

    try {
      final response = await _apiService.postWithAuth(
        ApiConfig.chatMessagesEndpoint,
        {'message': message},
        token,
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        // Message sent successfully
        return;
      } else if (response.statusCode == 401) {
        throw Exception('Authentication failed. Please login again.');
      } else if (response.statusCode == 400) {
        // Bad request - try to parse error message
        try {
          final errorData = json.decode(response.body);
          final errorMsg = errorData['error'] ?? errorData['message'] ?? 'Invalid request. Please check your message.';
          throw Exception(errorMsg);
        } catch (_) {
          throw Exception('Invalid request. Please check your message.');
        }
      } else if (response.statusCode == 500) {
        throw Exception('Server error. Please try again later.');
      } else {
        // Try to parse error message
        try {
          final errorData = json.decode(response.body);
          final errorMsg = errorData['error'] ?? errorData['message'] ?? 'Failed to send message';
          throw Exception(errorMsg);
        } catch (_) {
          throw Exception('Failed to send message. Status: ${response.statusCode}');
        }
      }
    } catch (e) {
      // If it's already an Exception with a message, rethrow it
      if (e is Exception) {
        rethrow;
      }
      // Otherwise wrap it
      throw Exception('Error sending message: ${e.toString()}');
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

