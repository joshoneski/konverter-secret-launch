
#!/bin/bash

# Get the current date for the commit message
current_date=$(date +"%Y-%m-%d %H:%M")

# Default commit message with timestamp
default_message="Updates - $current_date"

# Check if a custom message was provided
if [ -n "$1" ]; then
  commit_message="$1 - $current_date"
else
  commit_message="$default_message"
fi

# Add all changes
git add .

# Commit with the message
git commit -m "$commit_message"

# Push to the default remote branch
echo "Pushing changes..."
git push

echo "Successfully committed and pushed changes with message: '$commit_message'"
