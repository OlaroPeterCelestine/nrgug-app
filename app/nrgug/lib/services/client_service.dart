import 'dart:convert';
import '../config/api_config.dart';
import '../models/client.dart';
import 'api_service.dart';

class ClientService {
  final ApiService _apiService = ApiService();

  Future<List<Client>> getClients() async {
    try {
      final response = await _apiService.get(ApiConfig.clientsEndpoint);
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = jsonDecode(response.body);
        return jsonList.map((json) => Client.fromJson(json as Map<String, dynamic>)).toList();
      } else {
        throw Exception('Failed to load clients: ${response.statusCode}');
      }
    } catch (e) {
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

