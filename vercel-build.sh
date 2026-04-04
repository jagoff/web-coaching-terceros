#!/bin/bash

# Clean build
rm -rf .next

# Install dependencies
npm ci

# Build the project
npm run build

echo "Build completed successfully!"
