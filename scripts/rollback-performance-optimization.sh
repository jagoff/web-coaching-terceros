#!/bin/bash

# Rollback script for performance optimization
# Usage: ./scripts/rollback-performance-optimization.sh

echo "🔄 Rolling back performance optimization..."

# Check if we're on the correct branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "❌ Error: Not on main branch. Current branch: $current_branch"
    exit 1
fi

# Check if backup tag exists
if ! git tag | grep -q "backup-before-performance-optimization"; then
    echo "❌ Error: Backup tag not found"
    exit 1
fi

echo "📦 Found backup tag: backup-before-performance-optimization"

# Show current state
echo "📊 Current commit: $(git log --oneline -1)"

# Confirm rollback
read -p "⚠️  Are you sure you want to rollback to the backup state? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Rollback cancelled"
    exit 1
fi

# Create a pre-rollback tag
echo "🏷️  Creating pre-rollback tag..."
git tag -a "pre-rollback-$(date +%Y%m%d-%H%M%S)" -m "Pre-rollback state before reverting performance optimization"

# Reset to backup state
echo "🔄 Resetting to backup state..."
git reset --hard backup-before-performance-optimization

# Restore dependencies
echo "📦 Restoring dependencies..."
npm install

# Verify build
echo "🔨 Verifying build..."
if npm run build; then
    echo "✅ Rollback successful!"
    echo "📊 Current commit: $(git log --oneline -1)"
    echo "🏷️  Available rollback points:"
    git tag | grep -E "(backup|pre-rollback)" | sort -r
else
    echo "❌ Build failed after rollback"
    echo "🔄 Attempting to restore pre-rollback state..."
    latest_pre_rollback=$(git tag | grep "pre-rollback" | sort -r | head -1)
    if [ ! -z "$latest_pre_rollback" ]; then
        git reset --hard "$latest_pre_rollback"
        npm install
        echo "✅ Restored to pre-rollback state: $latest_pre_rollback"
    fi
    exit 1
fi

echo "🎯 Rollback completed successfully!"
echo "💡 To continue development from this point:"
echo "   npm run dev"
echo "   git add . && git commit -m 'Continuing development after rollback'"
