up:
	docker compose up

upd:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

test:
	docker compose exec lojademo-service php artisan test

migrate:
	docker compose exec lojademo-service php artisan migrate --force

migrate-test:
	docker compose exec lojademo-service php artisan migrate --env=testing --force

seed:
	docker compose exec lojademo-service php artisan db:seed

stripe:
	stripe listen \
		--forward-to http://localhost:8000/api/v1/stripe/webhook \
		--skip-verify
