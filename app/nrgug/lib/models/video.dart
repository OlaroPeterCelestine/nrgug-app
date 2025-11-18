class Video {
  final int id;
  final String title;
  final String videoUrl;
  final DateTime createdAt;

  Video({
    required this.id,
    required this.title,
    required this.videoUrl,
    required this.createdAt,
  });

  factory Video.fromJson(Map<String, dynamic> json) {
    return Video(
      id: json['id'] as int,
      title: json['title'] as String,
      videoUrl: json['video_url'] as String,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'video_url': videoUrl,
      'created_at': createdAt.toIso8601String(),
    };
  }

  /// Extract YouTube video ID from URL
  String? get youtubeVideoId {
    final url = videoUrl;
    if (url.contains('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0].split('&')[0];
    } else if (url.contains('youtube.com/watch?v=')) {
      return url.split('youtube.com/watch?v=')[1].split('&')[0];
    } else if (url.contains('youtube.com/embed/')) {
      return url.split('youtube.com/embed/')[1].split('?')[0].split('&')[0];
    }
    return null;
  }

  /// Get YouTube thumbnail URL
  String get thumbnailUrl {
    final videoId = youtubeVideoId;
    if (videoId != null && videoId.isNotEmpty) {
      return 'https://img.youtube.com/vi/$videoId/maxresdefault.jpg';
    }
    return 'https://picsum.photos/seed/$id/520/300';
  }
}

