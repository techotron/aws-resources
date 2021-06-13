REGISTRY=techotron
VERSION=$(shell git rev-parse --short HEAD)
APP=CHANGE-APP-NAME:fe-$(VERSION)

build:
	docker build -t $(REGISTRY)/$(APP) .
publish: docker-login	docker-push
docker-push:
	docker push $(REGISTRY)/$(APP)
docker-login:
	docker login -u techotron
up:
	npm start
