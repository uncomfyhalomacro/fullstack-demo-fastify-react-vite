[parallel]
run: run-backend run-frontend

build:
	cd frontend && npm run build

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
