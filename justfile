run-backend:
	cd backend && npm run serve
run-frontend:
	cd frontend && npm run dev

[arg('flag', pattern='--write|--help|')]
check-backend flag='':
	cd backend && biome check {{flag}}

[arg('flag', pattern='--write|--help|')]
check-frontend flag='':
	cd frontend && biome check {{flag}}

[arg('flag', pattern='--write|--help|')]
check flag='':
	#!/bin/bash

	[[ "--help" == "{{flag}}" ]] && biome --help && exit 0
	just check-frontend {{flag}}
	just check-backend {{flag}}
