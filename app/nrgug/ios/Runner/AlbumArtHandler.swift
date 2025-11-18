import Flutter
import UIKit
import MediaPlayer

public class AlbumArtHandler: NSObject {
    public static func handle(_ call: FlutterMethodCall, result: @escaping FlutterResult) {
        switch call.method {
        case "setAlbumArt":
            if let args = call.arguments as? [String: Any] {
                setAlbumArt(args: args, result: result)
            } else {
                result(FlutterError(code: "INVALID_ARGUMENTS", message: "Invalid arguments", details: nil))
            }
        case "setPlaybackState":
            if let args = call.arguments as? [String: Any], let isPlaying = args["isPlaying"] as? Bool {
                setPlaybackState(isPlaying: isPlaying)
                result(nil)
            } else {
                result(FlutterError(code: "INVALID_ARGUMENTS", message: "Missing isPlaying", details: nil))
            }
        default:
            result(FlutterMethodNotImplemented)
        }
    }
    
    private static func setAlbumArt(args: [String: Any], result: @escaping FlutterResult) {
        guard let title = args["title"] as? String,
              let artist = args["artist"] as? String,
              let album = args["album"] as? String,
              let imageUrl = args["imageUrl"] as? String else {
            result(FlutterError(code: "MISSING_ARGUMENTS", message: "Missing required arguments", details: nil))
            return
        }
        
        // Download image from URL
        guard let url = URL(string: imageUrl) else {
            result(FlutterError(code: "INVALID_URL", message: "Invalid image URL", details: nil))
            return
        }
        
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, let image = UIImage(data: data) else {
                DispatchQueue.main.async {
                    result(FlutterError(code: "IMAGE_LOAD_FAILED", message: "Failed to load image", details: nil))
                }
                return
            }
            
            DispatchQueue.main.async {
                // Create artwork
                let artwork = MPMediaItemArtwork(boundsSize: image.size) { _ in
                    return image
                }
                
                // Set now playing info
                var info: [String: Any] = [
                    MPMediaItemPropertyTitle: title,
                    MPMediaItemPropertyArtist: artist,
                    MPMediaItemPropertyAlbumTitle: album,
                    MPMediaItemPropertyArtwork: artwork,
                ]
                // Mark as live stream so Dynamic Island/Now Playing treats it correctly
                info[MPNowPlayingInfoPropertyIsLiveStream] = true
                // Explicitly mark as audio
                info[MPNowPlayingInfoPropertyMediaType] = MPMediaType.anyAudio.rawValue
                // Default playback rate to 1.0 so it shows as playing until updated
                info[MPNowPlayingInfoPropertyPlaybackRate] = 1.0
                MPNowPlayingInfoCenter.default().nowPlayingInfo = info
                
                result(nil)
            }
        }.resume()
    }

    private static func setPlaybackState(isPlaying: Bool) {
        guard var info = MPNowPlayingInfoCenter.default().nowPlayingInfo else {
            return
        }
        info[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0
        // Live stream has no duration; keep elapsed at 0
        info[MPNowPlayingInfoPropertyElapsedPlaybackTime] = 0
        MPNowPlayingInfoCenter.default().nowPlayingInfo = info
    }
}
