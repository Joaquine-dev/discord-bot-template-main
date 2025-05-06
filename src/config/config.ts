const config = {
  development: {
    enabled: true,
    guildId: "1369258577990123612",
  },
  commands: {
    prefix: "--",
    message_commands: true,
    application_commands: {
      chat_input: true,
      user_context: true,
      message_context: true,
    },
  },
  users: {
    ownerId: "1361668952475832528",
    developers: ["1361668952475832528"],
  },
  messages: {
    NOT_BOT_OWNER:
      "Vous n'avez pas la permission d'exécuter cette commande car vous n'êtes pas mon propriétaire !",
    NOT_BOT_DEVELOPER:
      "Vous n'avez pas la permission d'exécuter cette commande car vous n'êtes pas un de mes développeurs !",
    NOT_GUILD_OWNER:
      "Vous n'avez pas la permission d'exécuter cette commande car vous n'êtes pas le propriétaire du serveur !",
    CHANNEL_NOT_NSFW:
      "Vous ne pouvez pas exécuter cette commande dans un canal non NSFW !",
    MISSING_PERMISSIONS:
      "Vous n'avez pas la permission d'exécuter cette commande, permissions manquantes.",
    COMPONENT_NOT_PUBLIC: "Vous n'êtes pas l'auteur de ce bouton !",
    GUILD_COOLDOWN:
      "Vous êtes actuellement en période de recharge, vous pourrez réutiliser cette commande dans `%cooldown%s`.",
  },
};

export default config;
