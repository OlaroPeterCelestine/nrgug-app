class Show {
  final int id;
  final String showName;
  final String? image;
  final String time;
  final String presenters;
  final String dayOfWeek;
  final DateTime createdAt;
  final DateTime updatedAt;

  Show({
    required this.id,
    required this.showName,
    this.image,
    required this.time,
    required this.presenters,
    required this.dayOfWeek,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Show.fromJson(Map<String, dynamic> json) {
    return Show(
      id: json['id'] as int,
      showName: json['show_name'] as String,
      image: json['image'] as String?,
      time: json['time'] as String,
      presenters: json['presenters'] as String,
      dayOfWeek: json['day_of_week'] as String,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'show_name': showName,
      'image': image,
      'time': time,
      'presenters': presenters,
      'day_of_week': dayOfWeek,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
}

