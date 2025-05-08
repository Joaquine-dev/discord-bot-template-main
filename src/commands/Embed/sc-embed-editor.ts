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
    StringSelectMenuOptionBuilder
} from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";

module.exports = new ApplicationCommand({
    command: {
        name: 'embed-editor',
        description: 'Éditer un embed existant',
        options: [],
    },
    options: {},
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const embedData = {
            title: '',
            description: '',
            color: '#2F3136',
            image: null as string | null,
            thumbnail: null as string | null
        };

        const buildEmbed = () => new EmbedBuilder()
            .setTitle(embedData.title)
            .setDescription(embedData.description)
            .setColor(embedData.color as `#${string}`)
            .setImage(embedData.image ?? null)
            .setThumbnail(embedData.thumbnail ?? null)
            .setFooter({ text: 'Éditeur d\'Embed • ' + interaction.user.tag });

        const row1 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder().setCustomId('edit-title').setLabel('Titre').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('edit-description').setLabel('Description').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('edit-image').setLabel('Image').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('edit-thumbnail').setLabel('thumbnail').setStyle(ButtonStyle.Primary),
            );

        const row2 = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select-color')
                    .setPlaceholder('Choisissez une couleur')
                    .addOptions([
                        { label: 'Rouge', value: '#FF0000', emoji: '🔴' },
                        { label: 'Vert', value: '#00FF00', emoji: '🟢' },
                        { label: 'Bleu', value: '#0000FF', emoji: '🔵' },
                        { label: 'Jaune', value: '#FFFF00', emoji: '🟡' },
                        { label: 'Violet', value: '#800080', emoji: '🟣' }
                    ])
            );

        const row3 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder().setCustomId('preview').setLabel('Aperçu').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('send').setLabel('Envoyer').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('reset').setLabel('Réinitialiser').setStyle(ButtonStyle.Danger)
            );

        await interaction.reply({
            content: 'Répondez à un message contenant un embed pour l\'éditer.',
            ephemeral: true
        });

        const filter = (m: any) => m.author.id === interaction.user.id;
        const collector = (interaction.channel as TextChannel).createMessageCollector({ filter, time: 30000, max: 1 });

        collector?.on('collect', async (message) => {
            const targetEmbed = message.reference?.messageId;
            if (!targetEmbed) {
                await interaction.editReply({ content: 'Aucun embed trouvé dans le message référencé.' });
                return;
            }

            const referencedMessage = await message.channel.messages.fetch(targetEmbed);
            const embed = referencedMessage.embeds[0];

            if (!embed) {
                await interaction.editReply({ content: 'Aucun embed trouvé dans le message référencé.' });
                return;
            }

            embedData.title = embed.title || '';
            embedData.description = embed.description || '';
            embedData.color = embed.color ? `#${embed.color.toString(16).padStart(6, '0')}` : '#2F3136';
            embedData.image = embed.image?.url || null;
            embedData.thumbnail = embed.thumbnail?.url || null;

            await interaction.editReply({
                content: 'Embed chargé avec succès. Utilisez les boutons ci-dessous pour le modifier.',
                embeds: [buildEmbed()],
                components: [row1, row2, row3]
            });

            const buttonCollector = interaction.channel?.createMessageComponentCollector({
                filter: i => i.user.id === interaction.user.id,
                time: 600_000
            });

            buttonCollector?.on('collect', async i => {
                if (i.isButton()) {
                    const modal = new ModalBuilder().setCustomId(`modal-${i.customId}`).setTitle('Modification');

                    switch (i.customId) {
                        case 'edit-title':
                            modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(
                                new TextInputBuilder()
                                    .setCustomId('title')
                                    .setLabel('Nouveau titre')
                                    .setStyle(TextInputStyle.Short)
                                    .setValue(embedData.title)
                            ));
                            await i.showModal(modal);
                            break;
                        case 'edit-description':
                            modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(
                                new TextInputBuilder()
                                    .setCustomId('description')
                                    .setLabel('Nouvelle description')
                                    .setStyle(TextInputStyle.Paragraph)
                                    .setValue(embedData.description)
                            ));
                            await i.showModal(modal);
                            break;
                        case 'edit-image':
                            modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(
                                new TextInputBuilder()
                                    .setCustomId('image')
                                    .setLabel('URL de l\'image')
                                    .setStyle(TextInputStyle.Short)
                                    .setValue(embedData.image ?? '')
                            ));
                            await i.showModal(modal);
                            break;
                        case 'edit-thumbnail':
                            modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(
                                new TextInputBuilder()
                                    .setCustomId('thumbnail')
                                    .setLabel('URL de la thumbnail')
                                    .setStyle(TextInputStyle.Short)
                                    .setValue(embedData.thumbnail ?? '')
                            ));
                            await i.showModal(modal);
                            break;
                        case 'preview':
                            await i.reply({ embeds: [buildEmbed()], ephemeral: true });
                            break;
                        case 'send':
                            await referencedMessage.edit({ embeds: [buildEmbed()] });
                            await i.reply({ content: 'Embed modifié avec succès !', ephemeral: true });
                            break;
                        case 'reset':
                            embedData.title = embed.title || '';
                            embedData.description = embed.description || '';
                            embedData.color = embed.color ? `#${embed.color.toString(16).padStart(6, '0')}` : '#2F3136';
                            embedData.image = embed.image?.url || null;
                            embedData.thumbnail = embed.thumbnail?.url || null;
                            await i.update({ embeds: [buildEmbed()], components: [row1, row2, row3] });
                            break;
                    }
                } else if (i.isStringSelectMenu() && i.customId === 'select-color') {
                    embedData.color = i.values[0];
                    await i.update({ embeds: [buildEmbed()], components: [row1, row2, row3] });
                }
            });

            interaction.client.on('interactionCreate', async modal => {
                if (!modal.isModalSubmit()) return;
                if (modal.user.id !== interaction.user.id) return;

                const id = modal.customId.replace('modal-', '');

                switch (id) {
                    case 'edit-title':
                        embedData.title = modal.fields.getTextInputValue('title');
                        break;
                    case 'edit-description':
                        embedData.description = modal.fields.getTextInputValue('description');
                        break;
                    case 'edit-image':
                        embedData.image = modal.fields.getTextInputValue('image') || null;
                        break;
                    case 'edit-thumbnail':
                        embedData.thumbnail = modal.fields.getTextInputValue('thumbnail') || null;
                        break;
                }

                await modal.reply({ content: 'Modification enregistrée.', ephemeral: true });
                await interaction.editReply({ embeds: [buildEmbed()], components: [row1, row2, row3] });
            });

            buttonCollector?.on('end', async () => {
                await interaction.editReply({ components: [] });
            });
        });

        collector?.on('end', async (collected) => {
            if (collected.size === 0) {
                await interaction.editReply({ content: 'Temps écoulé. Aucun message n\'a été sélectionné.' });
            }
        });
    }
}).toJSON();