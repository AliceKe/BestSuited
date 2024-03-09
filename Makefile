install:
	pip install -r requirements.txt
	
build:
	docker-compose build

run:
	docker-compose up 

local:
	cd backend && python app.py