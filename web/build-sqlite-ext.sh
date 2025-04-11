#!/bin/bash

# Detect OS and architecture
OS=$(uname -s)
ARCH=$(uname -m)

# Set library extension based on OS
if [ "$OS" = "Darwin" ]; then
    LIB_EXT="dylib"
else
    LIB_EXT="so"
fi

if [ "$OS" = "Darwin" ]; then
    # macOS-specific paths
    if [ "$ARCH" = "arm64" ]; then
        SQLITE_INCLUDE="/opt/homebrew/opt/sqlite/include"
        SQLITE_LIB="/opt/homebrew/opt/sqlite/lib"
    else
        SQLITE_INCLUDE="/usr/local/opt/sqlite/include"
        SQLITE_LIB="/usr/local/opt/sqlite/lib"
    fi

    # Install SQLite if needed
    if [ ! -d "$SQLITE_INCLUDE" ]; then
        echo "SQLite development files not found. Installing SQLite..."
        brew install sqlite
    fi

    # Build command for macOS
    gcc -g -fPIC -rdynamic -shared \
        sqlite/uuid.c \
        -o "sqlite/uuid.c.$LIB_EXT" \
        -I"$SQLITE_INCLUDE" \
        -L"$SQLITE_LIB" \
        -lsqlite3 \
        -arch "$ARCH"

elif [ "$OS" = "Linux" ]; then
    # Linux-specific setup
    if ! command -v pkg-config &> /dev/null; then
        echo "Installing pkg-config..."
        sudo apt-get update && sudo apt-get install -y pkg-config
    fi

    if ! pkg-config --libs sqlite3 &> /dev/null; then
        echo "Installing SQLite development files..."
        sudo apt-get update && sudo apt-get install -y libsqlite3-dev
    fi

    # Build command for Linux
    gcc -g -fPIC -rdynamic -shared \
        sqlite/uuid.c \
        -o "sqlite/uuid.c.$LIB_EXT" \
        $(pkg-config --cflags --libs sqlite3)
else
    echo "Unsupported operating system: $OS"
    exit 1
fi

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Successfully built SQLite extension for $OS $ARCH"
else
    echo "Failed to build SQLite extension"
    exit 1
fi
