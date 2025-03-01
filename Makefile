include .github/build/Makefile.show-help.mk

.PHONY: setup build format-check format-fix lint

## Install Sistent dependencies on your local machine
setup:
	npm install

## Build Sistent components and packages on your local machine
build:
	npm run build

## Buid Sistent in watch mode
build-watch:
	npm run build:watch

## Check code formatting
format-check:
	npm run format:check

## Fix code formatting
format-fix:
	npm run format:write

## Run Eslint on your local machine
lint:
	npm run lint

## Run tests
run-tests:
	npm run test

.PHONY: version-patch version-minor version-major

# Create a patch version of packages
version-patch:
	npm run versionup:patch

# Create a minor version of packages
version-minor:
	npm run versionup:minor

# Create a major version of packages
version-major:
	npm run versionup:major
