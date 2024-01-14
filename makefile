NODE = node
NPM = npm
DOCKER_COMPOSE = docker-compose

all: install run

install:
	@echo "Installing Node.js dependencies..."
	@$(NPM) install

run:
	@echo "Starting the server..."
	@$(NODE) src/app.js

up:
	@echo "Starting Docker containers..."
	@$(DOCKER_COMPOSE) up -d

down:
	@echo "Stopping Docker containers..."
	@$(DOCKER_COMPOSE) down

help:
	@echo "Available commands:"
	@echo "  make install - Install Node.js dependencies"
	@echo "  make run     - Start the server"
	@echo "  make up      - Start Docker containers"
	@echo "  make down	  - Stop Docker containers"
	@echo "  make all     - Install dependencies and start the server"

.PHONY: install run help all
