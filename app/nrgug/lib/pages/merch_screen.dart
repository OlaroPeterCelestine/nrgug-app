import 'package:flutter/material.dart';
import '../widgets/profile_avatar_icon.dart';

class MerchScreen extends StatelessWidget {
  const MerchScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final items = [
      {
        'name': 'NRG UG Bucket Hat',
        'price': '45,000 UGX',
        'image': 'https://res.cloudinary.com/dodl9nols/image/upload/v1757680123/Bucket_Hat_Black-removebg-preview_j3jp4e.png',
        'category': 'Accessories'
      },
      {
        'name': 'NRG UG Water Bottle',
        'price': '25,000 UGX',
        'image': 'https://res.cloudinary.com/dodl9nols/image/upload/v1757680124/Water_Bottle-removebg-preview_lj73bm.png',
        'category': 'Accessories'
      },
      {
        'name': 'NRG UG White T-Shirt',
        'price': '35,000 UGX',
        'image': 'https://res.cloudinary.com/dodl9nols/image/upload/v1757680125/White-removebg-preview_bjls5g.png',
        'category': 'Apparel'
      },
      {
        'name': 'NRG UG Electric Fan',
        'price': '85,000 UGX',
        'image': 'https://res.cloudinary.com/dodl9nols/image/upload/v1757680124/Electric_Fan-removebg-preview_kyguy5.png',
        'category': 'Electronics'
      },
      {
        'name': 'NRG UG Power Banks',
        'price': '65,000 UGX',
        'image': 'https://res.cloudinary.com/dodl9nols/image/upload/v1757680124/Power_Banks-removebg-preview_mqhneq.png',
        'category': 'Electronics'
      },
      {
        'name': 'NRG UG Tote Bags',
        'price': '30,000 UGX',
        'image': 'https://res.cloudinary.com/dodl9nols/image/upload/v1757680124/Tote_Bags-removebg-preview_tipfkl.png',
        'category': 'Accessories'
      },
    ];

    List<Map<String, Object>> filtered(String category) {
      if (category == 'All') return items;
      return items.where((e) => e['category'] == category).toList();
    }

    Widget buildGrid(List<Map<String, Object>> list) {
      return GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          // Slightly taller cards to reduce internal whitespace
          childAspectRatio: 0.70,
        ),
        itemCount: list.length,
        itemBuilder: (context, index) {
          final item = list[index];
          final imageUrl = item['image'] as String;
          final name = item['name'] as String;
          final price = item['price'] as String;
          final category = item['category'] as String;
          return Container(
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
                      flex: 6,
                      child: ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                        child: Container(
                          width: double.infinity,
                          color: Colors.grey[900],
                          child: Image.network(
                            imageUrl,
                            // Cover to use more space and avoid empty margins
                            fit: BoxFit.cover,
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
                      flex: 1,
                      child: Padding(
                        padding: const EdgeInsets.all(6.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            // Category
                            Text(
                              category,
                              style: TextStyle(
                                color: Colors.grey[400],
                                fontSize: 9,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            const SizedBox(height: 2),
                            // Product Name
                            Text(
                              name,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 2),
                            // Price
                            Text(
                              price,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 11,
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
        },
      );
    }

    return DefaultTabController(
      length: 5,
      child: NestedScrollView(
        headerSliverBuilder: (context, innerBoxIsScrolled) => [
          SliverAppBar(
            floating: true,
            pinned: true,
            backgroundColor: Colors.black,
            title: const Text('Merch'),
            centerTitle: true,
            actions: [
              Padding(
                padding: const EdgeInsets.only(right: 16.0),
                child: const ProfileAvatarIcon(size: 36),
              ),
            ],
            bottom: TabBar(
              isScrollable: true,
              indicatorColor: Colors.red,
              labelColor: Colors.red,
              unselectedLabelColor: Colors.grey[400],
              tabs: const [
                Tab(text: 'All'),
                Tab(text: 'Apparel'),
                Tab(text: 'Accessories'),
                Tab(text: 'Electronics'),
                Tab(text: 'Collectibles'),
              ],
            ),
          ),
        ],
        body: Container(
          color: Colors.black,
          child: TabBarView(
            children: [
              buildGrid(filtered('All')),
              buildGrid(filtered('Apparel')),
              buildGrid(filtered('Accessories')),
              buildGrid(filtered('Electronics')),
              buildGrid(filtered('Collectibles')),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryCard(String title, IconData icon, Color color) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey[850],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[800]!, width: 1),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: color.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: color, size: 32),
          ),
          const SizedBox(height: 12),
          Text(
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
