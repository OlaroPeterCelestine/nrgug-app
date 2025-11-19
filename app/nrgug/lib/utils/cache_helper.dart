import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class CacheHelper {
  static const String _cachePrefix = 'cache_';
  static const String _cacheTimestampPrefix = 'cache_timestamp_';
  static const Duration _cacheExpiry = Duration(hours: 24); // Cache for 24 hours

  // Save data to cache
  static Future<void> saveCache(String key, dynamic data) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = jsonEncode(data);
      await prefs.setString('$_cachePrefix$key', jsonString);
      await prefs.setInt('$_cacheTimestampPrefix$key', DateTime.now().millisecondsSinceEpoch);
    } catch (e) {
      // Silently fail - cache errors are non-critical
    }
  }

  // Get data from cache
  static Future<dynamic> getCache(String key) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = prefs.getString('$_cachePrefix$key');
      final timestamp = prefs.getInt('$_cacheTimestampPrefix$key');
      
      if (jsonString == null || timestamp == null) {
        return null;
      }

      // Check if cache is expired
      final cacheTime = DateTime.fromMillisecondsSinceEpoch(timestamp);
      final now = DateTime.now();
      if (now.difference(cacheTime) > _cacheExpiry) {
        // Cache expired, remove it
        await prefs.remove('$_cachePrefix$key');
        await prefs.remove('$_cacheTimestampPrefix$key');
        return null;
      }

      return jsonDecode(jsonString);
    } catch (e) {
      // Silently fail - will fetch from API instead
      return null;
    }
  }

  // Check if cache exists and is valid
  static Future<bool> hasValidCache(String key) async {
    final data = await getCache(key);
    return data != null;
  }

  // Clear specific cache
  static Future<void> clearCache(String key) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('$_cachePrefix$key');
      await prefs.remove('$_cacheTimestampPrefix$key');
    } catch (e) {
      // Silently fail - cache clearing errors are non-critical
    }
  }

  // Clear all cache
  static Future<void> clearAllCache() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final keys = prefs.getKeys();
      for (final key in keys) {
        if (key.startsWith(_cachePrefix) || key.startsWith(_cacheTimestampPrefix)) {
          await prefs.remove(key);
        }
      }
    } catch (e) {
      // Silently fail - cache clearing errors are non-critical
    }
  }
}

