REGISTRY=techotron/CHANGE-APP-NAME
APP=backend:$(VERSION)
IMAGE=golang:1.16 go
GOLANGCI_TAG=v1.28.3
ENVIRONMENT=dev
LOCAL_GO=go

build: 
	docker build -t $(REGISTRY)/$(APP) .

run-backend:
	docker-compose -f docker-compose.yaml -f docker-compose-debug.yaml up --build -d backend

down:
	docker-compose -f docker-compose.yaml -f docker-compose-debug.yaml down -v

all-tests:
	docker-compose up --exit-code-from test test

test: all-tests down

lint:
	docker run --rm -v $(shell pwd):/app -w /app golangci/golangci-lint:$(GOLANGCI_TAG) golangci-lint run

publish: docker-login	docker-push

coverage: test coverage-report

coverage-report: 
	$(LOCAL_GO) tool cover -html=c.out
	
coverage-ci:
	docker run --rm -v $(shell pwd):/app -w /app $(IMAGE) tool cover -func=c.out -o report.out
