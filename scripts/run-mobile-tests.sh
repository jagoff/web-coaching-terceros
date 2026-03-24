#!/bin/bash

# Mobile Test Runner Script
# Usage: ./scripts/run-mobile-tests.sh [options]

set -e

echo "📱 Mobile Test Suite Runner"
echo "=========================="

# Default values
PROJECT="Mobile Chrome"
REPORTER="html"
HEADED=false
DEBUG=false
UPDATE_SNAPSHOTS=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --headed)
      HEADED=true
      shift
      ;;
    --debug)
      DEBUG=true
      shift
      ;;
    --update-snapshots)
      UPDATE_SNAPSHOTS=true
      shift
      ;;
    --reporter)
      REPORTER="$2"
      shift 2
      ;;
    --project)
      PROJECT="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --headed              Run tests in headed mode (show browser)"
      echo "  --debug               Enable debug mode"
      echo "  --update-snapshots    Update visual snapshots"
      echo "  --reporter <type>     Set reporter type (html, line, json, etc.)"
      echo "  --project <name>      Set project (Mobile Chrome, Mobile Safari)"
      echo "  --help, -h            Show this help message"
      echo ""
      echo "Examples:"
      echo "  $0                           # Run mobile tests in headless mode"
      echo "  $0 --headed                  # Run with visible browser"
      echo "  $0 --project "Mobile Safari"  # Run on iOS Safari"
      echo "  $0 --debug                   # Run with debug mode"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Check if server is running
echo "🔍 Checking if development server is running..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Development server is running"
else
    echo "❌ Development server is not running"
    echo "🚀 Starting development server..."
    npm run dev &
    DEV_PID=$!
    
    # Wait for server to start
    echo "⏳ Waiting for server to start..."
    for i in {1..30}; do
        if curl -s http://localhost:3000 > /dev/null; then
            echo "✅ Server started successfully"
            break
        fi
        if [ $i -eq 30 ]; then
            echo "❌ Failed to start server"
            kill $DEV_PID 2>/dev/null
            exit 1
        fi
        sleep 1
    done
fi

# Build Playwright command
COMMAND="npx playwright test tests/mobile-complete-suite.spec.ts"

# Add options
if [ "$HEADED" = true ]; then
    COMMAND="$COMMAND --headed"
fi

if [ "$DEBUG" = true ]; then
    COMMAND="$COMMAND --debug"
fi

if [ "$UPDATE_SNAPSHOTS" = true ]; then
    COMMAND="$COMMAND --update-snapshots"
fi

COMMAND="$COMMAND --project=\"$PROJECT\""
COMMAND="$COMMAND --reporter=$REPORTER"

echo ""
echo "🎯 Running Mobile Tests"
echo "======================"
echo "Project: $PROJECT"
echo "Reporter: $REPORTER"
echo "Headed: $HEADED"
echo "Debug: $DEBUG"
echo "Command: $COMMAND"
echo ""

# Run tests
eval $COMMAND

# Capture exit code
EXIT_CODE=$?

# Clean up development server if we started it
if [ ! -z "$DEV_PID" ]; then
    echo "🛑 Stopping development server..."
    kill $DEV_PID 2>/dev/null
fi

# Show results
echo ""
if [ $EXIT_CODE -eq 0 ]; then
    echo "🎉 All mobile tests passed!"
    echo ""
    echo "📊 View detailed report:"
    echo "   open playwright-report/index.html"
else
    echo "❌ Some mobile tests failed"
    echo "   Exit code: $EXIT_CODE"
    echo ""
    echo "🔍 View detailed report:"
    echo "   open playwright-report/index.html"
fi

exit $EXIT_CODE
