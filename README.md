# 🤖 Discord Bot Template (TypeScript)

Un template complet pour créer un bot Discord moderne, puissant et maintenable, utilisant **TypeScript**, **TypeORM** et **PostgreSQL**.

## 🚀 Fonctionnalités

- **Structure modulaire** : commandes, événements, composants, réactions séparés
- **Support TypeScript** : typage fort, autocomplétion, sécurité
- **Base de données PostgreSQL** avec TypeORM (entités, migrations, relations)
- **Gestion avancée des commandes** (slash, message, contextuelles)
- **Gestion des composants Discord (boutons, menus, modals)**
- **Logs colorés et clairs**
- **Facile à étendre et à maintenir**

## 🛠️ Installation

1. **Cloner le repo**
   ```bash
   git clone https://github.com/Joaquine-dev/discord-bot-template-main.git
   cd discord-bot-template-main
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Configurer l'environnement**
   - Renomme `.env.example` en `.env` et remplis les variables (token Discord, DB, etc.)

4. **Lancer le bot en développement**
   ```bash
   pnpm dev
   # ou
   npm run dev
   ```

## 🗄️ Base de données & Migrations

- **Générer une migration :**
  ```bash
  npm run typeorm migration:generate -- -n NomMigration
  ```
- **Appliquer les migrations :**
  ```bash
  npm run typeorm migration:run
  ```

## 📁 Structure du projet

```
src/
│
├── client/           # Initialisation du bot, handlers principaux
├── commands/         # Commandes (slash, message, contextuelles)
├── components/       # Composants Discord (boutons, menus, modals)
├── events/           # Événements Discord (ready, guildMemberAdd, etc.)
├── entity/           # Entités TypeORM (User, Guilds, etc.)
├── services/         # Services métiers (UserService, etc.)
├── utils/            # Utilitaires (console, config, etc.)
├── migrations/       # Migrations TypeORM
└── ...
```

## ✨ Exemples


### Ajouter un événement
```typescript
import Event from '@structure/Event';
import { Events } from 'discord.js';

export default new Event({
  event: Events.GuildMemberAdd,
  run: async (client, member) => {
    console.log(`${member.user.tag} a rejoint le serveur!`);
  }
});
```

## 📝 Contribuer

Les contributions sont les bienvenues !  
N'hésite pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT

---

> Développé avec ❤️ par Joaquine

