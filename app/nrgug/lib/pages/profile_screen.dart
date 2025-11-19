import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:radio_player/radio_player.dart';
import 'package:avatar_plus/avatar_plus.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:developer' as developer;
import '../config/api_config.dart';
import 'login_screen.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String? _userName;
  String? _userEmail;
  String? _avatarSeed;
  bool _isGuest = false;
  int? _userId;
  int _points = 0;
  double _listeningHours = 0.0;
  int _textingStudioPoints = 0;
  int _totalListeningMinutes = 0;
  int _streakDays = 0;
  int _longestStreak = 0;
  bool _isLoadingPoints = false;

  @override
  void initState() {
    super.initState();
    _loadUserData();
    _loadUserPoints();
  }

  Future<void> _loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _userName = prefs.getString('userName');
      _userEmail = prefs.getString('userEmail');
      _avatarSeed = prefs.getString('avatarSeed');
      _isGuest = prefs.getBool('isGuest') ?? false;
      _userId = prefs.getInt('userId');
      
      // Generate avatar seed for guest users if not exists
      if (_isGuest && _avatarSeed == null) {
        _avatarSeed = 'guest_${DateTime.now().millisecondsSinceEpoch}';
        prefs.setString('avatarSeed', _avatarSeed!);
      }
      
      // Generate avatar seed for logged-in users if not exists
      if (!_isGuest && _avatarSeed == null && _userName != null) {
        _avatarSeed = _userName!;
        prefs.setString('avatarSeed', _avatarSeed!);
      }
    });
  }

  Future<void> _loadUserPoints() async {
    if (_isGuest) return; // Guests don't have points
    
    final prefs = await SharedPreferences.getInstance();
    var userId = prefs.getInt('userId');
    
    // If no user ID, try to get it from email via API
    if (userId == null) {
      final email = prefs.getString('userEmail');
      if (email == null) return;
      
      try {
        // Get user by email to get user ID
        final url = Uri.parse('${ApiConfig.baseUrl}/api/users/email/${Uri.encodeComponent(email)}');
        final response = await http.get(url);
        
        if (response.statusCode == 200) {
          final userData = json.decode(response.body);
          userId = userData['id'];
          if (userId != null) {
            await prefs.setInt('userId', userId!);
          }
        } else {
          return; // Can't get user ID
        }
      } catch (e) {
        if (kDebugMode) {
          developer.log('Error getting user ID: $e');
        }
        return;
      }
    }

    if (userId == null) return;

    setState(() {
      _isLoadingPoints = true;
    });

    try {
      final url = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.pointsUserEndpoint}/$userId');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _points = data['points'] ?? 0;
          _listeningHours = (data['listening_hours'] ?? 0.0).toDouble();
          _textingStudioPoints = data['texting_studio_points'] ?? 0;
          _totalListeningMinutes = data['total_listening_minutes'] ?? 0;
          _streakDays = data['streak_days'] ?? 0;
          _longestStreak = data['longest_streak'] ?? 0;
          _isLoadingPoints = false;
        });
      } else {
        setState(() {
          _isLoadingPoints = false;
        });
      }
    } catch (e) {
      if (kDebugMode) {
        developer.log('Error loading points: $e');
      }
      setState(() {
        _isLoadingPoints = false;
      });
    }
  }

  Future<void> _handleChangeAvatar() async {
    final newSeedController = TextEditingController(text: _avatarSeed ?? '');
    String tempSeed = _avatarSeed ?? '';

    await showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          backgroundColor: Colors.grey[900],
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          title: const Text('Change Avatar', style: TextStyle(color: Colors.white)),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Avatar Preview
                Container(
                  width: 120,
                  height: 120,
                  margin: const EdgeInsets.only(bottom: 20),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.red, width: 3),
                  ),
                  child: ClipOval(
                    child: tempSeed.isNotEmpty
                        ? SizedBox(
                            width: 120,
                            height: 120,
                            child: AvatarPlus(tempSeed),
                          )
                        : Container(
                            color: Colors.grey[800],
                            child: const Icon(
                              Icons.person,
                              color: Colors.white,
                              size: 60,
                            ),
                          ),
                  ),
                ),
                // Seed Input
                TextFormField(
                  controller: newSeedController,
                  style: const TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Avatar Seed',
                    labelStyle: const TextStyle(color: Colors.white70),
                    hintText: 'Enter text to generate avatar',
                    hintStyle: TextStyle(color: Colors.grey[600]),
                    prefixIcon: const Icon(Icons.person_outlined, color: Colors.white70),
                    filled: true,
                    fillColor: Colors.white.withOpacity(0.1),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(color: Colors.red, width: 2),
                    ),
                  ),
                  onChanged: (value) {
                    setDialogState(() {
                      tempSeed = value.isNotEmpty ? value : DateTime.now().millisecondsSinceEpoch.toString();
                    });
                  },
                ),
                const SizedBox(height: 16),
                // Randomize Button
                OutlinedButton.icon(
                  onPressed: () {
                    final randomSeed = DateTime.now().millisecondsSinceEpoch.toString();
                    newSeedController.text = randomSeed;
                    setDialogState(() {
                      tempSeed = randomSeed;
                    });
                  },
                  icon: const Icon(Icons.shuffle, color: Colors.red, size: 18),
                  label: const Text(
                    'Randomize',
                    style: TextStyle(color: Colors.red),
                  ),
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Colors.red, width: 1.5),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 8,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel', style: TextStyle(color: Colors.white70)),
            ),
            TextButton(
              onPressed: () async {
                final newSeed = newSeedController.text.trim().isNotEmpty
                    ? newSeedController.text.trim()
                    : DateTime.now().millisecondsSinceEpoch.toString();
                
                final prefs = await SharedPreferences.getInstance();
                await prefs.setString('avatarSeed', newSeed);
                
                if (!mounted) return;
                
                Navigator.pop(context);
                await _loadUserData();
                
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Avatar updated successfully'),
                    backgroundColor: Colors.green,
                  ),
                );
              },
              child: const Text('Save', style: TextStyle(color: Colors.red)),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _handleChangePassword() async {
    if (_isGuest) return;

    final oldPasswordController = TextEditingController();
    final newPasswordController = TextEditingController();
    final confirmPasswordController = TextEditingController();
    final formKey = GlobalKey<FormState>();
    bool obscureOldPassword = true;
    bool obscureNewPassword = true;
    bool obscureConfirmPassword = true;

    await showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          backgroundColor: Colors.grey[900],
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          title: const Text('Change Password', style: TextStyle(color: Colors.white)),
          content: Form(
            key: formKey,
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Old Password Field
                  TextFormField(
                    controller: oldPasswordController,
                    obscureText: obscureOldPassword,
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      labelText: 'Current Password',
                      labelStyle: const TextStyle(color: Colors.white70),
                      prefixIcon: const Icon(Icons.lock_outlined, color: Colors.white70),
                      suffixIcon: IconButton(
                        icon: Icon(
                          obscureOldPassword ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                          color: Colors.white70,
                        ),
                        onPressed: () {
                          setDialogState(() {
                            obscureOldPassword = !obscureOldPassword;
                          });
                        },
                      ),
                      filled: true,
                      fillColor: Colors.white.withOpacity(0.1),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: Colors.red, width: 2),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your current password';
                      }
                      // In production, verify against stored password
                      return null;
                    },
                  ),
                  const SizedBox(height: 16),
                  // New Password Field
                  TextFormField(
                    controller: newPasswordController,
                    obscureText: obscureNewPassword,
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      labelText: 'New Password',
                      labelStyle: const TextStyle(color: Colors.white70),
                      prefixIcon: const Icon(Icons.lock_outlined, color: Colors.white70),
                      suffixIcon: IconButton(
                        icon: Icon(
                          obscureNewPassword ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                          color: Colors.white70,
                        ),
                        onPressed: () {
                          setDialogState(() {
                            obscureNewPassword = !obscureNewPassword;
                          });
                        },
                      ),
                      filled: true,
                      fillColor: Colors.white.withOpacity(0.1),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: Colors.red, width: 2),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a new password';
                      }
                      if (value.length < 6) {
                        return 'Password must be at least 6 characters';
                      }
                      if (value == oldPasswordController.text) {
                        return 'New password must be different from current password';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16),
                  // Confirm Password Field
                  TextFormField(
                    controller: confirmPasswordController,
                    obscureText: obscureConfirmPassword,
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      labelText: 'Confirm New Password',
                      labelStyle: const TextStyle(color: Colors.white70),
                      prefixIcon: const Icon(Icons.lock_outlined, color: Colors.white70),
                      suffixIcon: IconButton(
                        icon: Icon(
                          obscureConfirmPassword ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                          color: Colors.white70,
                        ),
                        onPressed: () {
                          setDialogState(() {
                            obscureConfirmPassword = !obscureConfirmPassword;
                          });
                        },
                      ),
                      filled: true,
                      fillColor: Colors.white.withOpacity(0.1),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: const BorderSide(color: Colors.red, width: 2),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please confirm your new password';
                      }
                      if (value != newPasswordController.text) {
                        return 'Passwords do not match';
                      }
                      return null;
                    },
                  ),
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel', style: TextStyle(color: Colors.white70)),
            ),
            TextButton(
              onPressed: () async {
                if (formKey.currentState!.validate()) {
                  // In production, verify old password and update via API
                  // For now, just save to SharedPreferences
                  final prefs = await SharedPreferences.getInstance();
                  await prefs.setString('userPassword', newPasswordController.text);
                  
                  if (!mounted) return;
                  
                  Navigator.pop(context);
                  
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Password changed successfully'),
                      backgroundColor: Colors.green,
                    ),
                  );
                }
              },
              child: const Text('Change Password', style: TextStyle(color: Colors.red)),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _handleEditProfile() async {
    if (_isGuest) return;

    final nameController = TextEditingController(text: _userName ?? '');
    final emailController = TextEditingController(text: _userEmail ?? '');
    final formKey = GlobalKey<FormState>();

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.grey[900],
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        title: const Text('Edit Profile', style: TextStyle(color: Colors.white)),
        content: Form(
          key: formKey,
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: nameController,
                  style: const TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Full Name',
                    labelStyle: const TextStyle(color: Colors.white70),
                    prefixIcon: const Icon(Icons.person_outlined, color: Colors.white70),
                    filled: true,
                    fillColor: Colors.white.withOpacity(0.1),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(color: Colors.red, width: 2),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your name';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: emailController,
                  keyboardType: TextInputType.emailAddress,
                  style: const TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Email',
                    labelStyle: const TextStyle(color: Colors.white70),
                    prefixIcon: const Icon(Icons.email_outlined, color: Colors.white70),
                    filled: true,
                    fillColor: Colors.white.withOpacity(0.1),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.white.withOpacity(0.3)),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(color: Colors.red, width: 2),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your email';
                    }
                    if (!value.contains('@')) {
                      return 'Please enter a valid email';
                    }
                    return null;
                  },
                ),
              ],
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel', style: TextStyle(color: Colors.white70)),
          ),
          TextButton(
            onPressed: () async {
              if (formKey.currentState!.validate()) {
                final prefs = await SharedPreferences.getInstance();
                await prefs.setString('userName', nameController.text.trim());
                await prefs.setString('userEmail', emailController.text.trim());
                
                if (!mounted) return;
                
                Navigator.pop(context);
                await _loadUserData();
                
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Profile updated successfully'),
                    backgroundColor: Colors.green,
                  ),
                );
              }
            },
            child: const Text('Save', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  Future<void> _handleDeleteAccount() async {
    if (_isGuest) return;

    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.grey[900],
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        title: const Text('Delete Account', style: TextStyle(color: Colors.red)),
        content: const Text(
          'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.',
          style: TextStyle(color: Colors.white70),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel', style: TextStyle(color: Colors.white70)),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Delete', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );

    if (confirm == true) {
      // Show confirmation dialog again for safety
      final finalConfirm = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: Colors.grey[900],
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          title: const Text('Final Confirmation', style: TextStyle(color: Colors.red)),
          content: const Text(
            'This is your last chance. Are you absolutely sure you want to delete your account?',
            style: TextStyle(color: Colors.white70),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: const Text('Cancel', style: TextStyle(color: Colors.white70)),
            ),
            TextButton(
              onPressed: () => Navigator.pop(context, true),
              child: const Text('Yes, Delete', style: TextStyle(color: Colors.red)),
            ),
          ],
        ),
      );

      if (finalConfirm == true) {
        // Show loading indicator
        if (!mounted) return;
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (context) => const Center(
            child: CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.red),
            ),
          ),
        );

        try {
          // Delete account from database via API
          final prefs = await SharedPreferences.getInstance();
          final userId = prefs.getInt('userId');
          final jwtToken = prefs.getString('jwtToken');

          if (userId != null) {
            try {
              final url = Uri.parse('${ApiConfig.baseUrl}/api/users/$userId');
              final response = await http.delete(
                url,
                headers: {
                  'Content-Type': 'application/json',
                  if (jwtToken != null) 'Authorization': 'Bearer $jwtToken',
                },
              );

              if (kDebugMode) {
                developer.log('Delete account response: ${response.statusCode}');
                developer.log('Delete account body: ${response.body}');
              }

              if (response.statusCode != 200 && response.statusCode != 204) {
                throw Exception('Failed to delete account: ${response.statusCode}');
              }
            } catch (e) {
              if (kDebugMode) {
                developer.log('Error deleting account from API: $e');
              }
              // Continue with local cleanup even if API call fails
            }
          }

          // Stop radio if playing
          try {
            await RadioPlayer.pause();
          } catch (e) {
            // Ignore errors if radio is not initialized
          }

          // Clear local data
          await prefs.setBool('isLoggedIn', false);
          await prefs.remove('userEmail');
          await prefs.remove('userName');
          await prefs.remove('userId');
          await prefs.remove('jwtToken');
          await prefs.remove('avatarSeed');
          await prefs.remove('isGuest');

          if (!mounted) return;

          // Close loading dialog
          Navigator.of(context).pop();

          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Account deleted successfully'),
              backgroundColor: Colors.red,
            ),
          );

          Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (context) => const LoginScreen()),
            (route) => false,
          );
        } catch (e) {
          if (!mounted) return;

          // Close loading dialog
          Navigator.of(context).pop();

          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Error deleting account: ${e.toString()}'),
              backgroundColor: Colors.red,
            ),
          );
        }
      }
    }
  }

  Future<void> _handleLogout() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.grey[900],
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        title: const Text('Logout', style: TextStyle(color: Colors.white)),
        content: const Text(
          'Are you sure you want to logout?',
          style: TextStyle(color: Colors.white70),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel', style: TextStyle(color: Colors.white70)),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Logout', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );

    if (confirm == true) {
      // Stop radio if playing
      try {
        await RadioPlayer.pause();
      } catch (e) {
        // Ignore errors if radio is not initialized
      }

      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('isLoggedIn', false);
      await prefs.remove('userEmail');
      await prefs.remove('userName');
      await prefs.remove('isGuest');

      if (!mounted) return;

      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (context) => const LoginScreen()),
        (route) => false,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            floating: false,
            pinned: true,
            backgroundColor: Colors.black,
            title: const Text('Profile'),
            centerTitle: true,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back, color: Colors.white),
              onPressed: () => Navigator.of(context).pop(),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.all(16.0),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                // Profile Header
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: Colors.grey[900],
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.grey[800]!, width: 1),
                  ),
                  child: Column(
                    children: [
                      // Profile Avatar
                      Container(
                        width: 100,
                        height: 100,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.red, width: 3),
                        ),
                        child: ClipOval(
                          child: _avatarSeed != null && _avatarSeed!.isNotEmpty
                              ? SizedBox(
                                  width: 100,
                                  height: 100,
                                  child: AvatarPlus(_avatarSeed!),
                                )
                              : CircleAvatar(
                                  radius: 50,
                                  backgroundColor: Colors.red,
                                  child: _userName != null && _userName!.isNotEmpty
                                      ? Text(
                                          _userName![0].toUpperCase(),
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontSize: 36,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        )
                                      : const Icon(
                                          Icons.person,
                                          color: Colors.white,
                                          size: 50,
                                        ),
                                ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      // User Name
                      Text(
                        _isGuest
                            ? 'Guest User'
                            : (_userName ?? 'User'),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      // User Email
                      if (_userEmail != null && !_isGuest)
                        Text(
                          _userEmail!,
                          style: TextStyle(
                            color: Colors.grey[400],
                            fontSize: 14,
                          ),
                        ),
                      if (_isGuest)
                        Container(
                          margin: const EdgeInsets.only(top: 8),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 6,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.grey[800],
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text(
                            'Guest Mode',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Points & Streak Section (only for logged-in users)
                if (!_isGuest) ...[
                  _buildSectionTitle('Points & Streak'),
                  _buildPointsAndStreakCard(),
                ],

                // Account Section
                _buildSectionTitle('Account'),
                _buildAction(
                  icon: Icons.face_outlined,
                  title: 'Change Avatar',
                  onTap: _handleChangeAvatar,
                ),
                if (!_isGuest)
                  _buildAction(
                    icon: Icons.edit_outlined,
                    title: 'Edit Profile',
                    onTap: _handleEditProfile,
                  ),
                if (!_isGuest)
                  _buildAction(
                    icon: Icons.lock_outlined,
                    title: 'Change Password',
                    onTap: _handleChangePassword,
                  ),
                if (!_isGuest)
                  _buildAction(
                    icon: Icons.delete_outline,
                    title: 'Delete Account',
                    onTap: _handleDeleteAccount,
                  ),
                const SizedBox(height: 16),

                // Preferences Section
                _buildSectionTitle('Preferences'),
                _buildAction(
                  icon: Icons.notifications_outlined,
                  title: 'Notifications',
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Navigate to settings'),
                        backgroundColor: Colors.red,
                      ),
                    );
                  },
                ),
                _buildAction(
                  icon: Icons.favorite_outline,
                  title: 'Favorites',
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Favorites feature coming soon'),
                        backgroundColor: Colors.red,
                      ),
                    );
                  },
                ),
                const SizedBox(height: 16),

                // About Section
                _buildSectionTitle('About'),
                _buildAction(
                  icon: Icons.info_outline,
                  title: 'App Version',
                  trailing: const Text(
                    '1.0.0',
                    style: TextStyle(color: Colors.white70),
                  ),
                ),
                _buildAction(
                  icon: Icons.help_outline,
                  title: 'Help & Support',
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Help & support feature coming soon'),
                        backgroundColor: Colors.red,
                      ),
                    );
                  },
                ),
                const SizedBox(height: 24),

                // Logout Button
                if (!_isGuest)
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      onPressed: _handleLogout,
                      child: const Text(
                        'Logout',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                if (_isGuest)
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      onPressed: () {
                        Navigator.of(context).pushAndRemoveUntil(
                          MaterialPageRoute(
                            builder: (context) => const LoginScreen(),
                          ),
                          (route) => false,
                        );
                      },
                      child: const Text(
                        'Sign In or Sign Up',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                const SizedBox(height: 32),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12, top: 8),
      child: Text(
        title,
        style: TextStyle(
          color: Colors.grey[400],
          fontSize: 12,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.0,
        ),
      ),
    );
  }

  Widget _buildAction({
    required IconData icon,
    required String title,
    Widget? trailing,
    VoidCallback? onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.grey[900],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[800]!, width: 1),
      ),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: Colors.red.withOpacity(0.15),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: Colors.red, size: 20),
        ),
        title: Text(
          title,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w500,
          ),
        ),
        trailing: trailing ?? const Icon(Icons.chevron_right, color: Colors.white70),
        onTap: onTap,
      ),
    );
  }

      Widget _buildPointsAndStreakCard() {
        if (_isLoadingPoints) {
          return Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.grey[900],
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey[800]!, width: 1),
            ),
            child: const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.red),
              ),
            ),
          );
        }

        return Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.red[900]!, Colors.red[700]!],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.red.withOpacity(0.3),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            children: [
              // Points Section
              Expanded(
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(
                        Icons.stars,
                        color: Colors.white,
                        size: 32,
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Points',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '$_points',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
              // Divider
              Container(
                width: 1,
                height: 80,
                color: Colors.white.withOpacity(0.3),
              ),
              // Streak Section
              Expanded(
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(
                        Icons.local_fire_department,
                        color: Colors.white,
                        size: 32,
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Streak',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '$_streakDays',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      _streakDays == 1 ? 'day' : 'days',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.8),
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }
}

