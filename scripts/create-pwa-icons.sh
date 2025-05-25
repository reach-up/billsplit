#!/bin/bash
# Simple script to create PWA icons from the existing logo

# Create directory if it doesn't exist
mkdir -p public/icons

# Copy the original logo to each icon size
# (in a real production app, you would resize properly)
cp public/logo.png public/icons/icon-72x72.png
cp public/logo.png public/icons/icon-96x96.png
cp public/logo.png public/icons/icon-128x128.png
cp public/logo.png public/icons/icon-144x144.png
cp public/logo.png public/icons/icon-152x152.png
cp public/logo.png public/icons/icon-192x192.png
cp public/logo.png public/icons/icon-384x384.png
cp public/logo.png public/icons/icon-512x512.png

echo "PWA icons created in public/icons directory."
echo "Note: These are just placeholder copies of the original logo."
echo "For production, you should resize them properly using an image editor or a tool like pwa-asset-generator."
