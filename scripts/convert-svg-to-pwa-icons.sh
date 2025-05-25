#!/bin/bash
# Script to convert the SVG logo to various PNG sizes for PWA
# Requires Inkscape or other SVG-to-PNG conversion tool

# Directory for the icons
ICON_DIR="public/icons"
export SVG_FILE="$ICON_DIR/logo.svg"

# Make sure the icons directory exists
mkdir -p "$ICON_DIR"

# Function to convert SVG to PNG at specified size
convert_svg_to_png() {
  local size=$1
  local output_file="$ICON_DIR/icon-${size}x${size}.png"
  
  echo "Converting SVG to $size x $size PNG..."
  
  # Option 1: Using Inkscape (if installed)
  # inkscape -w $size -h $size --export-filename="$output_file" "$SVG_FILE"
  
  # Option 2: Using ImageMagick (if installed)
  # convert -background none -size ${size}x${size} "$SVG_FILE" "$output_file"
  
  # Option 3: Using librsvg (if installed)
  # rsvg-convert -w $size -h $size "$SVG_FILE" > "$output_file"
  
  echo "Created $output_file"
}

# Convert to all required sizes
convert_svg_to_png 72
convert_svg_to_png 96
convert_svg_to_png 128
convert_svg_to_png 144
convert_svg_to_png 152
convert_svg_to_png 192
convert_svg_to_png 384
convert_svg_to_png 512

echo "==================================="
echo "Icon conversion script is ready!"
echo "==================================="
echo ""
echo "To use this script, you need to have one of these tools installed:"
echo "1. Inkscape (uncomment the inkscape line in the script)"
echo "2. ImageMagick (uncomment the convert line in the script)"
echo "3. librsvg (uncomment the rsvg-convert line in the script)"
echo ""
echo "After installing one of these tools, edit this script to"
echo "uncomment the corresponding conversion command and run it again."
