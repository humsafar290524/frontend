#!/bin/bash

# Exit on error
set -e

# Build the project
echo "Building the project..."
npm run build

# Create a temporary directory for deployment
TEMP_DIR="../deploy-temp"

echo "Setting up deployment directory..."
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy the built files to the temp directory
echo "Copying built files..."
cp -r dist/* "$TEMP_DIR/"

# Create a .nojekyll file to bypass Jekyll processing
echo "" > "$TEMP_DIR/.nojekyll"

# Create a simple README.md
echo "# Humsafar" > "$TEMP_DIR/README.md"
echo "This is the deployed version of Humsafar." >> "$TEMP_DIR/README.md"

echo "Deployment files are ready in $TEMP_DIR"
echo "To deploy to GitHub Pages, run the following commands:"
echo "  cd $TEMP_DIR"
echo "  git init"
echo "  git add ."
echo "  git commit -m 'Deploy to GitHub Pages'"
echo "  git branch -M gh-pages"
echo "  git remote add origin https://github.com/humsafar290524/frontend.git"
echo "  git push -f origin gh-pages"
