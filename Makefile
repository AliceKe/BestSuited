install:
	pip install -r requirements.txt

run:
	docker-compose build
	docker-compose up 

local:
	cd backend && python app.py

venv:
	python3 -m venv venv
	source venv/bin/activate