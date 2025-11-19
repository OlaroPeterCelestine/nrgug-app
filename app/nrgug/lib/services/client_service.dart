import 'dart:convert';
import '../config/api_config.dart';
import '../models/client.dart';
import '../utils/cache_helper.dart';
import 'api_service.dart';

class ClientService {
  final ApiService _apiService = ApiService();
  static const String _cacheKey = 'clients_list';

  Future<List<Client>> getClients({bool useCache = true}) async {
    // Try to load from cache first
    if (useCache) {
      final cachedData = await CacheHelper.getCache(_cacheKey);
      if (cachedData != null) {
        try {
          final List<dynamic> jsonList = cachedData as List<dynamic>;
          return jsonList.map((json) => Client.fromJson(json as Map<String, dynamic>)).toList();
        } catch (e) {
          // Silently fail - will fetch from API instead
        }
      }
    }

    // Fetch from API
    try {
      final response = await _apiService.get(ApiConfig.clientsEndpoint);
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = jsonDecode(response.body);
        final clientsList = jsonList.map((json) => Client.fromJson(json as Map<String, dynamic>)).toList();
        
        // Save to cache
        await CacheHelper.saveCache(_cacheKey, jsonList);
        
        return clientsList;
      } else {
        throw Exception('Failed to load clients: ${response.statusCode}');
      }
    } catch (e) {
      // If API fails, try to return cached data
      if (useCache) {
        final cachedData = await CacheHelper.getCache(_cacheKey);
        if (cachedData != null) {
          try {
            final List<dynamic> jsonList = cachedData as List<dynamic>;
            return jsonList.map((json) => Client.fromJson(json as Map<String, dynamic>)).toList();
          } catch (_) {}
        }
      }
      throw Exception('Error fetching clients: $e');
    }
  }

  Future<Client> getClientById(int id) async {
    try {
      final response = await _apiService.get('${ApiConfig.clientsEndpoint}/$id');
      
      if (response.statusCode == 200) {
        return Client.fromJson(jsonDecode(response.body) as Map<String, dynamic>);
      } else {
        throw Exception('Failed to load client: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching client: $e');
    }
  }
}

