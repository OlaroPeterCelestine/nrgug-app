import 'package:flutter/material.dart';
import 'package:radio_player/radio_player.dart';
import 'dart:async';
import 'pages/home_screen.dart';
import 'pages/news_screen.dart';
import 'pages/nrg_screen.dart';
import 'pages/merch_screen.dart';
import 'pages/profile_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NRG UG',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.red,
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;
  bool _isPlaying = false;
  bool _isMusicPlayerExpanded = false;
  bool _isLoading = false;
  Timer? _loadingTimer;

  final List<Widget> _screens = [
    const HomeScreen(),
    const NewsScreen(),
    const NRGScreen(),
    const MerchScreen(),
    const ProfileScreen(),
  ];

  @override
  void initState() {
    super.initState();
    _initializeRadioPlayer();
  }

  @override
  void dispose() {
    _loadingTimer?.cancel();
    super.dispose();
  }

  Future<void> _initializeRadioPlayer() async {
    setState(() {
      _isLoading = true;
    });
    
    try {
      await RadioPlayer.setStation(
        title: 'NRG UG Radio',
        url: 'https://dc4.serverse.com/proxy/nrgugstream/stream',
        parseStreamMetadata: true,
      );
      
      // Start playing
      await RadioPlayer.play();
      
      // Loading only shows when URL is loading or network is lost
      // Set a timer to stop loading when stream is ready
      _loadingTimer = Timer(const Duration(seconds: 2), () {
        if (mounted) {
          setState(() {
            _isPlaying = true;
            _isLoading = false;
          });
        }
      });
      
    } catch (e) {
      // If initialization fails, keep showing loading indefinitely until user action
      setState(() {
        _isLoading = true;
        _isPlaying = false;
      });
    }
  }

  Future<void> _togglePlayPause() async {
    // Only show loading when starting playback, not when pausing
    if (!_isPlaying) {
      setState(() {
        _isLoading = true;
      });
    }
    
    try {
      if (_isPlaying) {
        await RadioPlayer.pause();
        setState(() {
          _isPlaying = false;
          _isLoading = false;
        });
      } else {
        await RadioPlayer.play();
        
        // Only show loading when URL is loading or network is lost
        // Give it a short time to buffer
        _loadingTimer = Timer(const Duration(seconds: 1), () {
          if (mounted) {
            setState(() {
              _isPlaying = true;
              _isLoading = false;
            });
          }
        });
      }
    } catch (e) {
      // If play fails, keep showing loading (network issue)
      setState(() {
        _isPlaying = false;
        _isLoading = true;
      });
    }
  }

  void _showExpandedPlayer() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      isDismissible: true,
      backgroundColor: Colors.transparent,
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) => DraggableScrollableSheet(
          initialChildSize: 0.85,
          minChildSize: 0.5,
          maxChildSize: 0.95,
          builder: (context, scrollController) {
            return Container(
              decoration: const BoxDecoration(
                color: Colors.grey,
                borderRadius: BorderRadius.vertical(
                  top: Radius.circular(20),
                ),
              ),
              child: MusicPlayerExpanded(
                isPlaying: _isPlaying,
                isLoading: _isLoading,
                onPlayPause: () {
                  _togglePlayPause().then((_) {
                    setModalState(() {});
                  });
                },
                onClose: () {
                  Navigator.pop(context);
                },
                scrollController: scrollController,
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildDrawer(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.grey[900],
      child: Column(
        children: [
          // Header
          DrawerHeader(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.red[900]!, Colors.red[700]!],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Row(
                  children: [
                    Container(
                      width: 60,
                      height: 60,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(Icons.music_note, color: Colors.white, size: 30),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'NRG UG Radio',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Live Radio Streaming',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          // Navigation Items
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Text(
                    'NAVIGATION',
                    style: TextStyle(
                      color: Colors.grey,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1,
                    ),
                  ),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.home_outlined,
                  activeIcon: Icons.home,
                  title: 'Home',
                  onTap: () {
                    Navigator.pop(context);
                    setState(() => _selectedIndex = 0);
                  },
                  isSelected: _selectedIndex == 0,
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.newspaper_outlined,
                  activeIcon: Icons.newspaper,
                  title: 'News',
                  onTap: () {
                    Navigator.pop(context);
                    setState(() => _selectedIndex = 1);
                  },
                  isSelected: _selectedIndex == 1,
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.bolt_outlined,
                  activeIcon: Icons.bolt,
                  title: 'NRG',
                  onTap: () {
                    Navigator.pop(context);
                    setState(() => _selectedIndex = 2);
                  },
                  isSelected: _selectedIndex == 2,
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.shopping_bag_outlined,
                  activeIcon: Icons.shopping_bag,
                  title: 'Merch',
                  onTap: () {
                    Navigator.pop(context);
                    setState(() => _selectedIndex = 3);
                  },
                  isSelected: _selectedIndex == 3,
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.person_outline,
                  activeIcon: Icons.person,
                  title: 'Profile',
                  onTap: () {
                    Navigator.pop(context);
                    setState(() => _selectedIndex = 4);
                  },
                  isSelected: _selectedIndex == 4,
                ),
                const SizedBox(height: 16),
                const Divider(color: Colors.grey, height: 1),
                const SizedBox(height: 16),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Text(
                    'MORE',
                    style: TextStyle(
                      color: Colors.grey,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1,
                    ),
                  ),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.event_outlined,
                  title: 'Events',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.live_tv_outlined,
                  title: 'Watch Live',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.radio,
                  title: 'Live Shows',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.music_note,
                  title: 'Playlists',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.favorite_outline,
                  title: 'Favorites',
                  onTap: () => Navigator.pop(context),
                ),
                const SizedBox(height: 16),
                const Divider(color: Colors.grey, height: 1),
                const SizedBox(height: 16),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Text(
                    'ACCOUNT',
                    style: TextStyle(
                      color: Colors.grey,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1,
                    ),
                  ),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.settings_outlined,
                  title: 'Settings',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.share_outlined,
                  title: 'Share App',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.star_outline,
                  title: 'Rate App',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.help_outline,
                  title: 'Help & Support',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.info_outline,
                  title: 'About',
                  onTap: () => Navigator.pop(context),
                ),
                const SizedBox(height: 16),
                const Divider(color: Colors.grey, height: 1),
                const SizedBox(height: 16),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Text(
                    'SOCIALS',
                    style: TextStyle(
                      color: Colors.grey,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1,
                    ),
                  ),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.facebook_outlined,
                  title: 'Facebook',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.alternate_email,
                  title: 'Twitter',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.camera_alt_outlined,
                  title: 'Instagram',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.video_library_outlined,
                  title: 'YouTube',
                  onTap: () => Navigator.pop(context),
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.telegram,
                  title: 'Telegram',
                  onTap: () => Navigator.pop(context),
                ),
                const SizedBox(height: 32),
                // Footer
                Container(
                  margin: const EdgeInsets.all(16),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.grey[850],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Icon(Icons.radio, color: Colors.red, size: 20),
                          const SizedBox(width: 8),
                          Text(
                            'Now Playing',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'NRG UG Radio',
                        style: TextStyle(
                          color: Colors.grey[300],
                          fontSize: 12,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Live Stream',
                        style: TextStyle(
                          color: Colors.grey[500],
                          fontSize: 10,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDrawerItem(
    BuildContext context, {
    required IconData icon,
    IconData? activeIcon,
    required String title,
    required VoidCallback onTap,
    bool isSelected = false,
  }) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: isSelected ? Colors.red.withOpacity(0.1) : Colors.transparent,
        borderRadius: BorderRadius.circular(8),
      ),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: isSelected ? Colors.red.withOpacity(0.2) : Colors.grey[800],
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(
            isSelected && activeIcon != null ? activeIcon : icon,
            color: isSelected ? Colors.red : Colors.grey[400],
            size: 20,
          ),
        ),
        title: Text(
          title,
          style: TextStyle(
            color: isSelected ? Colors.red : Colors.white,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            fontSize: 14,
          ),
        ),
        selected: isSelected,
        onTap: onTap,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: _buildDrawer(context),
      body: IndexedStack(
        index: _selectedIndex,
        children: _screens,
      ),
      bottomNavigationBar: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Music Player Mini Bar
          Container(
            height: 60,
            decoration: BoxDecoration(
              color: Colors.grey[850],
              border: Border(
                top: BorderSide(color: Colors.grey[800]!, width: 0.5),
              ),
            ),
            child: InkWell(
              onTap: _showExpandedPlayer,
              child: MusicPlayerSheet(
                isPlaying: _isPlaying,
                isLoading: _isLoading,
                onPlayPause: _togglePlayPause,
              ),
            ),
          ),
          // Bottom Navigation Bar
          Container(
            decoration: BoxDecoration(
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  blurRadius: 10,
                  offset: const Offset(0, -2),
                ),
              ],
            ),
            child: BottomNavigationBar(
              currentIndex: _selectedIndex,
              onTap: (index) {
                setState(() {
                  _selectedIndex = index;
                });
              },
              type: BottomNavigationBarType.fixed,
              backgroundColor: Colors.grey[900],
              selectedItemColor: Colors.red,
              unselectedItemColor: Colors.grey[500],
              iconSize: 24,
              elevation: 0,
              items: const [
                BottomNavigationBarItem(
                  icon: Icon(Icons.home_outlined),
                  activeIcon: Icon(Icons.home),
                  label: 'Home',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.newspaper_outlined),
                  activeIcon: Icon(Icons.newspaper),
                  label: 'News',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.bolt_outlined),
                  activeIcon: Icon(Icons.bolt),
                  label: 'NRG',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.shopping_bag_outlined),
                  activeIcon: Icon(Icons.shopping_bag),
                  label: 'Merch',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.person_outline),
                  activeIcon: Icon(Icons.person),
                  label: 'Profile',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class MusicPlayerSheet extends StatelessWidget {
  final bool isPlaying;
  final bool isLoading;
  final VoidCallback onPlayPause;

  const MusicPlayerSheet({
    super.key,
    required this.isPlaying,
    required this.isLoading,
    required this.onPlayPause,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
      child: Row(
        children: [
          // Album Art
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: Colors.red[700],
              borderRadius: BorderRadius.circular(4),
            ),
            child: const Icon(Icons.music_note, color: Colors.white, size: 20),
          ),
          const SizedBox(width: 10),
          // Song Info
          const Expanded(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'NRG UG Radio',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 2),
            Text(
                  'Live Stream',
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 12,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
          // Play/Stop Button
          GestureDetector(
            onTap: isLoading ? null : onPlayPause,
            child: Container(
              padding: const EdgeInsets.all(8),
              child: isLoading 
                ? SizedBox(
                    width: 32,
                    height: 32,
                    child: CircularProgressIndicator(
                      strokeWidth: 3,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  )
                : Icon(
                    isPlaying ? Icons.stop_circle : Icons.play_circle_filled,
                    color: Colors.white,
                    size: 32,
                  ),
            ),
          ),
        ],
      ),
    );
  }
}

class MusicPlayerExpanded extends StatefulWidget {
  final bool isPlaying;
  final bool isLoading;
  final VoidCallback onPlayPause;
  final VoidCallback onClose;
  final ScrollController? scrollController;

  const MusicPlayerExpanded({
    super.key,
    required this.isPlaying,
    required this.isLoading,
    required this.onPlayPause,
    required this.onClose,
    this.scrollController,
  });

  @override
  State<MusicPlayerExpanded> createState() => _MusicPlayerExpandedState();
}

class _MusicPlayerExpandedState extends State<MusicPlayerExpanded> {
  double _sliderValue = 0.3;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.grey[900],
      child: CustomScrollView(
        controller: widget.scrollController,
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const SizedBox(height: 12),
                  // Drag Handle
                  Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: Colors.grey[600],
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  const SizedBox(height: 12),
                  // Collapse button
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      IconButton(
                        onPressed: widget.onClose,
                        icon: const Icon(
                          Icons.keyboard_arrow_down,
                          color: Colors.white,
                          size: 32,
                        ),
                      ),
                    ],
                  ),
                  // Album Art
                  Container(
                    width: 280,
                    height: 280,
                    decoration: BoxDecoration(
                      color: Colors.red[700],
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.red.withOpacity(0.3),
                          blurRadius: 20,
                          spreadRadius: 5,
                        ),
                      ],
                    ),
                    child: const Icon(
                      Icons.music_note,
                      color: Colors.white,
                      size: 80,
                    ),
                  ),
                  const SizedBox(height: 24),
                  // Song Info
                  const Text(
                    'NRG UG Radio',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Live Stream',
                    style: TextStyle(
                      color: Colors.grey,
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 32),
                  // Controls
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: Colors.red,
                          shape: BoxShape.circle,
                        ),
                        child: IconButton(
                          onPressed: widget.isLoading ? null : widget.onPlayPause,
                          icon: widget.isLoading
                              ? SizedBox(
                                  width: 40,
                                  height: 40,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 3,
                                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                  ),
                                )
                              : Icon(
                                  widget.isPlaying
                                      ? Icons.stop_rounded
                                      : Icons.play_arrow_rounded,
                                  color: Colors.white,
                                  size: 40,
                                ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  String _formatDuration(double seconds) {
    int minutes = (seconds / 60).floor();
    int secs = (seconds % 60).floor();
    return '${minutes.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
  }
}
