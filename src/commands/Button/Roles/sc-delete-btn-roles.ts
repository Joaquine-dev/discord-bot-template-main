import { ApplicationCommandOptionType, Interaction, Role, TextChannel, ActionRowBuilder, ButtonBuilder, MessageActionRowComponent, ButtonComponent } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";

module.exports = new ApplicationCommand({
    command: {
        name: 'delete-btn-roles',
        description: 'Supprime un bouton pour un rôles sous un message',
        options: [
            {
                name: 'channel',
                description: 'Le salon à supprimer le bouton',
                type: ApplicationCommandOptionType.Channel,
                required: true,
            },
            {
                name: 'message',
                description: 'L\'id du message à supprimer le bouton',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'role',
                description: 'Le rôle à supprimer le bouton',
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

        const messageToDeleteButton = await channel.messages.fetch(message);  
        if (!messageToDeleteButton) return interaction.reply({ content: 'Message non trouvé', ephemeral: true });

        const row = messageToDeleteButton.components[0];
        if (!row || !('components' in row)) return interaction.reply({ content: 'Aucun bouton trouvé', ephemeral: true });

        const button = row.components.find((component): component is ButtonComponent => 
            component.type === 2 && 'customId' in component && component.customId === `btn-roles_${role.id}`
        );
        if (!button) return interaction.reply({ content: 'Bouton non trouvé', ephemeral: true });

        const remainingButtons = row.components.filter((component): component is ButtonComponent => 
            component.type === 2 && 'customId' in component && component.customId !== `btn-roles_${role.id}`
        );

        if (remainingButtons.length === 0) {
            await messageToDeleteButton.edit({ components: [] });
        } else {
            const newRow = new ActionRowBuilder<ButtonBuilder>()
                .setComponents(remainingButtons.map(btn => ButtonBuilder.from(btn)));
            await messageToDeleteButton.edit({ components: [newRow] });
        }
        await interaction.reply({ content: 'Bouton supprimé avec succès !', ephemeral: true });
    }
}).toJSON();