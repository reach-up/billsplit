# PWA Icons

This directory should contain the following icon files for the PWA:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## How to Generate Icons

You can generate these icon files from your existing logo using one of these methods:

### Option 1: Use an Online Tool

1. Visit a PWA icon generator like [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) or [App Icon Generator](https://appicon.co/)
2. Upload your logo.png file
3. Download the generated icons and place them in this directory

### Option 2: Use NPM Package

If you prefer using npm, you can use the pwa-asset-generator package:

```bash
# Install the package
npm install -g pwa-asset-generator

# Generate icons from your logo
pwa-asset-generator ../logo.png ./ --icon-only --favicon
```

### Option 3: Manual Resizing

If you prefer to manually resize your logo:

1. Open your logo in an image editor (Photoshop, GIMP, etc.)
2. Resize to each of the required dimensions
3. Save each size with the appropriate filename in this directory

Once all icon files are in place, your PWA will be fully functional!
