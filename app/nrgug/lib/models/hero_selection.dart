import 'news.dart';

class HeroSelection {
  final int id;
  final News? mainStory;
  final News? minorStory1;
  final News? minorStory2;
  final DateTime createdAt;
  final DateTime updatedAt;

  HeroSelection({
    required this.id,
    this.mainStory,
    this.minorStory1,
    this.minorStory2,
    required this.createdAt,
    required this.updatedAt,
  });

  factory HeroSelection.fromJson(Map<String, dynamic> json) {
    return HeroSelection(
      id: json['id'] as int,
      mainStory: json['main_story'] != null
          ? News.fromJson(json['main_story'] as Map<String, dynamic>)
          : null,
      minorStory1: json['minor_story_1'] != null
          ? News.fromJson(json['minor_story_1'] as Map<String, dynamic>)
          : null,
      minorStory2: json['minor_story_2'] != null
          ? News.fromJson(json['minor_story_2'] as Map<String, dynamic>)
          : null,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
    );
  }

  /// Get all 3 hero stories as a list (main story first, then minor stories)
  List<News> getHeroStories() {
    final stories = <News>[];
    if (mainStory != null) stories.add(mainStory!);
    if (minorStory1 != null) stories.add(minorStory1!);
    if (minorStory2 != null) stories.add(minorStory2!);
    return stories;
  }
}




