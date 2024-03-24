build-image:
	docker build -f Dockerfile.prod -t cine-frontend-prod .

run-prod-container:
	docker run -it -p 3000:3000 cine-frontend-prod  

start-dev: 
	docker-compose up -d

stop-dev: 
	docker-compose down
