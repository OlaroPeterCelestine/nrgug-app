import Flutter
import UIKit
import AVFoundation
import MediaPlayer

@main
@objc class AppDelegate: FlutterAppDelegate {
  var remoteControlChannel: FlutterMethodChannel?
  
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    
    // Register custom album art handler
    if let controller = window?.rootViewController as? FlutterViewController {
      let channel = FlutterMethodChannel(name: "com.nrgug.radio/album_art", binaryMessenger: controller.binaryMessenger)
      channel.setMethodCallHandler { (call, result) in
        AlbumArtHandler.handle(call, result: result)
      }
      
      // Register remote control event handler
      remoteControlChannel = FlutterMethodChannel(name: "com.nrgug.radio/remote_control", binaryMessenger: controller.binaryMessenger)
    }
    
    // Ensure audio session is active for Now Playing / Dynamic Island
    do {
      try AVAudioSession.sharedInstance().setCategory(.playback, options: [.mixWithOthers, .allowBluetooth, .allowBluetoothA2DP])
      try AVAudioSession.sharedInstance().setActive(true)
    } catch {
      // ignore
    }
    
    UIApplication.shared.beginReceivingRemoteControlEvents()
    
    // Set up MPRemoteCommandCenter for lock screen controls
    let commandCenter = MPRemoteCommandCenter.shared()
    
    // Play command
    commandCenter.playCommand.isEnabled = true
    commandCenter.playCommand.addTarget { [weak self] _ in
      self?.remoteControlChannel?.invokeMethod("play", arguments: nil)
      return .success
    }
    
    // Pause command
    commandCenter.pauseCommand.isEnabled = true
    commandCenter.pauseCommand.addTarget { [weak self] _ in
      self?.remoteControlChannel?.invokeMethod("pause", arguments: nil)
      return .success
    }
    
    // Stop command
    commandCenter.stopCommand.isEnabled = true
    commandCenter.stopCommand.addTarget { [weak self] _ in
      self?.remoteControlChannel?.invokeMethod("stop", arguments: nil)
      return .success
    }
    
    // Toggle play/pause command
    commandCenter.togglePlayPauseCommand.isEnabled = true
    commandCenter.togglePlayPauseCommand.addTarget { [weak self] _ in
      self?.remoteControlChannel?.invokeMethod("togglePlayPause", arguments: nil)
      return .success
    }
    
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
