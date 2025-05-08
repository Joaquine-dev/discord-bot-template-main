import { Interaction, ApplicationCommandOptionType, TextChannel, Role, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";

module.exports = new ApplicationCommand({
    command: {
        name: 'add-btn-roles',
        description: 'Ajoute un bouton pour un rôles sous un message',
        options: [
            {
                name: 'channel',
                description: 'Le salon à ajouter le bouton',
                type: ApplicationCommandOptionType.Channel,
                required: true,
            },
            {
              name: 'message',
              description: 'L\'id du message à ajouter le bouton',
              type: ApplicationCommandOptionType.String,
              required: true,
            },
            {
                name: 'role',
                description: 'Le rôle à ajouter le bouton',
                type: ApplicationCommandOptionType.Role,
                required: true,
            },
        ],
    },
    options: {},
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        if (!interaction.guild) return;

        const channel = interaction.options.getChannel('channel') as TextChannel;
        const message = interaction.options.getString('message');
        const role = interaction.options.getRole('role') as Role;

        if (!channel || !message || !role) return interaction.reply({ content: 'Veuillez remplir tous les champs', ephemeral: true });    


        const messageToAddButton = await channel.messages.fetch(message);
        if (!messageToAddButton) return interaction.reply({ content: 'Message non trouvé', ephemeral: true });
        if (messageToAddButton.components.length >= 5) return interaction.reply({ content: 'Le message a deja la limit de button autorisé', ephemeral: true });

        const button = new ButtonBuilder()
            .setCustomId(`btn-roles_${role.id}`)
            .setLabel(role.name)
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .setComponents(button);
        await messageToAddButton.edit({ components: [row] });
        await interaction.reply({ content: 'Bouton ajouté avec succès !', ephemeral: true });
    }
}).toJSON();