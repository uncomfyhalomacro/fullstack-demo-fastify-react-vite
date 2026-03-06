[parallel]
run: run-backend run-frontend

[parallel]
run-prod: run-backend run-frontend-prod

run-frontend-prod: build
	cd frontend && npm install serve
	cd frontend && npx serve -l tcp://0.0.0.0:$PORT dist

build:
	cd frontend && npm run build

install-deps:
	cd frontend && npm install
	cd backend && npm install

run-mock:
	cd backend && npm run mock

run-backend:
	cd backend && npm run serve

run-frontend:
	cd frontend && npm run dev

[arg('flag', pattern='--write|--help|')]
check-backend flag='' *EXTRAFLAGS:
	cd backend && biome check {{flag}} {{EXTRAFLAGS}}

[arg('flag', pattern='--write|--help|')]
check-frontend flag='' *EXTRAFLAGS:
	cd frontend && biome check {{flag}} {{EXTRAFLAGS}}

[arg('flag', pattern='--write|--help|')]
check flag='' *EXTRAFLAGS:
	#!/bin/bash

	[[ "--help" == "{{flag}}" ]] && biome --help && exit 0
	just check-frontend {{flag}} {{EXTRAFLAGS}}
	just check-backend {{flag}} {{EXTRAFLAGS}}
