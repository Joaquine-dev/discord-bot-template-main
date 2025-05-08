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
    PermissionFlagsBits,
    Message
} from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";
import UserAction from "@job/userAction";

module.exports = new ApplicationCommand({
    command: {
        name: 'embed-editor',
        description: 'Éditeur d\'embed interactif',
        options: [
            {
                name: 'message_id',
                description: 'ID du message contenant l\'embed à éditer',
                type: 3,
                required: true
            }
        ],
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

        const messageId = interaction.options.getString('message_id');
        if (!messageId) {
            await interaction.reply({
                content: '❌ Veuillez spécifier l\'ID du message à éditer.',
                ephemeral: true
            });
            return;
        }

        try {
            const message = await interaction.channel?.messages.fetch(messageId);
            if (!message) {
                await interaction.reply({
                    content: '❌ Message non trouvé.',
                    ephemeral: true
                });
                return;
            }

            const embed = message.embeds[0];
            if (!embed) {
                await interaction.reply({
                    content: '❌ Ce message ne contient pas d\'embed.',
                    ephemeral: true
                });
                return;
            }

            const embedData = {
                title: embed.title || '',
                description: embed.description || '',
                color: embed.color ? `#${embed.color.toString(16).padStart(6, '0')}` : '#2F3136',
                image: embed.image?.url || null,
                thumbnail: embed.thumbnail?.url || null,
                author: {
                    name: embed.author?.name || '',
                    iconURL: embed.author?.iconURL || null
                },
                footer: {
                    text: embed.footer?.text || '',
                    iconURL: embed.footer?.iconURL || null
                },
                fields: embed.fields.map(field => ({
                    name: field.name,
                    value: field.value,
                    inline: field.inline ?? false
                })),
                messageId: message.id
            };

            const userAction = new UserAction(client, interaction, embedData);
            await userAction.start();
        } catch (error) {
            await interaction.reply({
                content: '❌ Une erreur est survenue lors de la récupération du message.',
                ephemeral: true
            });
        }
    }
}).toJSON();