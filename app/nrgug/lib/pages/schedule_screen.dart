import 'package:flutter/material.dart';
import '../models/show.dart';
import '../services/show_service.dart';
import '../utils/show_helper.dart';

class ScheduleScreen extends StatefulWidget {
  const ScheduleScreen({super.key});

  @override
  State<ScheduleScreen> createState() => _ScheduleScreenState();
}

class _ScheduleScreenState extends State<ScheduleScreen> {
  final ShowService _showService = ShowService();
  List<Show> _shows = [];
  bool _isLoading = true;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
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

    return CustomScrollView(
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
                ..._getTodaysShows().map((show) => Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: _buildLiveShowCard(show),
                    )),
            ]),
          ),
        ),
      ],
    );
  }

  List<Show> _getTodaysShows() {
    final now = DateTime.now();
    final currentDay = _getDayName(now.weekday);
    
    // Filter shows for today
    final todayShows = _shows.where((show) {
      return show.dayOfWeek.toLowerCase() == currentDay.toLowerCase();
    }).toList();
    
    // If no shows for today, show all shows
    return todayShows.isNotEmpty ? todayShows : _shows;
  }

  String _getDayName(int weekday) {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    return days[weekday - 1];
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
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: Colors.grey[800],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Image.network(
                    show.image != null && show.image!.isNotEmpty
                        ? show.image!
                        : 'https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg', // Default radio station poster
                    width: 80,
                    height: 80,
                    fit: BoxFit.cover,
                    loadingBuilder: (context, child, loadingProgress) {
                      if (loadingProgress == null) return child;
                      return Container(
                        color: Colors.grey[800],
                        child: const Center(
                          child: CircularProgressIndicator(
                            color: Colors.white54,
                            strokeWidth: 2,
                          ),
                        ),
                      );
                    },
                    errorBuilder: (context, error, stackTrace) {
                      // Fallback to default poster if image fails to load
                      return Image.network(
                        'https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg',
                        width: 80,
                        height: 80,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          // Final fallback - gradient background with radio icon
                          return Container(
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
                          );
                        },
                      );
                    },
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
}

