import 'dart:convert';
import '../config/api_config.dart';
import '../models/hero_selection.dart';
import '../utils/cache_helper.dart';
import 'api_service.dart';

class HeroSelectionService {
  final ApiService _apiService = ApiService();
  static const String _cacheKey = 'hero_selection';

  Future<HeroSelection?> getHeroSelection({bool useCache = true}) async {
    // Try to load from cache first
    if (useCache) {
      final cachedData = await CacheHelper.getCache(_cacheKey);
      if (cachedData != null) {
        try {
          final json = cachedData as Map<String, dynamic>;
          
          // Check if all stories are null (empty selection)
          if (json['main_story'] == null && 
              json['minor_story_1'] == null && 
              json['minor_story_2'] == null) {
            return null;
          }
          
          return HeroSelection.fromJson(json);
        } catch (e) {
          // Silently fail - will fetch from API instead
        }
      }
    }

    // Fetch from API
    try {
      final response = await _apiService.get(ApiConfig.heroSelectionEndpoint);
      
      if (response.statusCode == 200) {
        final json = jsonDecode(response.body) as Map<String, dynamic>;
        
        // Check if all stories are null (empty selection)
        if (json['main_story'] == null && 
            json['minor_story_1'] == null && 
            json['minor_story_2'] == null) {
          return null;
        }
        
        final heroSelection = HeroSelection.fromJson(json);
        
        // Save to cache
        await CacheHelper.saveCache(_cacheKey, json);
        
        return heroSelection;
      } else {
        throw Exception('Failed to load hero selection: ${response.statusCode}');
      }
    } catch (e) {
      // If API fails, try to return cached data
      if (useCache) {
        final cachedData = await CacheHelper.getCache(_cacheKey);
        if (cachedData != null) {
          try {
            final json = cachedData as Map<String, dynamic>;
            if (json['main_story'] == null && 
                json['minor_story_1'] == null && 
                json['minor_story_2'] == null) {
              return null;
            }
            return HeroSelection.fromJson(json);
          } catch (_) {}
        }
      }
      throw Exception('Error fetching hero selection: $e');
    }
  }
}




