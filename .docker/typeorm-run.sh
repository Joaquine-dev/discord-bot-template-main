#!/bin/sh

# Attendre que la base de données soit prête
until pg_isready -h db -p 4895 -U bot
do
  echo "⏳ En attente de PostgreSQL..."
  sleep 2
done

#DROP (ONLY DEV)
npx ts-node ./node_modules/typeorm/cli.js --dataSource ./src/utils/typeorm.config.ts schema:drop

# Générer les migrations
echo "📦 Génération des migrations..."
npx ts-node ./node_modules/typeorm/cli.js --dataSource ./src/utils/typeorm.config.ts migration:generate ./src/migrations/Init

# Exécuter les migrations
echo "📦 Lancement des migrations..."
npx ts-node ./node_modules/typeorm/cli.js --dataSource ./src/utils/typeorm.config.ts migration:run

# Lancer le bot
echo "🚀 Lancement du bot Discord..."
node dist/index.js
