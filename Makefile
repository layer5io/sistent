.PHONY: setup build format-check format-fix

## Install Sistent dependencies your local machine.
package-setup:
	npm install

## Build Sistent components and packages on your local machine.
package-build: setup
	npm run build

package-build-watch: setup
	npm run build:watch

package-format-check:
	npm run format:check

package-format-fix:
	npm run format:write

.PHONY: version-patch version-minor version-major

# Create a patch version of packages
version-patch:
	npm run versionup:patch

# Create a minor version of packages
version-minor:
	npm run versionup:minor

# Create a major versio of packages
version-major:
	npm run versionup:major
