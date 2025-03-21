#!/bin/bash

# Define paths
TARGET_DIR="web/src/tts/providers/orpheus-tts-local"
REPO_URL="https://github.com/isaiahbjork/orpheus-tts-local.git"
TEMP_DIR="/tmp/orpheus-tts-temp"

# Print status messages in color
print_status() {
    echo -e "\033[0;32m[Setup] $1\033[0m"
}

print_error() {
    echo -e "\033[0;31m[Error] $1\033[0m"
}

# Create directories if they don't exist
mkdir -p "$TARGET_DIR"

# Clone repository to temp directory
print_status "Cloning orpheus-tts-local repository..."
if [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
fi
git clone "$REPO_URL" "$TEMP_DIR"

if [ $? -ne 0 ]; then
    print_error "Failed to clone repository"
    exit 1
fi

# Copy necessary files
print_status "Copying files to target directory..."
cp "$TEMP_DIR/requirements.txt" "$TARGET_DIR/"
cp "$TEMP_DIR/decoder.py" "$TARGET_DIR/"
cp "$TEMP_DIR/gguf_orpheus.py" "$TARGET_DIR/"

# Clean up temp directory
rm -rf "$TEMP_DIR"
rm -rf "$TARGET_DIR/.git"

print_status "Setup complete! The orpheus-tts-local files have been cloned."