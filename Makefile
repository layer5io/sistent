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
