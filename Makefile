install:
	pip install -r requirements.txt

run:
	docker-compose build
	docker-compose up 

server:
	cd backend && python app.py
	
react:
	cd frontend/bestsuited && npm start

venv:
	python3 -m venv venv
	source venv/bin/activate

data:
	cd backend && cd data && python script.py 