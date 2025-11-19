import 'package:flutter/material.dart';
import '../models/news.dart';
import '../models/hero_selection.dart';
import '../services/news_service.dart';
import '../services/hero_selection_service.dart';
import '../widgets/profile_avatar_icon.dart';
import '../widgets/cached_image_with_shimmer.dart';

class NewsScreen extends StatefulWidget {
  const NewsScreen({super.key});

  @override
  State<NewsScreen> createState() => _NewsScreenState();
}

class _NewsScreenState extends State<NewsScreen> {
  final NewsService _newsService = NewsService();
  final HeroSelectionService _heroSelectionService = HeroSelectionService();
  List<News> _heroNews = []; // Hero stories from hero-selection API
  List<News> _allNews = []; // All news stories
  bool _isLoading = true;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _loadNews();
  }

  Future<void> _loadNews() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      // Load cached data first (fast, shows content immediately)
      List<News> cachedHeroNews = [];
      List<News> cachedAllNews = [];
      
      try {
        final cachedHeroSelection = await _heroSelectionService.getHeroSelection(useCache: true);
        final cachedNews = await _newsService.getNews(useCache: true);
        
        if (cachedHeroSelection != null) {
          cachedHeroNews = cachedHeroSelection.getHeroStories();
          final heroIds = cachedHeroNews.map((n) => n.id).toSet();
          cachedAllNews = cachedNews.where((n) => !heroIds.contains(n.id)).toList();
        } else {
          cachedHeroNews = cachedNews.take(3).toList();
          cachedAllNews = cachedNews.skip(3).toList();
        }
        
        // Show cached data immediately
        if (cachedHeroNews.isNotEmpty || cachedAllNews.isNotEmpty) {
          setState(() {
            _heroNews = cachedHeroNews;
            _allNews = cachedAllNews;
            _isLoading = false; // Show content, but will refresh in background
          });
        }
      } catch (e) {
        // Silently fail - will fetch from API instead
      }

      // Fetch fresh data from API in background
      try {
        // Fetch hero selection (3 main stories) and fallback to regular news
        HeroSelection? heroSelection;
        try {
          heroSelection = await _heroSelectionService.getHeroSelection(useCache: false);
        } catch (e) {
          // Silently fail - will use regular news instead
        }
        
        // Fetch all news
        final allNews = await _newsService.getNews(useCache: false);
        
        // Use hero selection stories if available, otherwise use first 3 news
        List<News> heroNewsList = [];
        if (heroSelection != null) {
          heroNewsList = heroSelection.getHeroStories();
          // Get hero story IDs to exclude from all news
          final heroIds = heroNewsList.map((n) => n.id).toSet();
          // Filter out hero stories from all news
          final otherNews = allNews.where((n) => !heroIds.contains(n.id)).toList();
          
          if (mounted) {
            setState(() {
              _heroNews = heroNewsList;
              _allNews = otherNews;
              _isLoading = false;
            });
          }
        } else {
          // Fallback: use first 3 as hero, rest as all news
          if (mounted) {
            setState(() {
              _heroNews = allNews.take(3).toList();
              _allNews = allNews.skip(3).toList();
              _isLoading = false;
            });
          }
        }
      } catch (e) {
        // If fresh data fetch fails, keep cached data if available
        if (cachedHeroNews.isEmpty && cachedAllNews.isEmpty) {
          if (mounted) {
            setState(() {
              _errorMessage = e.toString().replaceAll('Exception: ', '');
              _isLoading = false;
            });
          }
        } else {
          // We have cached data, so silently use it
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMessage = e.toString().replaceAll('Exception: ', '');
          _isLoading = false;
        });
      }
    }
  }

  String _getTimeAgo(DateTime dateTime) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);

    if (difference.inDays > 365) {
      return '${(difference.inDays / 365).floor()} year${(difference.inDays / 365).floor() > 1 ? 's' : ''} ago';
    } else if (difference.inDays > 30) {
      return '${(difference.inDays / 30).floor()} month${(difference.inDays / 30).floor() > 1 ? 's' : ''} ago';
    } else if (difference.inDays > 0) {
      return '${difference.inDays} day${difference.inDays > 1 ? 's' : ''} ago';
    } else if (difference.inHours > 0) {
      return '${difference.inHours} hour${difference.inHours > 1 ? 's' : ''} ago';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes} minute${difference.inMinutes > 1 ? 's' : ''} ago';
    } else {
      return 'Just now';
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        backgroundColor: Colors.black,
        body: Center(
          child: CircularProgressIndicator(color: Colors.red),
        ),
      );
    }

    if (_errorMessage != null) {
      return Scaffold(
        backgroundColor: Colors.black,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                _errorMessage!,
                style: const TextStyle(color: Colors.white),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _loadNews,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                ),
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }

    if (_heroNews.isEmpty && _allNews.isEmpty) {
      return Scaffold(
        backgroundColor: Colors.black,
        body: const Center(
          child: Text(
            'No news available',
            style: TextStyle(color: Colors.grey),
          ),
        ),
      );
    }

    return CustomScrollView(
      slivers: [
        SliverAppBar(
          floating: false,
          pinned: true,
          backgroundColor: Colors.black,
          title: const Text('Top Stories', style: TextStyle(color: Colors.red)),
          actions: [
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: const ProfileAvatarIcon(size: 36),
            ),
          ],
        ),
        SliverPadding(
          padding: const EdgeInsets.all(16.0),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              // Hero Stories Section
              if (_heroNews.isNotEmpty) ...[
                // Main featured story (large) - first hero news item
                _buildFeaturedStory(_heroNews[0]),
                const SizedBox(height: 16),
                // Smaller hero stories - show remaining 2 (total 3 hero stories)
                ...(_heroNews.length > 1
                    ? _heroNews.sublist(1, _heroNews.length > 3 ? 3 : _heroNews.length).asMap().entries.map((entry) {
                        final index = entry.key;
                        final newsItem = entry.value;
                        return Column(
                          children: [
                            if (index > 0) const Divider(color: Colors.grey, height: 1),
                            _buildSmallStory(newsItem),
                          ],
                        );
                      }).toList()
                    : []),
                // Divider between hero stories and all news
                if (_allNews.isNotEmpty) ...[
                  const SizedBox(height: 24),
                  const Divider(color: Colors.grey, height: 1),
                  const SizedBox(height: 24),
                  const Text(
                    'All Stories',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 16),
                ],
              ],
              // All Other Stories Section
              ..._allNews.asMap().entries.map((entry) {
                final index = entry.key;
                final newsItem = entry.value;
                return Column(
                  children: [
                    if (index > 0) const Divider(color: Colors.grey, height: 1),
                    _buildSmallStory(newsItem),
                  ],
                );
              }).toList(),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _buildFeaturedStory(News news) {
    final title = news.title;
    final content = news.story;
    final category = news.category;
    final time = _getTimeAgo(news.timestamp);
    final imageColors = [
      Colors.red[700]!,
      Colors.blue[700]!,
      Colors.green[700]!,
      Colors.orange[700]!,
      Colors.purple[700]!,
      Colors.teal[700]!,
    ];
    final imageIndex = title.hashCode.abs() % imageColors.length;
    final imageColor = imageColors[imageIndex];

    // Hero-style: image covers whole card with overlaid text
    return Container(
      height: 528, // Increased height
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        children: [
          // Background image filling entire card
          Positioned.fill(
            child: CachedImageWithShimmer(
              imageUrl: news.image != null && news.image!.isNotEmpty
                  ? news.image!
                  : 'https://picsum.photos/seed/${Uri.encodeComponent(title)}/1200/800',
              fit: BoxFit.cover,
              errorColor: imageColor,
            ),
          ),
          // Gradient overlay for readability
          Positioned.fill(
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  stops: const [0.0, 0.4, 0.7, 1.0],
                  colors: [
                    Colors.black.withOpacity(0.0),
                    Colors.black.withOpacity(0.2),
                    Colors.black.withOpacity(0.6),
                    Colors.black.withOpacity(0.85),
                  ],
                ),
              ),
            ),
          ),
          // Content overlay - Left aligned
          Positioned(
            left: 16,
            right: 16,
            bottom: 40,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Category Badge - Left aligned
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.7),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    category,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.5,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                // Title - Large, uppercase, left aligned
                Text(
                  title.toUpperCase(),
                  textAlign: TextAlign.left,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 42,
                    fontWeight: FontWeight.bold,
                    height: 1.1,
                    letterSpacing: 1,
                    shadows: [
                      Shadow(
                        color: Colors.black.withOpacity(0.9),
                        blurRadius: 10,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 16),
                // Metadata Row - Left aligned
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text(
                      'News · Stories · $time',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        shadows: [
                          Shadow(
                            color: Colors.black.withOpacity(0.8),
                            blurRadius: 8,
                            offset: const Offset(0, 1),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.6),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: const Text(
                        'ALL',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                // Action Button - Left aligned, no plus button
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: Colors.black,
                    padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    elevation: 0,
                  ),
                  child: const Text(
                    'Read More',
                    style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Pagination dots at bottom
          Positioned(
            left: 0,
            right: 0,
            bottom: 12,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: Colors.grey[600]!,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 6),
                Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: Colors.grey[600]!,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 6),
                Container(
                  width: 20,
                  height: 8,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
                const SizedBox(width: 6),
                Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: Colors.grey[600]!,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 6),
                Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: Colors.grey[600]!,
                    shape: BoxShape.circle,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSmallStory(News news) {
    final title = news.title;
    final content = news.story;
    final category = news.category;
    final time = _getTimeAgo(news.timestamp);
    
    final imageColors = [
      Colors.red[700]!,
      Colors.blue[700]!,
      Colors.green[700]!,
      Colors.orange[700]!,
      Colors.purple[700]!,
      Colors.teal[700]!,
    ];
    final imageIndex = title.hashCode.abs() % imageColors.length;
    final imageColor = imageColors[imageIndex];
    
    IconData icon = Icons.article;
    switch (category.toLowerCase()) {
      case 'entertainment':
        icon = Icons.radio;
        break;
      case 'music':
        icon = Icons.music_note;
        break;
      case 'events':
        icon = Icons.event;
        break;
      case 'awards':
        icon = Icons.emoji_events;
        break;
      case 'technology':
        icon = Icons.upgrade;
        break;
      default:
        icon = Icons.article;
    }

            return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Small image on left
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: SizedBox(
              width: 80,
              height: 80,
              child: news.image != null && news.image!.isNotEmpty
                  ? CachedImageWithShimmer(
                      imageUrl: news.image!,
                      width: 80,
                      height: 80,
                      fit: BoxFit.cover,
                      borderRadius: BorderRadius.circular(6),
                      errorColor: imageColor,
                    )
                  : Container(color: imageColor),
            ),
          ),
          const SizedBox(width: 12),
          // Content on right
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 17,
                    fontWeight: FontWeight.bold,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 6),
                Text(
                  content,
                  style: TextStyle(
                    color: Colors.grey[300],
                    fontSize: 14,
                    height: 1.4,
                    fontWeight: FontWeight.w400,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    Text(
                      category,
                      style: const TextStyle(
                        color: Colors.red,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const Spacer(),
                    Text(
                      time,
                      style: TextStyle(
                        color: Colors.grey[500],
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
