import 'package:flutter/material.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool notificationsEnabled = true;
  bool autoplayEnabled = true;
  bool backgroundPlayback = true;
  String streamQuality = 'High';

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          floating: false,
          pinned: true,
          backgroundColor: Colors.black,
          title: const Text('Settings'),
          centerTitle: true,
          actions: [
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: CircleAvatar(
                radius: 18,
                backgroundColor: Colors.red,
                child: const Icon(Icons.person, color: Colors.white, size: 20),
              ),
            ),
          ],
        ),
        SliverPadding(
          padding: const EdgeInsets.all(16.0),
          sliver: SliverList(
            delegate: SliverChildListDelegate([
              _buildSectionTitle('Playback'),
              _buildSwitch(
                icon: Icons.play_circle_outline,
                title: 'Autoplay on launch',
                value: autoplayEnabled,
                onChanged: (v) => setState(() => autoplayEnabled = v),
              ),
              _buildSwitch(
                icon: Icons.music_note_outlined,
                title: 'Background playback',
                value: backgroundPlayback,
                onChanged: (v) => setState(() => backgroundPlayback = v),
              ),
              _buildQualityPicker(),
              const SizedBox(height: 16),

              _buildSectionTitle('Notifications'),
              _buildSwitch(
                icon: Icons.notifications_outlined,
                title: 'Enable notifications',
                value: notificationsEnabled,
                onChanged: (v) => setState(() => notificationsEnabled = v),
              ),
              const SizedBox(height: 16),

              _buildSectionTitle('Privacy & Legal'),
              _buildAction(
                icon: Icons.policy_outlined,
                title: 'Privacy Policy',
                onTap: _openPrivacyPolicy,
              ),
              const SizedBox(height: 16),

              _buildSectionTitle('About'),
              _buildAction(
                icon: Icons.info_outline,
                title: 'App version',
                trailing: const Text('1.0.0', style: TextStyle(color: Colors.white70)),
              ),
              _buildAction(
                icon: Icons.article_outlined,
                title: 'Licenses',
                onTap: () => showLicensePage(context: context, applicationName: 'NRG UG'),
              ),
              const SizedBox(height: 24),
              _buildSaveButton(),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        title,
        style: const TextStyle(color: Colors.white70, fontSize: 12, letterSpacing: 1.0),
      ),
    );
  }

  Widget _buildSwitch({
    required IconData icon,
    required String title,
    required bool value,
    required ValueChanged<bool> onChanged,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.grey[850],
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[800]!, width: 1),
      ),
      child: SwitchListTile.adaptive(
        secondary: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: Colors.red.withOpacity(0.15),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: Colors.red),
        ),
        title: Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        value: value,
        onChanged: onChanged,
        activeColor: Colors.red,
      ),
    );
  }

  Widget _buildQualityPicker() {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.grey[850],
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
          child: const Icon(Icons.equalizer_outlined, color: Colors.red),
        ),
        title: const Text('Stream quality', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        trailing: DropdownButtonHideUnderline(
          child: DropdownButton<String>(
            value: streamQuality,
            dropdownColor: Colors.grey[900],
            items: const [
              DropdownMenuItem(value: 'Low', child: Text('Low', style: TextStyle(color: Colors.white))),
              DropdownMenuItem(value: 'Medium', child: Text('Medium', style: TextStyle(color: Colors.white))),
              DropdownMenuItem(value: 'High', child: Text('High', style: TextStyle(color: Colors.white))),
            ],
            onChanged: (v) {
              if (v == null) return;
              setState(() => streamQuality = v);
            },
          ),
        ),
      ),
    );
  }

  Widget _buildAction({
    required IconData icon,
    required String title,
    String? subtitle,
    Widget? trailing,
    VoidCallback? onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.grey[850],
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
          child: Icon(icon, color: Colors.red),
        ),
        title: Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        subtitle: subtitle != null ? Text(subtitle, style: TextStyle(color: Colors.grey[400])) : null,
        trailing: trailing ?? const Icon(Icons.chevron_right, color: Colors.white70),
        onTap: onTap,
      ),
    );
  }

  Widget _buildSaveButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.red,
          padding: const EdgeInsets.symmetric(vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        ),
        onPressed: _saveSettings,
        child: const Text('Save Settings', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ),
    );
  }

  void _clearCache() {
    // No-op: cache controls removed
  }

  void _saveSettings() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Settings saved')),
    );
  }

  void _openPrivacyPolicy() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          backgroundColor: Colors.black,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          title: const Text('Privacy Policy', style: TextStyle(color: Colors.white)),
          content: SingleChildScrollView(
            child: Text(
              'We respect your privacy. This app processes minimal data necessary for playback and preferences and does not sell personal data. For full details, visit our website.',
              style: TextStyle(color: Colors.grey[300], height: 1.4),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }
}



