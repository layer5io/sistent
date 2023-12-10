.PHONY: setup build format-check format-fix

## Install Sistent dependencies your local machine.
package-setup:
	yarn install

## Build Sistent components and packages on your local machine.
package-build: setup
	yarn run build-all

package-format-check:
	yarn run format:check

package-format-fix:
	yarn run format:write

.PHONY: version-patch version-minor version-major version-alpha

# Create a patch version of packages
version-patch:
	yarn run versionup:patch

# Create a minor version of packages
version-minor:
	yarn run versionup:minor

# Create a major versio of packages
version-major:
	yarn run versionup:major

# Create beta version of the next minor version
# For example: 0.12.0 => 0.13.0-alpha.0
version-alpha:
	yarn run version:alpha
