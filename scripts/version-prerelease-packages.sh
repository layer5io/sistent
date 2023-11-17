#!/bin/bash

# Usage: version-prerelrease-packages.sh
# Example: version-prerelrease-packages.sh

# Get the list of changed packages using Lerna
CHANGED_PACKAGES=$(yarn lerna changed --json | jq -r '.[].name')

if [ -n "$CHANGED_PACKAGES" ]; then
  echo "Changed packages detected: $CHANGED_PACKAGES"
  yarn lerna version --no-private --conventional-commits --conventional-prerelease --include-merged-tags --no-git-tag-version --yes

  # Stage changes to package.json files
  for PACKAGE_NAME in $CHANGED_PACKAGES; do
    PACKAGE_PATH="packages/$(echo $PACKAGE_NAME | tr -d '@' | sed 's/\//-/')"
    grep -q "\"name\": \"$PACKAGE_NAME\"" "$PACKAGE_PATH/package.json" && git add "$PACKAGE_PATH/package.json"
  done
else
  echo "No changed packages detected. Skipping lerna version."
fi
