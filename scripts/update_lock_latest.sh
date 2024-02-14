#!/usr/bin/env bash

yarn install

git add .
git commit -m "chore(release): update lock file"
git push origin master