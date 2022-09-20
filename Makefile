install:
	npm ci

lint:
	npx stylelint ./app/scss/**/*.scss
	npx htmlhint ./app/*.html

build:
	npm run build

develop:
	npm run develop

deploy:
	npm run deploy