#!/usr/bin/env bash
# Build script for Render deployment

set -o errexit  # Exit on any error

echo "Starting build process..."

# Install dependencies
pip install -r requirements.txt

echo "Build completed successfully!"