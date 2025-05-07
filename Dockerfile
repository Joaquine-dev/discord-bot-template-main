# Utiliser l'image de base Node.js
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système pour PostgreSQL
RUN apk add --no-cache postgresql-client

# Copier les fichiers package et installer les dépendances
COPY package*.json ./
RUN npm install

# Assurer l'installation de reflect-metadata et ts-node
RUN npm install reflect-metadata ts-node

# Copier le reste des fichiers de l'application
COPY . .

# Définir l'environnement de production
ENV NODE_ENV=production

# Compiler le code TypeScript
RUN npm run build

# Rendre le script exécutable
RUN chmod +x ./.docker/typeorm-run.sh

# Commande pour démarrer les migrations et le bot
CMD ["sh", "./.docker/typeorm-run.sh"]
