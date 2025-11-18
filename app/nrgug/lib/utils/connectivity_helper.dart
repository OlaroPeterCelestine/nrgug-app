class ConnectivityHelper {
  static Future<String> getErrorMessage(dynamic error) async {
    final errorString = error.toString().toLowerCase();
    
    if (errorString.contains('failed host lookup') || 
        errorString.contains('no address associated with hostname') ||
        errorString.contains('errno = 7')) {
      return 'Unable to connect to server. Please check your internet connection and try again.';
    }
    
    if (errorString.contains('timeout') || errorString.contains('timed out')) {
      return 'Request timed out. Please check your internet connection and try again.';
    }
    
    if (errorString.contains('socket') || errorString.contains('connection')) {
      return 'Network connection error. Please check your internet connection.';
    }
    
    if (errorString.contains('ssl') || errorString.contains('certificate')) {
      return 'SSL certificate error. Please check your connection.';
    }
    
    // Return the original error message if we can't categorize it
    return 'Failed to load data: ${error.toString()}';
  }
  
  static String getRetryMessage() {
    return 'Tap to retry';
  }
}
