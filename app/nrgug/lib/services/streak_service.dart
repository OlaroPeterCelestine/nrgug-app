import 'package:http/http.dart' as http;
import 'dart:convert';
import '../config/api_config.dart';

class StreakService {
  // Update streak when app opens
  static Future<Map<String, dynamic>?> updateStreak(int userId) async {
    try {
      final url = Uri.parse('${ApiConfig.baseUrl}/api/streak/update');
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'user_id': userId}),
      );

      if (response.statusCode == 200) {
        return json.decode(response.body) as Map<String, dynamic>;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  // Get streak information
  static Future<Map<String, dynamic>?> getStreakInfo(int userId) async {
    try {
      final url = Uri.parse('${ApiConfig.baseUrl}/api/streak/$userId');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        return json.decode(response.body) as Map<String, dynamic>;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
}

