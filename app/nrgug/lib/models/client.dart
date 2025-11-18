class Client {
  final int id;
  final String name;
  final String? image;
  final String? link;

  Client({
    required this.id,
    required this.name,
    this.image,
    this.link,
  });

  factory Client.fromJson(Map<String, dynamic> json) {
    return Client(
      id: json['id'] as int,
      name: json['name'] as String,
      image: json['image'] as String?,
      link: json['link'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'image': image,
      'link': link,
    };
  }
}

