# Étape 1 : Build
FROM node:20 AS builder

# Installer pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package.json pnpm-lock.yaml ./

# Installer toutes les dépendances (y compris devDependencies)
RUN pnpm install

# Copier le reste du code
COPY . .

# Compiler le code TypeScript avec tsup (présent en devDependency)
RUN pnpm build

# Étape 2 : Image de production
FROM node:20-slim

RUN npm install -g pnpm

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour prod
COPY package.json pnpm-lock.yaml ./

# Installer uniquement les dépendances de prod
RUN pnpm install --prod

# Copier les fichiers compilés et l'environnement
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

# Démarrage du bot
CMD ["node", "dist/index.js"]
