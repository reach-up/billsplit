#!/bin/bash
# Script to create PWA icons from the final-logo.png file

# Create icons directory if it doesn't exist
mkdir -p public/icons

# Use the final logo file provided
cp public/final-logo.png public/icons/icon-72x72.png
cp public/final-logo.png public/icons/icon-96x96.png
cp public/final-logo.png public/icons/icon-128x128.png
cp public/final-logo.png public/icons/icon-144x144.png
cp public/final-logo.png public/icons/icon-152x152.png
cp public/final-logo.png public/icons/icon-192x192.png
cp public/final-logo.png public/icons/icon-384x384.png
cp public/final-logo.png public/icons/icon-512x512.png

echo "Created all placeholder icon files in public/icons/"
echo "For production, you should replace these with properly sized images."
