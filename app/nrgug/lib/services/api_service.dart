import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/api_config.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  Future<http.Response> get(String endpoint, {int retries = 2}) async {
    int attempt = 0;
    while (attempt <= retries) {
      try {
        final url = ApiConfig.getUrl(endpoint);
        print('API Request: GET $url (attempt ${attempt + 1}/${retries + 1})'); // Debug log
        
        final response = await http.get(
          Uri.parse(url),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        ).timeout(
          const Duration(seconds: 30),
          onTimeout: () {
            throw Exception('Request timeout after 30 seconds');
          },
        );
        
        print('API Response: ${response.statusCode} for $url'); // Debug log
        return response;
      } catch (e) {
        attempt++;
        print('API Error (attempt $attempt): $e'); // Debug log
        
        // If this was the last attempt, throw the error
        if (attempt > retries) {
          String errorMessage = 'Network error';
          if (e.toString().contains('Failed host lookup') || 
              e.toString().contains('No address associated with hostname')) {
            errorMessage = 'Cannot reach server. Please check your internet connection and try again.';
          } else if (e.toString().contains('timeout')) {
            errorMessage = 'Request timed out. Please check your internet connection.';
          } else {
            errorMessage = 'Network error: ${e.toString()}';
          }
          throw Exception(errorMessage);
        }
        
        // Wait before retrying (exponential backoff)
        await Future.delayed(Duration(seconds: attempt * 2));
      }
    }
    throw Exception('Unexpected error in API request');
  }

  Future<http.Response> post(String endpoint, Map<String, dynamic> body) async {
    try {
      final url = ApiConfig.getUrl(endpoint);
      final response = await http.post(
        Uri.parse(url),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonEncode(body),
      ).timeout(
        const Duration(seconds: 30),
        onTimeout: () {
          throw Exception('Request timeout after 30 seconds');
        },
      );
      return response;
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<http.Response> put(String endpoint, Map<String, dynamic> body) async {
    try {
      final url = ApiConfig.getUrl(endpoint);
      final response = await http.put(
        Uri.parse(url),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: jsonEncode(body),
      ).timeout(
        const Duration(seconds: 30),
        onTimeout: () {
          throw Exception('Request timeout after 30 seconds');
        },
      );
      return response;
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  Future<http.Response> delete(String endpoint) async {
    try {
      final url = ApiConfig.getUrl(endpoint);
      final response = await http.delete(
        Uri.parse(url),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ).timeout(
        const Duration(seconds: 30),
        onTimeout: () {
          throw Exception('Request timeout after 30 seconds');
        },
      );
      return response;
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}

