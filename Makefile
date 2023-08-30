intall:
	yarn install

build: install
	yarn run build-all

format-check:
	yarn run format:check

format-fix:
	yarn run format:write