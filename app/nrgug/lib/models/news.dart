class News {
  final int id;
  final String? image;
  final String title;
  final String story;
  final String author;
  final String category;
  final DateTime timestamp;

  News({
    required this.id,
    this.image,
    required this.title,
    required this.story,
    required this.author,
    required this.category,
    required this.timestamp,
  });

  factory News.fromJson(Map<String, dynamic> json) {
    return News(
      id: json['id'] as int,
      image: json['image'] as String?,
      title: json['title'] as String,
      story: json['story'] as String,
      author: json['author'] as String,
      category: json['category'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'image': image,
      'title': title,
      'story': story,
      'author': author,
      'category': category,
      'timestamp': timestamp.toIso8601String(),
    };
  }
}

