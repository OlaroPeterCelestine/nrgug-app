import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:avatar_plus/avatar_plus.dart';
import '../pages/profile_screen.dart';

class ProfileAvatarIcon extends StatefulWidget {
  final double size;
  final VoidCallback? onTap;

  const ProfileAvatarIcon({
    super.key,
    this.size = 36,
    this.onTap,
  });

  @override
  State<ProfileAvatarIcon> createState() => _ProfileAvatarIconState();
}

class _ProfileAvatarIconState extends State<ProfileAvatarIcon> {
  String? _avatarSeed;

  @override
  void initState() {
    super.initState();
    _loadAvatarSeed();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Reload avatar when returning to screen (e.g., after changing avatar in profile)
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadAvatarSeed();
    });
  }

  Future<void> _loadAvatarSeed() async {
    final prefs = await SharedPreferences.getInstance();
    final avatarSeed = prefs.getString('avatarSeed');
    final isGuest = prefs.getBool('isGuest') ?? false;
    
    setState(() {
      _avatarSeed = avatarSeed;
      
      // Generate avatar seed if not exists
      if (_avatarSeed == null) {
        if (isGuest) {
          _avatarSeed = 'guest_${DateTime.now().millisecondsSinceEpoch}';
        } else {
          final userName = prefs.getString('userName');
          _avatarSeed = userName ?? DateTime.now().millisecondsSinceEpoch.toString();
        }
        prefs.setString('avatarSeed', _avatarSeed!);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: widget.onTap ?? () async {
        await Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => const ProfileScreen(),
          ),
        );
        // Reload avatar after returning from profile screen
        _loadAvatarSeed();
      },
      borderRadius: BorderRadius.circular(widget.size / 2),
      child: Container(
        width: widget.size,
        height: widget.size,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: Colors.red, width: 2),
        ),
        child: ClipOval(
          child: _avatarSeed != null && _avatarSeed!.isNotEmpty
              ? SizedBox(
                  width: widget.size,
                  height: widget.size,
                  child: AvatarPlus(_avatarSeed!),
                )
              : CircleAvatar(
                  radius: widget.size / 2,
                  backgroundColor: Colors.red,
                  child: Icon(
                    Icons.person,
                    color: Colors.white,
                    size: widget.size * 0.55,
                  ),
                ),
        ),
      ),
    );
  }
}

