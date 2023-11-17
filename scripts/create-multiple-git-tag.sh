#!/bin/bash

for dir in $(yarn lerna ls --json --all | jq -r '.[].location'); do
  VERSION=$(node -e "console.log(require('$dir/package.json').version)")
  NAME=$(node -e "console.log(require('$dir/package.json').name)")
  TAG="$NAME@v$VERSION"

  # Check if the tag already exists
  if git rev-parse -q --verify "refs/tags/$TAG" > /dev/null; then
    echo "Git tag $TAG already exists. Skipping tag creation."
  else
    # Tag doesn't exist, create it
    git tag -a "$TAG" -m "Version $VERSION"
    echo "Git tag $TAG created"
  fi
done

# Push all tags
git push --tags
