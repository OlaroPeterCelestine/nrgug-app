import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class YouTubePlayer extends StatefulWidget {
  final String videoUrl;
  final String? title;

  const YouTubePlayer({
    super.key,
    required this.videoUrl,
    this.title,
  });

  @override
  State<YouTubePlayer> createState() => _YouTubePlayerState();
}

class _YouTubePlayerState extends State<YouTubePlayer> {
  late final WebViewController _controller;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _initializeController();
  }

  void _initializeController() {
    final videoId = _extractVideoId(widget.videoUrl);
    
    if (videoId.isEmpty) {
      // If not a valid YouTube URL, try to load the URL directly
      _controller = WebViewController()
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..setNavigationDelegate(
          NavigationDelegate(
            onPageStarted: (String url) {
              setState(() {
                _isLoading = true;
              });
            },
            onPageFinished: (String url) {
              setState(() {
                _isLoading = false;
              });
            },
            onWebResourceError: (WebResourceError error) {
              setState(() {
                _isLoading = false;
              });
            },
          ),
        )
        ..loadRequest(Uri.parse(widget.videoUrl));
      } else {
      // Use YouTube embed URL with proper parameters
      final embedUrl = 'https://www.youtube.com/embed/$videoId?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=https://nrgug.vercel.app';
      
      // Create HTML page with proper iframe for better YouTube compatibility
      final htmlContent = '''
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background-color: #000;
            overflow: hidden;
        }
        #player {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <div id="player">
        <iframe
            src="$embedUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            playsinline>
        </iframe>
    </div>
</body>
</html>
''';

      _controller = WebViewController()
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..setBackgroundColor(Colors.black)
        ..setNavigationDelegate(
          NavigationDelegate(
            onPageStarted: (String url) {
              setState(() {
                _isLoading = true;
              });
            },
            onPageFinished: (String url) {
              setState(() {
                _isLoading = false;
              });
            },
            onWebResourceError: (WebResourceError error) {
              setState(() {
                _isLoading = false;
              });
            },
            onNavigationRequest: (NavigationRequest request) {
              // Allow all navigation for YouTube embeds
              return NavigationDecision.navigate;
            },
          ),
        )
        ..loadHtmlString(htmlContent, baseUrl: 'https://www.youtube.com');
    }
  }

  String _extractVideoId(String url) {
    if (url.isEmpty) return '';
    
    // Handle various YouTube URL formats
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    // https://www.youtube.com/embed/VIDEO_ID
    // https://m.youtube.com/watch?v=VIDEO_ID
    // https://youtube.com/watch?v=VIDEO_ID
    
    try {
      if (url.contains('youtu.be/')) {
        final parts = url.split('youtu.be/');
        if (parts.length > 1) {
          return parts[1].split('?')[0].split('&')[0].split('/')[0];
        }
      } else if (url.contains('youtube.com/watch?v=') || url.contains('youtube.com/watch?') && url.contains('v=')) {
        final uri = Uri.parse(url);
        final videoId = uri.queryParameters['v'];
        if (videoId != null && videoId.isNotEmpty) {
          return videoId;
        }
      } else if (url.contains('youtube.com/embed/')) {
        final parts = url.split('youtube.com/embed/');
        if (parts.length > 1) {
          return parts[1].split('?')[0].split('&')[0].split('/')[0];
        }
      } else if (url.contains('youtube.com/v/')) {
        final parts = url.split('youtube.com/v/');
        if (parts.length > 1) {
          return parts[1].split('?')[0].split('&')[0].split('/')[0];
        }
      }
    } catch (e) {
      // If parsing fails, return empty string
      return '';
    }
    
    return '';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        leading: IconButton(
          icon: const Icon(Icons.close, color: Colors.white),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: widget.title != null
            ? Text(
                widget.title!,
                style: const TextStyle(color: Colors.white, fontSize: 16),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              )
            : null,
      ),
      body: Stack(
        children: [
          WebViewWidget(controller: _controller),
          if (_isLoading)
            Container(
              color: Colors.black,
              child: const Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircularProgressIndicator(
                      color: Colors.red,
                    ),
                    SizedBox(height: 16),
                    Text(
                      'Loading video...',
                      style: TextStyle(color: Colors.white70, fontSize: 14),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}




