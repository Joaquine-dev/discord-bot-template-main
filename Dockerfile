# Étape 1 : Build
FROM node:20 AS builder

# Installer pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copier uniquement les fichiers de dépendances pour le cache
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances
RUN pnpm install

# Copier tout le projet (y compris src/)
COPY . .

# Compiler le projet TypeScript
RUN pnpm build

# Étape 2 : Image de production
FROM node:20-slim

RUN npm install -g pnpm

WORKDIR /app

# Copier uniquement ce qui est nécessaire
COPY package.json pnpm-lock.yaml ./

# Installer seulement les dépendances de production
RUN pnpm install --prod

# Copier le build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

# Lancer le bot
CMD ["node", "dist/index.js"]
