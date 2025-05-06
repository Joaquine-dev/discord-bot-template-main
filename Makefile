.PHONY: build run stop logs clean help db-logs

# Variables
COMPOSE_FILE = docker-compose.yml

help:
	@echo "Commandes disponibles:"
	@echo "  make build    - Construit les images Docker"
	@echo "  make run      - Lance les services"
	@echo "  make stop     - Arrete les services"
	@echo "  make logs     - Affiche les logs du bot"
	@echo "  make db-logs  - Affiche les logs de la base de donnees"
	@echo "  make clean    - Nettoie les conteneurs et images"
	@echo "  make restart  - Redemarre les services"
	@echo "  make help     - Affiche cette aide"

build:
	@echo "Construction des images Docker..."
	docker-compose -f $(COMPOSE_FILE) build

run:
	@echo "Démarrage des services..."
	docker-compose -f $(COMPOSE_FILE) up -d

stop:
	@echo "Arrêt des services..."
	docker-compose -f $(COMPOSE_FILE) down

logs:
	@echo "Affichage des logs du bot..."
	docker-compose -f $(COMPOSE_FILE) logs -f bot

db-logs:
	@echo "Affichage des logs de la base de données..."
	docker-compose -f $(COMPOSE_FILE) logs -f postgres

clean:
	@echo "Nettoyage des conteneurs et images..."
	docker-compose -f $(COMPOSE_FILE) down -v --rmi all --remove-orphans

restart: stop run
	@echo "Services redémarrés avec succès" 