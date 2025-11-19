import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/show.dart';
import '../services/show_service.dart';
import '../services/chat_service.dart';
import '../utils/show_helper.dart';
import '../widgets/cached_image_with_shimmer.dart';

class ScheduleScreen extends StatefulWidget {
  const ScheduleScreen({super.key});

  @override
  State<ScheduleScreen> createState() => _ScheduleScreenState();
}

class _ScheduleScreenState extends State<ScheduleScreen> {
  final ShowService _showService = ShowService();
  final ChatService _chatService = ChatService();
  List<Show> _shows = [];
  bool _isLoading = true;
  String? _errorMessage;
  String? _selectedDay; // Selected day filter
  final List<String> _days = [
    'All Days',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  @override
  void initState() {
    super.initState();
    _selectedDay = 'All Days';
    _loadShows();
  }

  Future<void> _loadShows() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final shows = await _showService.getShows();
      setState(() {
        _shows = shows;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = e.toString().replaceAll('Exception: ', '');
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
                onPressed: _loadShows,
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

    return Scaffold(
      backgroundColor: Colors.black,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            floating: false,
            pinned: true,
            backgroundColor: Colors.grey[900],
            title: const Text('Schedule'),
            centerTitle: true,
          ),
          SliverPadding(
            padding: const EdgeInsets.all(16.0),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                // Day Filter
                const Text(
                  'Filter by Day',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 8),
                SizedBox(
                  height: 40,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: _days.length,
                    itemBuilder: (context, index) {
                      final day = _days[index];
                      final isSelected = _selectedDay == day;
                      return Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: FilterChip(
                          label: Text(day),
                          selected: isSelected,
                          onSelected: (selected) {
                            setState(() {
                              _selectedDay = day;
                            });
                          },
                          selectedColor: Colors.red,
                          labelStyle: TextStyle(
                            color: isSelected ? Colors.white : Colors.grey[300],
                            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                          ),
                          backgroundColor: Colors.grey[800],
                          checkmarkColor: Colors.white,
                        ),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 24),
                const Text(
                  'Live Shows',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 12),
                if (_shows.isEmpty)
                  const Center(
                    child: Padding(
                      padding: EdgeInsets.all(32.0),
                      child: Text(
                        'No shows available',
                        style: TextStyle(color: Colors.grey),
                      ),
                    ),
                  )
                else
                  ..._getFilteredShows().map((show) => Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: _buildLiveShowCard(show),
                      )),
              ]),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showChatDialog(context),
        backgroundColor: Colors.red,
        icon: const Icon(Icons.chat_bubble_outline_rounded, color: Colors.white, size: 24),
        label: const Text(
          'Message Studio',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 15,
            letterSpacing: 0.5,
          ),
        ),
        elevation: 8,
        tooltip: 'Tap to message the studio',
      ),
    );
  }

  List<Show> _getFilteredShows() {
    if (_selectedDay == null || _selectedDay == 'All Days') {
      return _shows;
    }
    
    // Filter shows by selected day
    return _shows.where((show) {
      return show.dayOfWeek.toLowerCase() == _selectedDay!.toLowerCase();
    }).toList();
  }

  Widget _buildLiveShowCard(Show show) {
    final isLive = ShowHelper.isShowLive(show);
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isLive ? Colors.red.withOpacity(0.1) : Colors.grey[850],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isLive ? Colors.red : Colors.red.withOpacity(0.3),
          width: isLive ? 2 : 1,
        ),
      ),
      child: Row(
        children: [
          // Show Poster/Image
          Stack(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: CachedImageWithShimmer(
                  imageUrl: show.image != null && show.image!.isNotEmpty
                      ? show.image!
                      : 'https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg',
                  width: 80,
                  height: 80,
                  fit: BoxFit.cover,
                  borderRadius: BorderRadius.circular(8),
                  errorWidget: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          Colors.red[800]!,
                          Colors.red[900]!,
                        ],
                      ),
                    ),
                    child: const Icon(
                      Icons.radio,
                      color: Colors.white,
                      size: 32,
                    ),
                  ),
                ),
              ),
              // ON AIR indicator on poster
              if (isLive)
                Positioned(
                  top: 4,
                  right: 4,
                  child: Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: Colors.red,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 2),
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  show.showName,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${show.dayOfWeek} · ${show.time}',
                  style: TextStyle(
                    color: Colors.grey[400],
                    fontSize: 14,
                  ),
                ),
                if (show.presenters.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text(
                      'Hosted by ${show.presenters}',
                      style: TextStyle(
                        color: Colors.red[400],
                        fontSize: 12,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          if (isLive)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.red,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                'LIVE',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
        ],
      ),
    );
  }

  Future<void> _showChatDialog(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    final isLoggedIn = prefs.getBool('isLoggedIn') ?? false;
    final isGuest = prefs.getBool('isGuest') ?? true;

    if (!isLoggedIn || isGuest) {
      // Show login prompt for guests
      if (!mounted) return;
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: Colors.grey[900],
          title: const Text(
            'Login Required',
            style: TextStyle(color: Colors.white),
          ),
          content: const Text(
            'Please login to message the studio.',
            style: TextStyle(color: Colors.grey),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel', style: TextStyle(color: Colors.grey)),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(context);
                // Navigate to profile/login screen
                // You can implement navigation here if needed
              },
              child: const Text('Login', style: TextStyle(color: Colors.red)),
            ),
          ],
        ),
      );
      return;
    }

    final TextEditingController messageController = TextEditingController();
    bool isSending = false;

    if (!mounted) return;
    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          backgroundColor: Colors.grey[900],
          title: const Text(
            'Message Studio',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          content: SizedBox(
            width: double.maxFinite,
            child: TextField(
              controller: messageController,
              maxLines: 5,
              maxLength: 500,
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'Type your message...',
                hintStyle: TextStyle(color: Colors.grey[600]),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                  borderSide: BorderSide(color: Colors.grey[700]!),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                  borderSide: BorderSide(color: Colors.grey[700]!),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                  borderSide: const BorderSide(color: Colors.red),
                ),
                filled: true,
                fillColor: Colors.grey[800],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: isSending
                  ? null
                  : () => Navigator.pop(context),
              child: const Text(
                'Cancel',
                style: TextStyle(color: Colors.grey),
              ),
            ),
            ElevatedButton(
              onPressed: isSending
                  ? null
                  : () async {
                      if (messageController.text.trim().isEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Please enter a message'),
                            backgroundColor: Colors.red,
                          ),
                        );
                        return;
                      }

                      setDialogState(() {
                        isSending = true;
                      });

                      try {
                        await _chatService.sendMessage(messageController.text.trim());
                        if (!mounted) return;
                        Navigator.pop(context);
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Message sent successfully!'),
                            backgroundColor: Colors.green,
                          ),
                        );
                      } catch (e) {
                        setDialogState(() {
                          isSending = false;
                        });
                        if (!mounted) return;
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Failed to send message: ${e.toString()}'),
                            backgroundColor: Colors.red,
                          ),
                        );
                      }
                    },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
                disabledBackgroundColor: Colors.grey[700],
              ),
              child: isSending
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : const Text(
                      'Send',
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}

