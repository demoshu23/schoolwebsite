# schoolwebsite

docker build -t schoolwebsite .

docker run -d -p 8080:80 --name schoolwebsite schoolwebsite


http://localhost:8080




Stop container:	        docker stop schoolwebsite

Start container:	docker start schoolwebsite

Remove container:	docker rm -f schoolwebsite

Rebuild after changes:	docker build -t schoolwebsite .

View logs:       	docker logs -f schoolwebsite