import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Interaction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  TextChannel,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  PermissionFlagsBits
} from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";
import UserAction from "@job/userAction";

module.exports = new ApplicationCommand({
  command: {
      name: 'embed-creator',
      description: 'Créateur d\'embed interactif',
      options: [],
  },
  options: {},
  run: async (client: DiscordBot, interaction: Interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (!interaction.guild) return;

      // Vérification des permissions
      if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
          await interaction.reply({
              content: '❌ Vous n\'avez pas la permission d\'utiliser cette commande.',
              ephemeral: true
          });
          return;
      }

      const embedData = {
          title: 'Créateur d\'Embed',
          description: 'Utilisez les boutons ci-dessous pour personnaliser votre embed',
          color: '#2F3136',
          image: null as string | null,
          thumbnail: null as string | null,
          author: {
              name: '',
              iconURL: null as string | null
          },
          footer: {
              text: '',
              iconURL: null as string | null
          },
          fields: [] as { name: string; value: string; inline: boolean }[],
          messageId: null as string | null
      };

      const userAction = new UserAction(client, interaction, embedData);
      await userAction.start();
  }
}).toJSON();
