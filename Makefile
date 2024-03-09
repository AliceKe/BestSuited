build:
	docker-compose build

run:
	docker-compose up 

local:
	cd backend && python app.py