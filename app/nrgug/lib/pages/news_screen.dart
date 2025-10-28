import 'package:flutter/material.dart';

class NewsScreen extends StatelessWidget {
  const NewsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          floating: false,
          pinned: true,
          backgroundColor: Colors.grey[900],
          title: const Text('Latest News'),
          centerTitle: true,
        ),
        SliverPadding(
          padding: const EdgeInsets.all(16.0),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              _buildNewsCard(
                'NRG UG Radio Launches New Show',
                'The popular radio station introduces "Night Vibes" featuring local DJs and international artists.',
                '2 hours ago',
                Icons.radio,
              ),
              const SizedBox(height: 16),
              _buildNewsCard(
                'Music Festival 2024 Announcement',
                'NRG UG partners with major music festivals to bring you exclusive coverage and live performances.',
                '5 hours ago',
                Icons.festival,
              ),
              const SizedBox(height: 16),
              _buildNewsCard(
                'New Artist Spotlight: DJ Killa',
                'Rising star DJ Killa talks about his journey and upcoming album release.',
                '1 day ago',
                Icons.person,
              ),
              const SizedBox(height: 16),
              _buildNewsCard(
                'Radio Station Wins Award',
                'NRG UG Radio receives "Best Urban Radio Station" award for 2024.',
                '2 days ago',
                Icons.emoji_events,
              ),
              const SizedBox(height: 16),
              _buildNewsCard(
                'Community Event This Weekend',
                'Join us for a free outdoor concert featuring local talent and food vendors.',
                '3 days ago',
                Icons.event,
              ),
              const SizedBox(height: 16),
              _buildNewsCard(
                'Technology Upgrade Complete',
                'New streaming technology provides better audio quality and faster loading times.',
                '1 week ago',
                Icons.upgrade,
              ),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _buildNewsCard(String title, String content, String time, IconData icon) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.grey[850],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[800]!, width: 1),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.red.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(icon, color: Colors.red, size: 20),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    title,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Text(
                  time,
                  style: TextStyle(
                    color: Colors.grey[400],
                    fontSize: 12,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              content,
              style: TextStyle(
                color: Colors.grey[300],
                fontSize: 14,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                TextButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.share, size: 16, color: Colors.red),
                  label: const Text('Share', style: TextStyle(color: Colors.red)),
                ),
                const SizedBox(width: 16),
                TextButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.bookmark_border, size: 16, color: Colors.grey),
                  label: const Text('Save', style: TextStyle(color: Colors.grey)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
