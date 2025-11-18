import 'dart:convert';
import '../config/api_config.dart';
import '../models/hero_selection.dart';
import 'api_service.dart';

class HeroSelectionService {
  final ApiService _apiService = ApiService();

  Future<HeroSelection?> getHeroSelection() async {
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
        
        return HeroSelection.fromJson(json);
      } else {
        throw Exception('Failed to load hero selection: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching hero selection: $e');
    }
  }
}




