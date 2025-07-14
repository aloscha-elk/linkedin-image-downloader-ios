# LinkedIn Image Downloader for iOS

A Scriptable script that downloads images from LinkedIn posts directly to your iPhone's Photos app, with automatic avatar filtering.

## Features

- 🖼️ Downloads all images from LinkedIn posts
- 🚫 Automatically skips avatars and profile pictures
- 📱 Works directly from LinkedIn app via Share Sheet
- 🔍 Detailed console logging for debugging
- ⚡ Built for iOS Scriptable app

## Installation

1. **Install Scriptable** from the App Store (free)
2. **Open Scriptable** and create a new script
3. **Copy the code** from `linkedin-downloader.js`
4. **Save the script** with name "LinkedIn Downloader"

## Usage

### Method 1: From LinkedIn App
1. Open any LinkedIn post with images
2. Tap the **Share** button
3. Copy the post URL
4. Open Scriptable and run the "LinkedIn Downloader" script

### Method 2: With iOS Shortcuts (Advanced)
1. Create a new Shortcut in the Shortcuts app
2. Add these actions:
   - Get input from Share Sheet (URL/Text)
   - Copy to Clipboard
   - Run Script (Scriptable) → Select "LinkedIn Downloader"
3. Enable the shortcut in Share Sheet
4. Use: LinkedIn → Share → Your Shortcut

## How It Works

1. **Fetches** the LinkedIn page HTML
2. **Extracts** all media.licdn.com image URLs using regex
3. **Filters out** small images (avatars ≤100x100px or square images ≤200x200px)
4. **Downloads** and saves remaining images to Photos app
5. **Reports** results with detailed logging

## Requirements

- iOS device with Scriptable app
- Internet connection
- Photos app permission

## Troubleshooting

**No images found:**
- Check if the LinkedIn URL is correct
- Some posts may not have downloadable images
- Try running from Safari instead of the LinkedIn app

**Only downloading first image:**
- Check console output for error messages
- Network issues may interrupt the process
- Try with a different LinkedIn post

**Script fails to run:**
- Ensure Scriptable has internet access
- Check if Photos app permission is granted
- Verify the LinkedIn URL contains "linkedin.com"

## Technical Details

- Uses `media.licdn.com` and `media-exp*.licdn.com` URL patterns
- Implements 500ms delay between downloads to avoid rate limiting
- Filters images by dimensions to exclude avatars
- Supports both Share Sheet input and clipboard input

## Privacy

- Script only accesses public LinkedIn content
- Images are saved locally to your device
- No data is shared with third parties
- No tracking or analytics

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - see LICENSE file for details
