#!/bin/bash

# NRG UG Radio App Icon Generator
echo "🎨 Generating app icons from NRG logo..."

# Generate Android icons
echo "📱 Generating Android icons..."

# mdpi (48x48)
sips -z 48 48 nrg_logo.png --out "android/app/src/main/res/mipmap-mdpi/ic_launcher.png"
echo "Created mipmap-mdpi/ic_launcher.png (48x48)"

# hdpi (72x72)
sips -z 72 72 nrg_logo.png --out "android/app/src/main/res/mipmap-hdpi/ic_launcher.png"
echo "Created mipmap-hdpi/ic_launcher.png (72x72)"

# xhdpi (96x96)
sips -z 96 96 nrg_logo.png --out "android/app/src/main/res/mipmap-xhdpi/ic_launcher.png"
echo "Created mipmap-xhdpi/ic_launcher.png (96x96)"

# xxhdpi (144x144)
sips -z 144 144 nrg_logo.png --out "android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png"
echo "Created mipmap-xxhdpi/ic_launcher.png (144x144)"

# xxxhdpi (192x192)
sips -z 192 192 nrg_logo.png --out "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png"
echo "Created mipmap-xxxhdpi/ic_launcher.png (192x192)"

echo "🍎 Generating iOS icons..."

# iOS icons
sips -z 20 20 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@1x.png"
sips -z 40 40 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@2x.png"
sips -z 60 60 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@3x.png"
sips -z 29 29 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-29x29@1x.png"
sips -z 58 58 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-29x29@2x.png"
sips -z 87 87 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-29x29@3x.png"
sips -z 40 40 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-40x40@1x.png"
sips -z 80 80 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-40x40@2x.png"
sips -z 120 120 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-40x40@3x.png"
sips -z 120 120 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-60x60@2x.png"
sips -z 180 180 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-60x60@3x.png"
sips -z 76 76 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-76x76@1x.png"
sips -z 152 152 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-76x76@2x.png"
sips -z 167 167 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-83.5x83.5@2x.png"
sips -z 1024 1024 nrg_logo.png --out "ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png"

echo "✅ App icons generated successfully!"
echo ""
echo "📱 Android icons created in: android/app/src/main/res/"
echo "🍎 iOS icons created in: ios/Runner/Assets.xcassets/AppIcon.appiconset/"
echo ""
echo "🔄 Next steps:"
echo "1. Rebuild the app: flutter clean && flutter build apk --release"
echo "2. Test the new icons on device"
echo "3. Deploy updated version"