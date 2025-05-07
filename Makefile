.PHONY: build run stop logs clean help db-logs

# Variables
COMPOSE_FILE = docker-compose.yml

help:
	@echo "Commandes disponibles:"
	@echo "  make build    - Construit les images Docker"
	@echo "  make rebuild  - Reconstruit les images Docker"
	@echo "  make dev      - Lance les services en mode développement"
	@echo "  make all-logs - Affiche les logs de tous les services"
	@echo "  make run      - Lance les services"
	@echo "  make stop     - Arrete les services"
	@echo "  make logs     - Affiche les logs du bot"
	@echo "  make db-logs  - Affiche les logs de la base de donnees"
	@echo "  make clean    - Nettoie les conteneurs et images"
	@echo "  make restart  - Redemarre les services"
	@echo "  make status   - Affiche le statut (uptime) des services"
	@echo "  make stats    - Affiche l'utilisation des ressources (CPU/RAM)"
	@echo "  make help     - Affiche cette aide"

rebuild:
	@echo "🔁 Reconstruction complète des images Docker..."
	docker-compose -f $(COMPOSE_FILE) down
	docker-compose -f $(COMPOSE_FILE) build --no-cache
	docker-compose -f $(COMPOSE_FILE) up -d


dev:
	@echo "🚀 Lancement en mode développement (rapide, sans build complet)..."
	docker-compose -f $(COMPOSE_FILE) up --build --no-deps -d

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
	docker-compose -f $(COMPOSE_FILE) logs -f db

all-logs:
	@echo "Affichage des logs de tous les services..."
	docker-compose -f $(COMPOSE_FILE) logs -f

clean:
	@echo "Nettoyage des conteneurs et images..."
	docker-compose -f $(COMPOSE_FILE) down -v --rmi all --remove-orphans

restart: stop run
	@echo "Services redémarrés avec succès" 

status:
	@echo "📦 Statut des services Docker Compose :"
	docker-compose -f $(COMPOSE_FILE) ps

stats:
	@echo "📊 Utilisation des ressources (CPU/Mémoire) :"
	docker stats $(docker-compose -f $(COMPOSE_FILE) ps -q)