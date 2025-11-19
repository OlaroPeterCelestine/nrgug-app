import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/cupertino.dart';
import 'package:radio_player/radio_player.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';
import 'pages/login_screen.dart';
import 'pages/home_screen.dart';
import 'pages/news_screen.dart';
import 'pages/nrg_screen.dart';
import 'pages/merch_screen.dart';
import 'pages/schedule_screen.dart';
import 'pages/settings_screen.dart';
import 'models/show.dart';
import 'services/show_service.dart';
import 'services/streak_service.dart';
import 'utils/show_helper.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NRG Radio Uganda',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.red,
          brightness: Brightness.dark,
        ),
        scaffoldBackgroundColor: Colors.black,
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.black,
          surfaceTintColor: Colors.transparent,
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          backgroundColor: Colors.transparent,
          elevation: 0,
        ),
      ),
      home: const AuthWrapper(),
    );
  }
}

class AuthWrapper extends StatefulWidget {
  const AuthWrapper({super.key});

  @override
  State<AuthWrapper> createState() => _AuthWrapperState();
}

class _AuthWrapperState extends State<AuthWrapper> {
  bool _isLoading = true;
  bool _isLoggedIn = false;

  @override
  void initState() {
    super.initState();
    // Load login status synchronously if possible, or use cached value
    _checkLoginStatus();
  }

