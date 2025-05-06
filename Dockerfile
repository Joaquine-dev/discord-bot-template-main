# Étape 1 : Utiliser une image Node.js officielle avec la version 20
FROM node:20-alpine

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et package-lock.json (si existant)
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm ci --only=production

# Étape 5 : Copier le reste des fichiers de l'application
COPY . .

# Étape 6 : Installer les dépendances de développement
RUN npm install --only=development


# Étape 8 : Construire le projet TypeScript
RUN npm run build

# Étape 9 : Exposer un port (facultatif)
EXPOSE 3000

# Étape 10 : Commande par défaut pour démarrer l'application
CMD ["npm", "run", "start"]