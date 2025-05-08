import { ApplicationCommandOptionType, Interaction, PermissionsBitField, TextChannel } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";

module.exports = new ApplicationCommand({
    command: {
        name: 'clear',
        description: 'Supprime les messages',
        options: [{
          name: 'nombre',
          description: 'Nombre de messages à supprimer',
          type: ApplicationCommandOptionType.Integer,
          required: true,
          minValue: 1,
          maxValue: 100
        }],
    },
    options: {
      default_member_permissions: PermissionsBitField.Flags.ManageMessages
    },
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        if (!interaction.guild) return;
        const nombre = interaction.options.getInteger('nombre');
        if (!nombre) return interaction.reply({ content: 'Veuillez spécifier un nombre de messages à supprimer', ephemeral: true });
        if (nombre < 1 || nombre > 100) return interaction.reply({ content: 'Le nombre de messages à supprimer doit être compris entre 1 et 100', ephemeral: true });
        const messages = await interaction.channel?.messages.fetch({ limit: nombre });
        if (!messages) return interaction.reply({ content: 'Aucun message trouvé', ephemeral: true });
        await (interaction.channel as TextChannel).bulkDelete(messages);
        await interaction.reply({ content: `J'ai supprimé ${messages.size} messages`, ephemeral: true });
    }
}).toJSON();