import {
    Interaction,
    ApplicationCommandOptionType,
    TextChannel,
    Role,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType,
    ActionRow,
    MessageComponent,
} from "discord.js";
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
        if (!interaction.member || !interaction.guild) return;

        const channel = interaction.options.getChannel('channel') as TextChannel;
        const messageId = interaction.options.getString('message');
        const role = interaction.options.getRole('role') as Role;

        if (!channel || !messageId || !role) {
            return interaction.reply({ content: 'Veuillez remplir tous les champs', ephemeral: true });
        }

        const message = await channel.messages.fetch(messageId);
        if (!message) {
            return interaction.reply({ content: 'Message non trouvé', ephemeral: true });
        }

        const newButton = new ButtonBuilder()
            .setCustomId(`btn-roles_${role.id}`)
            .setLabel(role.name)
            .setStyle(ButtonStyle.Primary);
        let components = message.components.map(row => {
            const actionRow = new ActionRowBuilder<ButtonBuilder>();
            (row as any).components.forEach((component: any) => {
                if (component.type === ComponentType.Button) {
                    actionRow.addComponents(ButtonBuilder.from(component));
                }
            });
            return actionRow;
        });

        let added = false;

        // Cherche une ligne avec de la place (<5 boutons)
        for (const row of components) {
            if (row.components.length < 5) {
                row.addComponents(newButton);
                added = true;
                break;
            }
        }

        // Si aucune ligne dispo, en créer une nouvelle
        if (!added) {
            if (components.length >= 5) {
                return interaction.reply({ content: 'Le message a atteint la limite maximale de boutons.', ephemeral: true });
            }

            const newRow = new ActionRowBuilder<ButtonBuilder>().addComponents(newButton);
            components.push(newRow);
        }

        await message.edit({ components });
        await interaction.reply({ content: 'Bouton ajouté avec succès !', ephemeral: true });
    }
}).toJSON();
