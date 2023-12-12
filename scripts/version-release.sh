#!/bin/bash

# Usage: version-release.sh <version_type>
# Example: version-release.sh patch

# Get the list of changed packages using Lerna
CHANGED_PACKAGES=$(yarn lerna changed --json | jq -r '.[].name')

if [ -n "$CHANGED_PACKAGES" ]; then
  echo "Changed packages detected: $CHANGED_PACKAGES"

  # Set the version type from the script argument or use "patch" as default
  VERSION_TYPE=${1:-"patch"}

  # Run Lerna version with the specified type
  yarn lerna version $VERSION_TYPE --no-private --conventional-commits --include-merged-tags --no-git-tag-version --yes

  # Stage changes to package.json files
  for PACKAGE_NAME in $CHANGED_PACKAGES; do
    # Adjusting the package path based on the correct structure
    PACKAGE_PATH="packages/$PACKAGE_NAME"

    # Check if the package directory exists before attempting to grep
    if [ -d "$PACKAGE_PATH" ]; then
      grep -q "\"name\": \"$PACKAGE_NAME\"" "$PACKAGE_PATH/package.json" && git add "$PACKAGE_PATH/package.json"
    else
      echo "Package directory $PACKAGE_PATH does not exist."
    fi
  done
else
  echo "No changed packages detected. Skipping lerna version."
fi
