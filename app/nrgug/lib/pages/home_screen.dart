import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:async';
import '../models/news.dart';
import '../models/video.dart';
import '../models/client.dart';
import '../models/hero_selection.dart';
import '../services/news_service.dart';
import '../services/video_service.dart';
import '../services/client_service.dart';
import '../services/hero_selection_service.dart';
import '../widgets/profile_avatar_icon.dart';
import '../widgets/youtube_player.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentNewsIndex = 0;
  late Timer _timer;
  final PageController _pageController = PageController();
  
  // API services
  final NewsService _newsService = NewsService();
  final VideoService _videoService = VideoService();
  final ClientService _clientService = ClientService();
  final HeroSelectionService _heroSelectionService = HeroSelectionService();
  
  // Data
  List<News> _news = []; // Hero stories from hero-selection API
  List<Video> _videos = [];
  List<Client> _clients = [];
  bool _isLoading = true;
  String? _errorMessage;

  final List<Map<String, dynamic>> _genres = [
    {'name': 'House', 'color': Colors.purple[700]!, 'icon': Icons.music_note},
    {'name': 'Hip-Hop', 'color': Colors.orange[700]!, 'icon': Icons.album},
    {'name': 'Afrobeats', 'color': Colors.green[700]!, 'icon': Icons.graphic_eq},
    {'name': 'Amapiano', 'color': Colors.blue[700]!, 'icon': Icons.piano},
    {'name': 'Dancehall', 'color': Colors.yellow[700]!, 'icon': Icons.radio},
  ];

  @override
  void initState() {
    super.initState();
    _loadData();
    _timer = Timer.periodic(const Duration(seconds: 5), (timer) {
      if (!_pageController.hasClients || _news.isEmpty) return;
      // Only cycle through 3 stories (or less if fewer available)
      final maxStories = _news.length > 3 ? 3 : _news.length;
      _currentNewsIndex = (_currentNewsIndex + 1) % maxStories;
      _pageController.animateToPage(
        _currentNewsIndex,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    });
  }

  Future<void> _loadData() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      // Load cached data first (fast, shows content immediately)
      List<News> cachedNewsList = [];
      List<Video> cachedVideos = [];
      List<Client> cachedClients = [];
      
      try {
        final allCachedNews = await _newsService.getNews(useCache: true);
        cachedNewsList = allCachedNews.take(3).toList();
        cachedVideos = await _videoService.getVideos(useCache: true);
        cachedClients = await _clientService.getClients(useCache: true);
        
        // Show cached data immediately
        if (cachedNewsList.isNotEmpty || cachedVideos.isNotEmpty || cachedClients.isNotEmpty) {
          setState(() {
            _news = cachedNewsList;
            _videos = cachedVideos;
            _clients = cachedClients;
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
        
        final videos = await _videoService.getVideos(useCache: false);
        final clients = await _clientService.getClients(useCache: false);

        // Use hero selection stories if available, otherwise use first 3 news
        List<News> newsList = [];
        if (heroSelection != null) {
          newsList = heroSelection.getHeroStories();
        } else {
          // Fallback: get regular news and take first 3
          final allNews = await _newsService.getNews(useCache: false);
          newsList = allNews.take(3).toList();
        }

        // Update with fresh data
        if (mounted) {
          setState(() {
            _news = newsList;
            _videos = videos;
            _clients = clients;
            _isLoading = false;
          });
        }
      } catch (e) {
        // If fresh data fetch fails, keep cached data if available
        if (cachedNewsList.isEmpty && cachedVideos.isEmpty && cachedClients.isEmpty) {
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

  Widget _buildProductCard(String url, String name, String price, String category) {
    return Container(
      width: 150,
      margin: const EdgeInsets.only(right: 12),
      decoration: BoxDecoration(
        color: Colors.grey[850],
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.3),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Stack(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Product Image
              Expanded(
                flex: 3,
                child: ClipRRect(
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                  child: Container(
                    width: double.infinity,
                    color: Colors.grey[900],
                    child: Image.network(
                      url,
                      fit: BoxFit.contain,
                      errorBuilder: (context, error, stackTrace) {
                        return Container(
                          color: Colors.grey[800],
                          child: Center(
                            child: Icon(Icons.image_not_supported, color: Colors.grey[400], size: 40),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ),
              // Product Details
              Expanded(
                flex: 2,
                child: Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Category
                      Text(
                        category,
                        style: TextStyle(
                          color: Colors.grey[400],
                          fontSize: 10,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      const SizedBox(height: 3),
                      // Product Name
                      Flexible(
                        child: Text(
                          name,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const SizedBox(height: 3),
                      // Price
                      Text(
                        price,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          // Add to Cart Button (Plus Icon)
          Positioned(
            bottom: 8,
            right: 8,
            child: Material(
              color: Colors.grey[900],
              borderRadius: BorderRadius.circular(8),
              child: InkWell(
                onTap: () {},
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: Colors.grey[900],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(
                    Icons.add,
                    color: Colors.white,
                    size: 20,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
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
  void dispose() {
    _timer.cancel();
    _pageController.dispose();
    super.dispose();
  }

  Widget _buildNewsCarouselShimmer() {
    return LayoutBuilder(
      builder: (context, constraints) {
        final screenWidth = MediaQuery.of(context).size.width;
        final isTablet = screenWidth > 600;
        final carouselHeight = isTablet ? 600.0 : 480.0;
        
        return Shimmer.fromColors(
          baseColor: Colors.grey[900]!,
          highlightColor: Colors.grey[800]!,
          child: Container(
            height: carouselHeight,
            decoration: BoxDecoration(
              color: Colors.grey[900],
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        );
      },
    );
  }

  Widget _buildSectionShimmer(String title) {
    return Shimmer.fromColors(
      baseColor: Colors.grey[900]!,
      highlightColor: Colors.grey[800]!,
      child: Container(
        height: 24,
        width: 150,
        decoration: BoxDecoration(
          color: Colors.grey[900],
          borderRadius: BorderRadius.circular(4),
        ),
      ),
    );
  }

  Widget _buildVideoListShimmer() {
    return SizedBox(
      height: 200,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: 3,
        itemBuilder: (context, index) {
          return Shimmer.fromColors(
            baseColor: Colors.grey[900]!,
            highlightColor: Colors.grey[800]!,
            child: Container(
              width: 300,
              margin: const EdgeInsets.only(right: 16),
              decoration: BoxDecoration(
                color: Colors.grey[900],
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildClientListShimmer() {
    return SizedBox(
      height: 120,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: 5,
        itemBuilder: (context, index) {
          return Shimmer.fromColors(
            baseColor: Colors.grey[900]!,
            highlightColor: Colors.grey[800]!,
            child: Container(
              width: 120,
              height: 120,
              margin: const EdgeInsets.only(right: 16),
              decoration: BoxDecoration(
                color: Colors.grey[900],
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildFeaturedAdsShimmer() {
    return SizedBox(
      height: 150,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: 5,
        itemBuilder: (context, index) {
          return Shimmer.fromColors(
            baseColor: Colors.grey[900]!,
            highlightColor: Colors.grey[800]!,
            child: Container(
              width: 150,
              height: 150,
              margin: const EdgeInsets.only(right: 16),
              decoration: BoxDecoration(
                color: Colors.grey[900],
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: Colors.black,
        body: CustomScrollView(
          slivers: [
            SliverAppBar(
              floating: false,
              pinned: true,
              backgroundColor: Colors.black,
              title: const Text('Home'),
              centerTitle: true,
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
                  // News Carousel Shimmer
                  _buildNewsCarouselShimmer(),
                  const SizedBox(height: 16),
                  // Videos Section Shimmer
                  _buildSectionShimmer('Latest Videos'),
                  const SizedBox(height: 12),
                  _buildVideoListShimmer(),
                  const SizedBox(height: 24),
                  // Featured Ads Section Shimmer
                  _buildSectionShimmer('Featured Ads'),
                  const SizedBox(height: 12),
                  _buildFeaturedAdsShimmer(),
                  const SizedBox(height: 24),
                  // Clients Section Shimmer
                  _buildSectionShimmer('Our Partners'),
                  const SizedBox(height: 12),
                  _buildClientListShimmer(),
                ]),
              ),
            ),
          ],
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
                onPressed: _loadData,
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

    return CustomScrollView(
      slivers: [
        SliverAppBar(
          floating: false,
          pinned: true,
          backgroundColor: Colors.black,
          title: const Text('Home'),
          centerTitle: true,
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
          // News Carousel Section - Responsive height and width
          LayoutBuilder(
            builder: (context, constraints) {
              final screenWidth = MediaQuery.of(context).size.width;
              final isTablet = screenWidth > 600;
              // Responsive height: taller on tablets, standard on phones
              final carouselHeight = isTablet ? 600.0 : 480.0;
              // On tablets, make it 3/4 width and center it
              final carouselWidth = isTablet ? screenWidth * 0.75 : screenWidth - 32.0;
              
              return Center(
                child: SizedBox(
                  width: carouselWidth,
                  child: _news.isEmpty
                      ? SizedBox(
                          height: carouselHeight,
                          child: Center(
                            child: Text(
                              'No news available',
                              style: TextStyle(color: Colors.grey),
                            ),
                          ),
                        )
                      : SizedBox(
                          height: carouselHeight,
                          child: PageView.builder(
                            controller: _pageController,
                            onPageChanged: (index) {
                              setState(() {
                                _currentNewsIndex = index;
                              });
                            },
                            itemCount: _news.length > 3 ? 3 : _news.length,
                            itemBuilder: (context, index) {
                              return _buildNewsCard(_news[index], isTablet: isTablet);
                            },
                          ),
                        ),
                ),
              );
            },
          ),
          const SizedBox(height: 16),
          // Indicator dots - Only 3
          _news.isEmpty
              ? const SizedBox.shrink()
              : Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(
                    _news.length > 3 ? 3 : _news.length,
                    (index) => GestureDetector(
                onTap: () {
                  _pageController.animateToPage(
                    index,
                    duration: const Duration(milliseconds: 300),
                    curve: Curves.easeInOut,
                  );
                },
                child: Container(
                  width: _currentNewsIndex == index ? 8 : 6,
                  height: 6,
                  margin: const EdgeInsets.symmetric(horizontal: 3),
                  decoration: BoxDecoration(
                    color: _currentNewsIndex == index 
                        ? Colors.white 
                        : Colors.grey[600],
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),
          // Featured Ads Section - Show Clients
          Text(
            'Featured Ads',
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 12),
          _clients.isEmpty
              ? Container(
                  height: 150,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.blue[900]!, Colors.blue[700]!],
                    ),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.ads_click, size: 50, color: Colors.white),
                        const SizedBox(height: 8),
                        const Text(
                          'No clients available',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                )
              : SizedBox(
                  height: 150,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: _clients.length,
                    itemBuilder: (context, index) {
                      return _buildFeaturedAdCard(_clients[index]);
                    },
                  ),
                ),
          const SizedBox(height: 24),
          // Discs of Mixes Section - Circular Discs
          Text(
            'Mixes & Sets',
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            height: 140,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _genres.length,
              itemBuilder: (context, index) {
                final genre = _genres[index];
                return Container(
                  width: 105,
                  margin: const EdgeInsets.only(right: 16),
                  child: Column(
                    children: [
                      Container(
                        width: 105,
                        height: 105,
                        decoration: BoxDecoration(
                          color: genre['color'],
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: genre['color'].withOpacity(0.4),
                              blurRadius: 12,
                              spreadRadius: 1.5,
                            ),
                          ],
                        ),
                        child: Center(
                          child: Icon(
                            genre['icon'], 
                            size: 42, 
                            color: Colors.white,
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        genre['name'],
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 24),
          // YouTube Videos Section - Wider
          Text(
            'Popular Videos',
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 12),
          _videos.isEmpty
              ? const SizedBox(
                  height: 240,
                  child: Center(
                    child: Text(
                      'No videos available',
                      style: TextStyle(color: Colors.grey),
                    ),
                  ),
                )
              : SizedBox(
                  height: 240,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: _videos.length,
                    itemBuilder: (context, index) {
                      final video = _videos[index];
                      final colors = [
                        Colors.red[800]!,
                        Colors.blue[800]!,
                        Colors.purple[800]!,
                        Colors.teal[800]!,
                        Colors.orange[800]!,
                      ];
                      final color = colors[index % colors.length];
                      return Container(
                        width: 260,
                        height: 240, // Fixed height to prevent overflow
                        margin: const EdgeInsets.only(right: 12),
                        decoration: BoxDecoration(
                          color: Colors.grey[850],
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            // Thumbnail with play button - make it clickable
                            InkWell(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => YouTubePlayer(
                                      videoUrl: video.videoUrl,
                                      title: video.title,
                                    ),
                                  ),
                                );
                              },
                              child: ClipRRect(
                                borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                                child: SizedBox(
                                  width: 260,
                                  height: 150,
                                  child: Stack(
                                    children: [
                                      Positioned.fill(
                                        child: Image.network(
                                          video.thumbnailUrl,
                                          fit: BoxFit.cover,
                                          loadingBuilder: (context, child, loadingProgress) {
                                            if (loadingProgress == null) return child;
                                            return Container(
                                              decoration: BoxDecoration(
                                                gradient: LinearGradient(
                                                  begin: Alignment.topLeft,
                                                  end: Alignment.bottomRight,
                                                  colors: [color.withOpacity(0.5), color.withOpacity(0.3)],
                                                ),
                                              ),
                                              child: const Center(
                                                child: CircularProgressIndicator(
                                                  color: Colors.white,
                                                  strokeWidth: 2,
                                                ),
                                              ),
                                            );
                                          },
                                          errorBuilder: (context, error, stackTrace) {
                                            return Container(
                                              decoration: BoxDecoration(
                                                gradient: LinearGradient(
                                                  begin: Alignment.topLeft,
                                                  end: Alignment.bottomRight,
                                                  colors: [color, color.withOpacity(0.7)],
                                                ),
                                              ),
                                              child: const Center(
                                                child: Icon(
                                                  Icons.video_library,
                                                  color: Colors.white54,
                                                  size: 48,
                                                ),
                                              ),
                                            );
                                          },
                                        ),
                                      ),
                                      Center(
                                        child: Container(
                                          padding: const EdgeInsets.all(8),
                                          decoration: BoxDecoration(
                                            color: Colors.black.withOpacity(0.6),
                                            shape: BoxShape.circle,
                                          ),
                                          child: const Icon(
                                            Icons.play_arrow,
                                            size: 48,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            // Video meta - Constrained section
                            Flexible(
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    CircleAvatar(
                                      radius: 12,
                                      backgroundColor: color,
                                      child: const Icon(Icons.person, color: Colors.white, size: 14),
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        mainAxisSize: MainAxisSize.min,
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        children: [
                                          Flexible(
                                            child: Text(
                                              video.title,
                                              style: const TextStyle(
                                                color: Colors.white,
                                                fontSize: 13,
                                                fontWeight: FontWeight.bold,
                                              ),
                                              maxLines: 2,
                                              overflow: TextOverflow.ellipsis,
                                            ),
                                          ),
                                          const SizedBox(height: 2),
                                          Text(
                                            'NRG UG',
                                            style: TextStyle(color: Colors.grey, fontSize: 11),
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
          const SizedBox(height: 24),
          // Merchandise Section - Horizontal Scroll
          Text(
            'Merchandise',
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            height: 220,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _buildProductCard(
                  'https://res.cloudinary.com/dodl9nols/image/upload/v1757680123/Bucket_Hat_Black-removebg-preview_j3jp4e.png',
                  'NRG UG Bucket Hat',
                  '45,000 UGX',
                  'Accessories'
                ),
                _buildProductCard(
                  'https://res.cloudinary.com/dodl9nols/image/upload/v1757680124/Water_Bottle-removebg-preview_lj73bm.png',
                  'NRG UG Water Bottle',
                  '25,000 UGX',
                  'Accessories'
                ),
                _buildProductCard(
                  'https://res.cloudinary.com/dodl9nols/image/upload/v1757680125/White-removebg-preview_bjls5g.png',
                  'NRG UG White T-Shirt',
                  '35,000 UGX',
                  'Apparel'
                ),
                _buildProductCard(
                  'https://res.cloudinary.com/dodl9nols/image/upload/v1757680124/Electric_Fan-removebg-preview_kyguy5.png',
                  'NRG UG Electric Fan',
                  '85,000 UGX',
                  'Electronics'
                ),
                _buildProductCard(
                  'https://res.cloudinary.com/dodl9nols/image/upload/v1757680124/Power_Banks-removebg-preview_mqhneq.png',
                  'NRG UG Power Banks',
                  '65,000 UGX',
                  'Electronics'
                ),
                _buildProductCard(
                  'https://res.cloudinary.com/dodl9nols/image/upload/v1757680124/Tote_Bags-removebg-preview_tipfkl.png',
                  'NRG UG Tote Bags',
                  '30,000 UGX',
                  'Accessories'
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _buildNewsCard(News news, {bool isTablet = false}) {
    final title = news.title;
    final category = news.category;
    final timeAgo = _getTimeAgo(news.timestamp);
    final meta = 'News · $timeAgo'; // Removed category since it's shown as badge
    
    // Responsive sizing based on device type
    final horizontalPadding = isTablet ? 40.0 : 20.0;
    final bottomPadding = isTablet ? 48.0 : 32.0;
    final titleFontSize = isTablet ? 48.0 : 36.0;
    final metaFontSize = isTablet ? 18.0 : 16.0;
    final categoryFontSize = isTablet ? 14.0 : 12.0;
    final buttonFontSize = isTablet ? 17.0 : 15.0;
    final buttonPadding = isTablet 
        ? const EdgeInsets.symmetric(horizontal: 32, vertical: 14)
        : const EdgeInsets.symmetric(horizontal: 24, vertical: 12);
    final spacing = isTablet ? 20.0 : 16.0;
    
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4.0),
      child: Container(
        key: ValueKey(news.id),
        decoration: BoxDecoration(
          color: Colors.grey[850],
          borderRadius: BorderRadius.circular(12),
        ),
        clipBehavior: Clip.antiAlias,
        child: Stack(
          children: [
            // Hero Image Background
            Positioned.fill(
              child: Image.network(
                news.image != null && news.image!.isNotEmpty
                    ? news.image!
                    : 'https://picsum.photos/seed/${Uri.encodeComponent(title)}/1200/800',
                fit: BoxFit.cover,
                loadingBuilder: (context, child, loadingProgress) {
                  if (loadingProgress == null) return child;
                  return Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [Colors.grey[800]!, Colors.grey[900]!],
                      ),
                    ),
                    child: const Center(
                      child: CircularProgressIndicator(
                        color: Colors.white54,
                      ),
                    ),
                  );
                },
                errorBuilder: (context, error, stackTrace) {
                  // Suppress error logging by returning a fallback widget
                  return Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [Colors.grey[800]!, Colors.grey[900]!],
                      ),
                    ),
                    child: const Center(
                      child: Icon(Icons.article, size: 80, color: Colors.white54),
                    ),
                  );
                },
              ),
            ),
            // Gradient overlay for text readability
            Positioned.fill(
              child: DecoratedBox(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    stops: const [0.0, 0.4, 0.65, 0.85, 1.0],
                    colors: [
                      Colors.black.withOpacity(0.0),
                      Colors.black.withOpacity(0.1),
                      Colors.black.withOpacity(0.5),
                      Colors.black.withOpacity(0.9),
                      Colors.black.withOpacity(1.0),
                    ],
                  ),
                ),
              ),
            ),
            // Content Overlay
            Positioned(
              left: horizontalPadding,
              right: horizontalPadding,
              bottom: bottomPadding,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Category Badge
                  Container(
                    padding: EdgeInsets.symmetric(
                      horizontal: isTablet ? 16 : 12, 
                      vertical: isTablet ? 8 : 6
                    ),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      category,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: categoryFontSize,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ),
                  SizedBox(height: spacing),
                  // Title
                  Text(
                    title,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: titleFontSize,
                      fontWeight: FontWeight.bold,
                      height: 1.1,
                      letterSpacing: -0.5,
                      shadows: [
                        Shadow(
                          color: Colors.black.withOpacity(0.8),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    maxLines: isTablet ? 4 : 3,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: spacing * 0.75),
                  // Metadata Row
                  Row(
                    children: [
                      Text(
                        meta,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: metaFontSize,
                          fontWeight: FontWeight.w500,
                          shadows: [
                            Shadow(
                              color: Colors.black.withOpacity(0.7),
                              blurRadius: 6,
                              offset: const Offset(0, 1),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: spacing * 1.25),
                  // Action Buttons Row
                  Row(
                    children: [
                      // Read More Button
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                          foregroundColor: Colors.white,
                          padding: buttonPadding,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: Text(
                          'Read More',
                          style: TextStyle(
                            fontSize: buttonFontSize,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeaturedAdCard(Client client) {
    return Container(
      width: 150,
      height: 150,
      margin: const EdgeInsets.only(right: 16),
      decoration: BoxDecoration(
        color: Colors.grey[900],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[800]!, width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: InkWell(
        onTap: client.link != null && client.link!.isNotEmpty
            ? () async {
                final uri = Uri.parse(client.link!);
                if (await canLaunchUrl(uri)) {
                  await launchUrl(uri, mode: LaunchMode.externalApplication);
                }
              }
            : null,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Center(
            child: client.image != null && client.image!.isNotEmpty
                ? Image.network(
                    client.image!,
                    fit: BoxFit.contain,
                    loadingBuilder: (context, child, loadingProgress) {
                      if (loadingProgress == null) return child;
                      return const Center(
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white54),
                        ),
                      );
                    },
                    errorBuilder: (context, error, stackTrace) {
                      return const Icon(
                        Icons.business,
                        color: Colors.white54,
                        size: 60,
                      );
                    },
                  )
                : const Icon(
                    Icons.business,
                    color: Colors.white54,
                    size: 60,
                  ),
          ),
        ),
      ),
    );
  }
}

