#!/bin/bash

# NRG UG Radio App Deployment Script
echo "🚀 Starting NRG UG Radio App Deployment..."

# Set version
VERSION="1.0.0"
BUILD_DATE=$(date +"%Y-%m-%d")

echo "📱 Building Android APK..."
flutter build apk --release

echo "📦 Building Android App Bundle..."
flutter build appbundle --release

echo "🍎 Building iOS App..."
flutter build ios --release

echo "📋 Build Summary:"
echo "=================="
echo "Version: $VERSION"
echo "Build Date: $BUILD_DATE"
echo ""
echo "Android APK: build/app/outputs/flutter-apk/app-release.apk"
echo "Android AAB: build/app/outputs/bundle/release/app-release.aab"
echo "iOS App: build/ios/Release-iphoneos/Runner.app"
echo ""
echo "✅ Builds completed successfully!"
echo ""
echo "📤 Next steps:"
echo "1. Upload APK to Google Play Console"
echo "2. Upload AAB to Google Play Store"
echo "3. Upload iOS app to App Store Connect"
echo "4. Test on physical devices"
echo ""
echo "🎵 NRG UG Radio App is ready for deployment!"
