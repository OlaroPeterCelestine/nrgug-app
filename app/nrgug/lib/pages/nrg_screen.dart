import 'package:flutter/material.dart';
import '../widgets/profile_avatar_icon.dart';

class NRGScreen extends StatefulWidget {
  const NRGScreen({super.key});

  @override
  State<NRGScreen> createState() => _NRGScreenState();
}

class _NRGScreenState extends State<NRGScreen> {
  bool _showMixes = true; // true for mixes, false for videos
  String? _selectedCategory; // null = show all, otherwise filter by category

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          floating: false,
          pinned: true,
          backgroundColor: Colors.black,
          title: const Text('NRG Hub'),
          centerTitle: true,
          actions: [
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: const ProfileAvatarIcon(size: 36),
            ),
          ],
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(48),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
              child: Center(
                child: Container(
                  width: 200,
                  height: 32,
                  decoration: BoxDecoration(
                    color: Colors.grey[850],
                    borderRadius: BorderRadius.circular(2),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: InkWell(
                          onTap: () => setState(() => _showMixes = true),
                          borderRadius: BorderRadius.circular(2),
                          child: Container(
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: _showMixes ? Colors.red : Colors.transparent,
                              borderRadius: BorderRadius.circular(2),
                            ),
                            child: const Text(
                              'Mixes',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: InkWell(
                          onTap: () => setState(() => _showMixes = false),
                          borderRadius: BorderRadius.circular(2),
                          child: Container(
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: !_showMixes ? Colors.red : Colors.transparent,
                              borderRadius: BorderRadius.circular(2),
                            ),
                            child: const Text(
                              'Videos',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
        SliverPadding(
          padding: const EdgeInsets.all(16.0),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              if (_showMixes) ...[
                // Featured Mixes Section
                const Text(
                  'Featured Mixes',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              const SizedBox(height: 12),
              SizedBox(
                height: 126,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: 5,
                        itemBuilder: (context, index) {
                          final mixes = [
                            {'name': 'Afro Beats Mix', 'color': Colors.green[700]!, 'icon': Icons.music_note, 'category': 'Afro Beats'},
                            {'name': 'Hip-Hop Vibes', 'color': Colors.orange[700]!, 'icon': Icons.album, 'category': 'Hip-Hop'},
                            {'name': 'Amapiano Set', 'color': Colors.blue[700]!, 'icon': Icons.piano, 'category': 'Amapiano'},
                            {'name': 'Dancehall Fire', 'color': Colors.yellow[700]!, 'icon': Icons.radio, 'category': 'Dancehall'},
                            {'name': 'House Party', 'color': Colors.purple[700]!, 'icon': Icons.graphic_eq, 'category': 'House'},
                          ];
                          final mix = mixes[index];
                          final color = mix['color'] as Color;
                          final icon = mix['icon'] as IconData;
                          final name = mix['name'] as String;
                          final category = mix['category'] as String;
                          final isSelected = _selectedCategory == category;
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          _selectedCategory = isSelected ? null : category;
                        });
                      },
                      child: Container(
                        width: 95,
                        margin: const EdgeInsets.only(right: 16),
            child: Column(
              children: [
                          Container(
                            width: 95,
                            height: 95,
                            decoration: BoxDecoration(
                              color: color,
                              shape: BoxShape.circle,
                              border: isSelected ? Border.all(color: Colors.red, width: 3) : null,
                              boxShadow: [
                                BoxShadow(
                                  color: color.withOpacity(0.4),
                                  blurRadius: 10,
                                  spreadRadius: 1,
                                ),
                              ],
                            ),
                            child: Center(
                              child: Icon(
                                icon, 
                                size: 38,
                                color: Colors.white,
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                Text(
                            name,
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 24),
              // Vertical List of Mixes
              Text(
                _selectedCategory == null ? 'All Mixes' : '$_selectedCategory Mixes',
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 12),
              Builder(
                builder: (context) {
                  final allMixes = [
                    {'name': 'Afro Beats Mix', 'artist': 'DJ Killa', 'duration': '45:32', 'color': Colors.green[700]!, 'category': 'Afro Beats'},
                    {'name': 'Hip-Hop Vibes', 'artist': 'MC Fresh', 'duration': '52:15', 'color': Colors.orange[700]!, 'category': 'Hip-Hop'},
                    {'name': 'Amapiano Set', 'artist': 'Sound Master', 'duration': '38:47', 'color': Colors.blue[700]!, 'category': 'Amapiano'},
                    {'name': 'Dancehall Fire', 'artist': 'Reggae King', 'duration': '41:23', 'color': Colors.yellow[700]!, 'category': 'Dancehall'},
                    {'name': 'House Party', 'artist': 'Beat Maker', 'duration': '49:56', 'color': Colors.purple[700]!, 'category': 'House'},
                    {'name': 'Afro Beats Vol. 2', 'artist': 'DJ Afro', 'duration': '43:21', 'color': Colors.green[600]!, 'category': 'Afro Beats'},
                    {'name': 'Hip-Hop Classic', 'artist': 'OG Rapper', 'duration': '48:15', 'color': Colors.orange[600]!, 'category': 'Hip-Hop'},
                    {'name': 'Amapiano Vibes', 'artist': 'Piano Master', 'duration': '40:30', 'color': Colors.blue[600]!, 'category': 'Amapiano'},
                    {'name': 'Dancehall Massive', 'artist': 'Island Sound', 'duration': '46:45', 'color': Colors.yellow[600]!, 'category': 'Dancehall'},
                    {'name': 'House Anthems', 'artist': 'Club DJ', 'duration': '51:20', 'color': Colors.purple[600]!, 'category': 'House'},
                  ];
                  
                  // Filter mixes by selected category
                  final filteredMixes = _selectedCategory == null
                      ? allMixes
                      : allMixes.where((mix) => mix['category'] == _selectedCategory).toList();
                  
                  if (filteredMixes.isEmpty) {
                    return const Padding(
                      padding: EdgeInsets.all(32.0),
                      child: Center(
                        child: Text(
                          'No mixes found',
                          style: TextStyle(color: Colors.grey, fontSize: 14),
                        ),
                      ),
                    );
                  }
                  
                  return ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: filteredMixes.length,
                    itemBuilder: (context, index) {
                      final mix = filteredMixes[index];
                      final color = mix['color'] as Color;
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 16.0),
                    child: Row(
                      children: [
                        // Mix Disc Icon
                        Container(
                          width: 60,
                          height: 60,
                          decoration: BoxDecoration(
                            color: color,
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: color.withOpacity(0.4),
                                blurRadius: 8,
                                spreadRadius: 1,
                              ),
                            ],
                          ),
                          child: const Center(
                            child: Icon(Icons.music_note, color: Colors.white, size: 28),
                          ),
                        ),
                        const SizedBox(width: 12),
                        // Mix Info
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                mix['name'] as String,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                              const SizedBox(height: 4),
                              Text(
                                mix['artist'] as String,
                                style: TextStyle(
                                  color: Colors.grey[400],
                                  fontSize: 13,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                        // Duration
                        Text(
                          mix['duration'] as String,
                          style: TextStyle(
                            color: Colors.grey[500],
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  );
                },
                  );
                },
              ),
              ],
              if (!_showMixes) ...[
                // Popular Videos Section
                const Text(
                  'Popular Videos',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 12),
              // Vertical list of compact video rows
              Column(
                children: List.generate(6, (index) {
                  final videos = [
                    {
                      'title': "D'yani - Ambience (Official Music Video)",
                      'channel': 'Truly Dyani',
                      'duration': '3:11',
                      'color': Colors.green[800]!,
                    },
                    {
                      'title': "D'yani - Goddess | Official Music Video",
                      'channel': 'Truly Dyani',
                      'duration': '3:14',
                      'color': Colors.blueGrey[800]!,
                    },
                    {
                      'title': "D'yani- Letter (Visualizer)",
                      'channel': 'Truly Dyani',
                      'duration': '3:37',
                      'color': Colors.purple[800]!,
                    },
                    {
                      'title': "D'yani - Answer (Pookie) Visualizer",
                      'channel': 'Truly Dyani',
                      'duration': '2:51',
                      'color': Colors.teal[800]!,
                    },
                    {
                      'title': 'Charly Black, Dexta Daps - So Good (Official Video)',
                      'channel': 'Charly Black World',
                      'duration': '3:28',
                      'color': Colors.indigo[800]!,
                    },
                    {
                      'title': 'Dexta Daps - One Favor (Official Music Video) | Story Book Riddim',
                      'channel': 'Dexta Daps',
                      'duration': '2:36',
                      'color': Colors.red[800]!,
                    },
                  ];
                  final video = videos[index % videos.length];
                  final Color color = video['color'] as Color;
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Left thumbnail box with duration badge
                        ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: SizedBox(
                            width: 150,
                            height: 84,
                            child: Stack(
                              children: [
                                Positioned.fill(
                                  child: Image.network(
                                    'https://picsum.photos/seed/${Uri.encodeComponent(video['title'] as String)}/400/240',
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
                                    fit: BoxFit.cover,
                                    errorBuilder: (context, error, stackTrace) {
                                      return Container(
                                        decoration: BoxDecoration(
                                          gradient: LinearGradient(
                                            begin: Alignment.topLeft,
                                            end: Alignment.bottomRight,
                                            colors: [color, color.withOpacity(0.7)],
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                                Align(
                                  alignment: Alignment.center,
                                  child: Icon(Icons.play_circle_fill, size: 40, color: Colors.white.withOpacity(0.9)),
                                ),
                                Positioned(
                                  right: 6,
                                  bottom: 6,
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                    decoration: BoxDecoration(
                                      color: Colors.black.withOpacity(0.7),
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      video['duration'] as String,
                                      style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        // Right meta
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                video['title'] as String,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                              ),
                              const SizedBox(height: 6),
                              Text(
                                video['channel'] as String,
                                style: TextStyle(color: Colors.grey[400], fontSize: 13),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                ),
              ],
            ),
                  );
                }),
              ),
              ],
            ]),
          ),
        ),
      ],
    );
  }

}