  Future<void> _checkLoginStatus() async {
    // Use a faster approach - check SharedPreferences without blocking
    final prefs = await SharedPreferences.getInstance();
    final isLoggedIn = prefs.getBool('isLoggedIn') ?? false;
    
    // Update state immediately without waiting
    if (mounted) {
      setState(() {
        _isLoggedIn = isLoggedIn;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        backgroundColor: Colors.black,
        body: Center(
          child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(Colors.red),
          ),
        ),
      );
    }

    // Stop radio if navigating to login screen
    if (!_isLoggedIn) {
      WidgetsBinding.instance.addPostFrameCallback((_) async {
        try {
          await RadioPlayer.pause();
        } catch (e) {
          // Ignore errors if radio is not initialized
        }
      });
    }

    return _isLoggedIn ? const MainScreen() : const LoginScreen();
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
  bool _isAudio = true; // true for audio, false for video
  Timer? _loadingTimer;
  Timer? _showUpdateTimer;
  
  // Show data
  final ShowService _showService = ShowService();
  List<Show> _shows = [];
  Show? _currentShow;
  

  final List<Widget> _screens = [
    const HomeScreen(),
    const NewsScreen(),
    const NRGScreen(),
    const MerchScreen(),
    const ScheduleScreen(),
    const SettingsScreen(),
  ];

  @override
  void initState() {
    super.initState();
    // Load shows in background (non-blocking)
    _loadShows();
    
    // Set up remote control event listeners for lock screen controls
    const remoteControlChannel = MethodChannel('com.nrgug.radio/remote_control');
    remoteControlChannel.setMethodCallHandler((call) async {
      if (!_isAudio) return; // Only handle if in audio mode
      
      switch (call.method) {
        case 'play':
          if (!_isPlaying) {
            await _togglePlayStop();
          }
          break;
        case 'pause':
          if (_isPlaying) {
            await _togglePlayStop();
          }
          break;
        case 'stop':
          if (_isPlaying) {
            await _togglePlayStop();
          }
          break;
        case 'togglePlayPause':
          await _togglePlayStop();
          break;
      }
    });
    
    // Check if it's first time opening app, and auto-play if not
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      final prefs = await SharedPreferences.getInstance();
      final isFirstTime = prefs.getBool('isFirstTime') ?? true;
      
      // Update streak for logged-in users (not guests)
      final isLoggedIn = prefs.getBool('isLoggedIn') ?? false;
      final isGuest = prefs.getBool('isGuest') ?? false;
      if (isLoggedIn && !isGuest) {
        final userId = prefs.getInt('userId');
        if (userId != null) {
          // Update streak in background (non-blocking)
          StreakService.updateStreak(userId).catchError((e) {
            // Silently fail - streak update is not critical
          });
        }
      }
      
      if (isFirstTime) {
        // Mark that user has opened the app at least once
        await prefs.setBool('isFirstTime', false);
        // Don't auto-play on first time
        _initializeRadioPlayer(autoPlay: false);
      } else {
        // Auto-play on subsequent opens
        _initializeRadioPlayer(autoPlay: true);
      }
    });
  }

  Future<void> _loadShows() async {
    try {
      final shows = await _showService.getShows();
      setState(() {
        _shows = shows;
        _currentShow = ShowHelper.getCurrentShow(shows);
      });
      
      // Update every minute to check for show changes
      _showUpdateTimer?.cancel();
      _showUpdateTimer = Timer.periodic(const Duration(minutes: 1), (timer) {
        if (mounted) {
          setState(() {
            _currentShow = ShowHelper.getCurrentShow(_shows);
          });
        } else {
          timer.cancel();
        }
      });
    } catch (e) {
      // Silently fail - shows are optional
    }
  }

  @override
  void dispose() {
    _loadingTimer?.cancel();
    _showUpdateTimer?.cancel();
    super.dispose();
  }

  Future<void> _initializeRadioPlayer({bool autoPlay = true}) async {
    // Only initialize radio player if in audio mode
    if (!_isAudio) {
      setState(() {
        _isPlaying = false;
        _isLoading = false;
      });
      return;
    }
    
    // Only show loading if auto-playing
    if (autoPlay) {
      setState(() {
        _isLoading = true;
      });
    }
    
    try {
      // Set station without waiting for metadata parsing to speed up
      // Use unawaited for non-blocking initialization
      RadioPlayer.setStation(
        title: 'NRG UG Radio',
        url: 'https://dc4.serverse.com/proxy/nrgugstream/stream',
        logoNetworkUrl: 'https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg',
        parseStreamMetadata: false, // Disable metadata parsing for faster initialization
      ).then((_) async {
        if (autoPlay) {
          // Start playing immediately
          await RadioPlayer.play();
          
          // Update state quickly without long delay
          if (mounted) {
            setState(() {
              _isPlaying = true;
              _isLoading = false;
            });
          }
          
          // Set album art asynchronously without blocking
          _setAlbumArt().catchError((e) {
            // Ignore errors in album art setting
          });
        } else {
          // Just set up the station, don't play
          if (mounted) {
            setState(() {
              _isPlaying = false;
              _isLoading = false;
            });
          }
        }
      }).catchError((e) {
        // If initialization fails, stop loading
        if (mounted) {
          setState(() {
            _isLoading = false;
            _isPlaying = false;
          });
        }
      });
      
    } catch (e) {
      // If initialization fails, stop loading
      if (mounted) {
        setState(() {
          _isLoading = false;
          _isPlaying = false;
        });
      }
    }
  }

  Future<void> _togglePlayStop() async {
    try {
      if (_isPlaying) {
        // Stop the stream completely
        await RadioPlayer.pause();
        _updatePlaybackState(false);
        setState(() {
          _isPlaying = false;
          _isLoading = false;
        });
      } else {
        // Show loading when starting playback
        setState(() {
          _isLoading = true;
        });
        
        // Reinitialize station to force rebuffering
        await RadioPlayer.setStation(
          title: 'NRG UG Radio',
          url: 'https://dc4.serverse.com/proxy/nrgugstream/stream',
          logoNetworkUrl: 'https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg',
          parseStreamMetadata: false, // Disable for faster initialization
        );
        await RadioPlayer.play();
        
        // Wait 800ms before stopping loading indicator
        await Future.delayed(const Duration(milliseconds: 800));
        
        // Stop loading after 800ms
        if (mounted) {
          setState(() {
            _isPlaying = true;
            _isLoading = false;
          });
        }
        
        _updatePlaybackState(true);
        
        // Set album art asynchronously without blocking
        _setAlbumArt().catchError((e) {
          // Ignore errors
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

  Future<void> _updatePlaybackState(bool isPlaying) async {
    try {
      const platform = MethodChannel('com.nrgug.radio/album_art');
      await platform.invokeMethod('setPlaybackState', {
        'isPlaying': isPlaying,
      });
    } catch (_) {}
  }

  Future<void> _setAlbumArt() async {
    try {
      const platform = MethodChannel('com.nrgug.radio/album_art');
      await platform.invokeMethod('setAlbumArt', {
        'title': 'NRG UG Radio',
        'artist': 'Live Stream',
        'album': 'NRG UG Radio',
        'imageUrl': 'https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg',
      });
    } catch (e) {
      // Silently fail - iOS lock screen artwork is optional
    }
  }

  void _showExpandedPlayer() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      isDismissible: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            // Read current state values on each rebuild
            // Same size on both tablets and mobile (85%)
            final screenWidth = MediaQuery.of(context).size.width;
            final isTablet = screenWidth > 600;
            // On tablets, make the bottom sheet same width as hero section (93.75% of screen width)
            // On mobile, use full width
            final bottomSheetWidth = isTablet ? screenWidth * 0.9375 : screenWidth;
            
            return DraggableScrollableSheet(
              initialChildSize: 0.85,
              minChildSize: 0.5,
              maxChildSize: 0.85,
              builder: (context, scrollController) {
                return Center(
                  child: Container(
                    width: bottomSheetWidth,
                    decoration: BoxDecoration(
                      color: Colors.grey[850],
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(20),
                      ),
                    ),
                    child: MusicPlayerExpanded(
                    isPlaying: _isPlaying,
                    isLoading: _isLoading && !_isPlaying, // Don't show loading if already playing
                    isAudio: _isAudio,
                    currentShow: _currentShow,
                    onPlayPause: () async {
                      // Update parent state first
                      await _togglePlayStop();
                      // Then update modal state to trigger rebuild with fresh values
                      setModalState(() {
                        // This will rebuild the StatefulBuilder, reading fresh _isPlaying/_isLoading values
                      });
                    },
                    onToggleAudioVideo: (bool isAudio) async {
                      // Stop current playback when switching modes
                      if (_isAudio && _isPlaying) {
                        // Switching from audio to video - stop audio
                        await RadioPlayer.pause();
                        setState(() {
                          _isPlaying = false;
                        });
                      }
                      
                      // If switching from video to audio, automatically start audio
                      final wasVideo = !_isAudio;
                      
                      setState(() {
                        _isAudio = isAudio;
                        _isPlaying = false; // Reset playing state when switching
                      });
                      setModalState(() {});
                      
                      // If switching to audio mode (from video), automatically start playing
                      if (isAudio && wasVideo) {
                        await _initializeRadioPlayer(autoPlay: true);
                        setModalState(() {});
                      } else if (isAudio) {
                        // Just initialize without auto-play for other cases
                        _initializeRadioPlayer(autoPlay: false);
                      }
                    },
                    onClose: () {
                      Navigator.pop(context);
                    },
                    scrollController: scrollController,
                    ),
                  ),
                );
              },  // closes scrollController builder
            );    // closes DraggableScrollableSheet
          },  // closes StatefulBuilder builder (now a block function)
        );  // closes StatefulBuilder
      },  // closes showModalBottomSheet builder
    );  // closes showModalBottomSheet
  }

  Widget _buildDrawer(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.black,
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
                  icon: Icons.schedule_outlined,
                  title: 'Schedule',
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ScheduleScreen()),
                    );
                  },
                ),
                _buildDrawerItem(
                  context,
                  icon: Icons.queue_music_outlined,
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
                const SizedBox(height: 16),
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
      body: IndexedStack(
        index: _selectedIndex,
        children: _screens,
      ),
      bottomNavigationBar: LayoutBuilder(
        builder: (context, constraints) {
          final screenWidth = MediaQuery.of(context).size.width;
          final isTablet = screenWidth > 600;
          // Increase height on tablets
          final playerBarHeight = isTablet ? 80.0 : 60.0;
          final navBarPadding = isTablet ? 12.0 : 8.0;
          
          return Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Music Player Mini Bar - Always visible
              Container(
                height: playerBarHeight,
                decoration: BoxDecoration(
                  color: Colors.grey[850],
                  border: Border(
                    top: BorderSide(color: Colors.grey[900]!, width: 0.5),
                  ),
                ),
                child: InkWell(
                  onTap: _showExpandedPlayer,
                  child: MusicPlayerSheet(
                    isPlaying: _isPlaying,
                    isLoading: _isLoading,
                    onPlayPause: _togglePlayStop,
                    currentShow: _currentShow,
                  ),
                ),
              ),
              // Bottom Navigation Bar
              Container(
                padding: EdgeInsets.symmetric(vertical: navBarPadding),
                decoration: BoxDecoration(
                  color: Colors.transparent,
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
                  backgroundColor: Colors.transparent,
                  selectedItemColor: Colors.red,
                  unselectedItemColor: Colors.white,
                  iconSize: isTablet ? 32 : 28,
                  elevation: 0,
                  showUnselectedLabels: true,
                  showSelectedLabels: true,
                  selectedLabelStyle: TextStyle(
                    fontSize: isTablet ? 13 : 11,
                    fontWeight: FontWeight.w600,
                  ),
                  unselectedLabelStyle: TextStyle(
                    fontSize: isTablet ? 13 : 11,
                    fontWeight: FontWeight.normal,
                  ),
                  items: [
                    BottomNavigationBarItem(
                      icon: Icon(CupertinoIcons.house, size: isTablet ? 30 : 26),
                      activeIcon: Icon(CupertinoIcons.house_fill, size: isTablet ? 32 : 28),
                      label: 'Home',
                    ),
                    BottomNavigationBarItem(
                      icon: Icon(CupertinoIcons.news, size: isTablet ? 30 : 26),
                      activeIcon: Icon(CupertinoIcons.news_solid, size: isTablet ? 32 : 28),
                      label: 'News',
                    ),
                    BottomNavigationBarItem(
                      icon: Icon(CupertinoIcons.music_note, size: isTablet ? 30 : 26),
                      activeIcon: Icon(CupertinoIcons.music_note, size: isTablet ? 32 : 28),
                      label: 'NRG',
                    ),
                    BottomNavigationBarItem(
                      icon: Icon(CupertinoIcons.bag, size: isTablet ? 30 : 26),
                      activeIcon: Icon(CupertinoIcons.bag_fill, size: isTablet ? 32 : 28),
                      label: 'Merch',
                    ),
                    BottomNavigationBarItem(
                      icon: Icon(CupertinoIcons.calendar, size: isTablet ? 30 : 26),
                      activeIcon: Icon(CupertinoIcons.calendar, size: isTablet ? 32 : 28),
                      label: 'Schedule',
                    ),
                    BottomNavigationBarItem(
                      icon: Icon(CupertinoIcons.settings, size: isTablet ? 30 : 26),
                      activeIcon: Icon(CupertinoIcons.settings_solid, size: isTablet ? 32 : 28),
                      label: 'Settings',
                    ),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

class MusicPlayerSheet extends StatelessWidget {
  final bool isPlaying;
  final bool isLoading;
  final VoidCallback onPlayPause;
  final Show? currentShow;

  const MusicPlayerSheet({
    super.key,
    required this.isPlaying,
    required this.isLoading,
    required this.onPlayPause,
    this.currentShow,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
      child: Row(
        children: [
          // Album Art - Show current show's image if available
          Stack(
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(4),
                  color: Colors.grey[800], // Fallback background
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: Image.network(
                    currentShow?.image != null && currentShow!.image!.isNotEmpty
                        ? currentShow!.image!
                        : 'https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg',
                    width: 44,
                    height: 44,
                    fit: BoxFit.cover,
                    loadingBuilder: (context, child, loadingProgress) {
                      if (loadingProgress == null) return child;
                      return Container(
                        color: Colors.grey[800],
                        child: const Center(
                          child: SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                            ),
                          ),
                        ),
                      );
                    },
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        color: Colors.red[700],
                        child: const Icon(Icons.music_note, color: Colors.white, size: 20),
                      );
                    },
                  ),
                ),
              ),
              // ON AIR indicator
              if (currentShow != null)
                Positioned(
                  top: 0,
                  right: 0,
                  child: Container(
                    width: 8,
                    height: 8,
                    decoration: BoxDecoration(
                      color: Colors.red,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 1),
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(width: 10),
          // Song Info - Show current show if available
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        currentShow?.showName ?? 'NRG UG Radio',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    if (currentShow != null)
                      Container(
                        margin: const EdgeInsets.only(left: 6),
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: Colors.red,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Text(
                          'ON AIR',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 8,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.5,
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 2),
                Text(
                  currentShow != null
                      ? '${currentShow!.dayOfWeek} · ${currentShow!.time}'
                      : 'Live Stream',
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
  final bool isAudio;
  final VoidCallback onPlayPause;
  final Function(bool) onToggleAudioVideo;
  final VoidCallback onClose;
  final ScrollController? scrollController;
  final Show? currentShow;

  const MusicPlayerExpanded({
    super.key,
    required this.isPlaying,
    required this.isLoading,
    required this.isAudio,
    required this.onPlayPause,
    required this.onToggleAudioVideo,
    required this.onClose,
    this.scrollController,
    this.currentShow,
  });

  @override
  State<MusicPlayerExpanded> createState() => _MusicPlayerExpandedState();
}

class _MusicPlayerExpandedState extends State<MusicPlayerExpanded> {
  double _sliderValue = 0.3;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.transparent,
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
                  // Audio/Video Toggle
                  Center(
                    child: Container(
                      width: 200,
                      height: 36,
                      decoration: BoxDecoration(
                        color: Colors.grey[800],
                        borderRadius: BorderRadius.circular(18),
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            child: InkWell(
                              onTap: widget.isAudio ? null : () => widget.onToggleAudioVideo(true),
                              borderRadius: BorderRadius.circular(18),
                              child: Container(
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                  color: widget.isAudio ? Colors.red : Colors.transparent,
                                  borderRadius: BorderRadius.circular(18),
                                ),
                                child: const Text(
                                  'Audio',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 14,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Expanded(
                            child: InkWell(
                              onTap: !widget.isAudio ? null : () => widget.onToggleAudioVideo(false),
                              borderRadius: BorderRadius.circular(18),
                              child: Container(
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                  color: !widget.isAudio ? Colors.red : Colors.transparent,
                                  borderRadius: BorderRadius.circular(18),
                                ),
                                child: const Text(
                                  'Video',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 14,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
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
                  // Video Player or Album Art
                  if (!widget.isAudio) ...[
                    // Video Player - responsive iframe size (wider on tablets)
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final screenWidth = MediaQuery.of(context).size.width;
                        final targetWidth = screenWidth - 32; // side margins
                        final videoWidth = targetWidth.clamp(560.0, 900.0);
                        final videoHeight = videoWidth * (9.0 / 16.0);
                        return Center(
                          child: Container(
                            width: videoWidth,
                            height: videoHeight,
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(12),
                              child: _VideoPlayerWidget(
                                onVideoStopped: () {
                                  // Automatically switch to audio when video stops
                                  widget.onToggleAudioVideo(true);
                                },
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: 24),
                    // Currently Playing Show Info
                    if (widget.currentShow != null) ...[
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.red.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.red.withOpacity(0.5), width: 1),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.radio, color: Colors.red, size: 18),
                            const SizedBox(width: 8),
                            Text(
                              'Currently Playing',
                              style: TextStyle(
                                color: Colors.red[300],
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                    ],
                    // Video Info - Show current show if available
                    Text(
                      widget.currentShow?.showName ?? 'NRG UG Radio',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      widget.currentShow != null
                          ? '${widget.currentShow!.dayOfWeek} · ${widget.currentShow!.time}${widget.currentShow!.presenters.isNotEmpty ? '\nHosted by ${widget.currentShow!.presenters}' : ''}'
                          : 'Live Video Stream',
                      style: const TextStyle(
                        color: Colors.grey,
                        fontSize: 16,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ] else ...[
                    // Album Art - Show current show's image if available (bigger poster)
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final screenWidth = MediaQuery.of(context).size.width;
                        final posterSize = screenWidth * 0.75; // 75% of screen width for bigger poster
                        final posterHeight = posterSize * 0.95; // Slightly taller than wide
                        
                        return Stack(
                          children: [
                            Container(
                              width: posterSize,
                              height: posterHeight,
                              decoration: BoxDecoration(
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.3),
                                    blurRadius: 20,
                                    spreadRadius: 5,
                                  ),
                                ],
                              ),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(12),
                                child: Image.network(
                                  widget.currentShow?.image != null && widget.currentShow!.image!.isNotEmpty
                                      ? widget.currentShow!.image!
                                      : 'https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg',
                                  width: posterSize,
                                  height: posterHeight,
                                  fit: BoxFit.cover,
                              loadingBuilder: (context, child, loadingProgress) {
                                if (loadingProgress == null) return child;
                                return Container(
                                  color: Colors.grey[800],
                                  child: const Center(
                                    child: CircularProgressIndicator(
                                      color: Colors.white54,
                                    ),
                                  ),
                                );
                              },
                                  errorBuilder: (context, error, stackTrace) {
                                    return Container(
                                      color: Colors.red[700],
                                      child: const Icon(
                                        Icons.music_note,
                                        color: Colors.white,
                                        size: 80,
                                      ),
                                    );
                                  },
                                ),
                              ),
                            ),
                            // ON AIR indicator
                            if (widget.currentShow != null)
                              Positioned(
                                top: 12,
                                right: 12,
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                  decoration: BoxDecoration(
                                    color: Colors.red,
                                    borderRadius: BorderRadius.circular(20),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withOpacity(0.3),
                                        blurRadius: 8,
                                        spreadRadius: 2,
                                      ),
                                    ],
                                  ),
                                  child: const Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Icon(
                                        Icons.radio,
                                        color: Colors.white,
                                        size: 14,
                                      ),
                                      SizedBox(width: 4),
                                      Text(
                                        'ON AIR',
                                        style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 12,
                                          fontWeight: FontWeight.bold,
                                          letterSpacing: 0.5,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                          ],
                        );
                      },
                    ),
                    const SizedBox(height: 24),
                    // Currently Playing Show Info
                    if (widget.currentShow != null) ...[
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.red.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.red.withOpacity(0.5), width: 1),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.radio, color: Colors.red, size: 18),
                            const SizedBox(width: 8),
                            Text(
                              'Currently Playing',
                              style: TextStyle(
                                color: Colors.red[300],
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                    ],
                    // Song Info - Show current show if available (bigger text)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Expanded(
                          child: Text(
                            widget.currentShow?.showName ?? 'NRG UG Radio',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 32,
                              fontWeight: FontWeight.bold,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      widget.currentShow != null
                          ? '${widget.currentShow!.dayOfWeek} · ${widget.currentShow!.time}${widget.currentShow!.presenters.isNotEmpty ? '\nHosted by ${widget.currentShow!.presenters}' : ''}'
                          : 'Live Stream',
                      style: const TextStyle(
                        color: Colors.grey,
                        fontSize: 20,
                      ),
                      textAlign: TextAlign.center,
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

class _VideoPlayerWidget extends StatefulWidget {
  final VoidCallback? onVideoStopped;
  
  const _VideoPlayerWidget({this.onVideoStopped});

  @override
  State<_VideoPlayerWidget> createState() => _VideoPlayerWidgetState();
}

class _VideoPlayerWidgetState extends State<_VideoPlayerWidget> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.black)
      ..setNavigationDelegate(
        NavigationDelegate(
          onNavigationRequest: (NavigationRequest request) {
            // Allow navigation, but detect if video page fails
            return NavigationDecision.navigate;
          },
          onHttpError: (HttpResponseError error) {
            // Video failed to load or stopped - automatically switch to audio
            if (widget.onVideoStopped != null && error.response?.statusCode != null) {
              // Only trigger if it's a real error (not a successful response)
              if (error.response!.statusCode >= 400) {
                widget.onVideoStopped!();
              }
            }
          },
          onWebResourceError: (WebResourceError error) {
            // Video resource error - switch to audio
            if (widget.onVideoStopped != null) {
              widget.onVideoStopped!();
            }
          },
          onPageFinished: (String url) {
            // Inject JavaScript to prevent fullscreen
            _controller.runJavaScript('''
              (function() {
                // Prevent fullscreen API
                if (document.documentElement.requestFullscreen) {
                  document.documentElement.requestFullscreen = function() { return Promise.reject(new Error('Fullscreen blocked')); };
                }
                if (document.documentElement.webkitRequestFullscreen) {
                  document.documentElement.webkitRequestFullscreen = function() { return Promise.reject(new Error('Fullscreen blocked')); };
                }
                if (document.documentElement.mozRequestFullScreen) {
                  document.documentElement.mozRequestFullScreen = function() { return Promise.reject(new Error('Fullscreen blocked')); };
                }
                if (document.documentElement.msRequestFullscreen) {
                  document.documentElement.msRequestFullscreen = function() { return Promise.reject(new Error('Fullscreen blocked')); };
                }
                
                // Prevent video elements from going fullscreen
                var videos = document.querySelectorAll('video');
                videos.forEach(function(video) {
                  video.addEventListener('webkitbeginfullscreen', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  });
                  video.addEventListener('beginfullscreen', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  });
                  if (video.webkitEnterFullscreen) {
                    video.webkitEnterFullscreen = function() { return false; };
                  }
                });
                
                // Prevent iframe fullscreen
                var iframes = document.querySelectorAll('iframe');
                iframes.forEach(function(iframe) {
                  if (iframe.requestFullscreen) {
                    iframe.requestFullscreen = function() { return Promise.reject(new Error('Fullscreen blocked')); };
                  }
                });
              })();
            ''');
          },
        ),
      )
      ..loadRequest(Uri.parse('https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html'));
  }


  @override
  Widget build(BuildContext context) {
    return WebViewWidget(controller: _controller);
  }
}
