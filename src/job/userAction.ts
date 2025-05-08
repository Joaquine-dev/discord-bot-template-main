import config from "@/config/config";
import { GuildMember, PermissionFlagsBits, PermissionsBitField } from "discord.js";
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
    CommandInteraction
} from "discord.js";
import DiscordBot from "@client/DiscordBot";


export async function canReceiveDM(member: GuildMember): Promise<boolean> {
    try {
      await member.createDM();
      return true;
    } catch (error) {
      console.error(`Impossible de créer un canal DM pour ${member.user.tag}:`, error);
      return false;
    }
}

export async function canAction(executor: GuildMember, target: GuildMember, permission: PermissionsBitField): Promise<boolean> {
  if (target.permissions.has(PermissionFlagsBits.Administrator)) return false;
  if (executor.permissions.has(PermissionFlagsBits.Administrator)) return true; 
  if (executor.permissions.has(permission)) return true;
  if (executor.id == config.users.ownerId) return true;
  if (executor.id === target.id) return false;
  if (executor.roles.highest.position >= target.roles.highest.position) return false;
  return true;
}

interface EmbedData {
    title: string;
    description: string;
    color: string;
    image: string | null;
    thumbnail: string | null;
    author: {
        name: string;
        iconURL: string | null;
    };
    footer: {
        text: string;
        iconURL: string | null;
    };
    fields: { name: string; value: string; inline: boolean }[];
    messageId: string | null;
}

export default class UserAction {
    private client: DiscordBot;
    private interaction: CommandInteraction;
    private embedData: EmbedData;
    private collector: any;

    constructor(client: DiscordBot, interaction: CommandInteraction, embedData: EmbedData) {
        this.client = client;
        this.interaction = interaction;
        this.embedData = embedData;
    }

    public buildEmbed(): EmbedBuilder {
        const embed = new EmbedBuilder()
            .setTitle(this.embedData.title)
            .setDescription(this.embedData.description)
            .setColor(this.embedData.color as `#${string}`)
            .setImage(this.embedData.image ?? null)
            .setThumbnail(this.embedData.thumbnail ?? null)
            .setFooter({ 
                text: this.embedData.footer.text || 'Créateur d\'Embed • ' + this.interaction.user.tag,
                iconURL: this.embedData.footer.iconURL ?? undefined
            })
            .setAuthor({
                name: this.embedData.author.name || this.interaction.user.username,
                iconURL: this.embedData.author.iconURL ?? undefined
            });

        if (this.embedData.fields.length > 0) {
            embed.addFields(this.embedData.fields);
        }

        return embed;
    }

    public async handleModalSubmit(modal: Interaction): Promise<void> {
        if (!modal.isModalSubmit()) return;
        if (modal.user.id !== this.interaction.user.id) return;

        const id = modal.customId.replace('modal-', '');

        try {
            switch (id) {
                case 'edit-title':
                    this.embedData.title = modal.fields.getTextInputValue('title');
                    break;
                case 'edit-description':
                    this.embedData.description = modal.fields.getTextInputValue('description');
                    break;
                case 'edit-image':
                    const imageUrl = modal.fields.getTextInputValue('image');
                    if (imageUrl && !imageUrl.match(/^https?:\/\/.+\.(png|jpg|jpeg|gif|webp)$/i)) {
                        throw new Error('URL d\'image invalide');
                    }
                    this.embedData.image = imageUrl || null;
                    break;
                case 'edit-thumbnail':
                    const thumbnailUrl = modal.fields.getTextInputValue('thumbnail');
                    if (thumbnailUrl && !thumbnailUrl.match(/^https?:\/\/.+\.(png|jpg|jpeg|gif|webp)$/i)) {
                        throw new Error('URL de miniature invalide');
                    }
                    this.embedData.thumbnail = thumbnailUrl || null;
                    break;
                case 'edit-author':
                    this.embedData.author.name = modal.fields.getTextInputValue('author-name');
                    const authorIcon = modal.fields.getTextInputValue('author-icon');
                    if (authorIcon && !authorIcon.match(/^https?:\/\/.+\.(png|jpg|jpeg|gif|webp)$/i)) {
                        throw new Error('URL d\'icône d\'auteur invalide');
                    }
                    this.embedData.author.iconURL = authorIcon || null;
                    break;
                case 'edit-footer':
                    this.embedData.footer.text = modal.fields.getTextInputValue('footer-text');
                    const footerIcon = modal.fields.getTextInputValue('footer-icon');
                    if (footerIcon && !footerIcon.match(/^https?:\/\/.+\.(png|jpg|jpeg|gif|webp)$/i)) {
                        throw new Error('URL d\'icône de pied de page invalide');
                    }
                    this.embedData.footer.iconURL = footerIcon || null;
                    break;
                case 'add-field':
                    const name = modal.fields.getTextInputValue('field-name');
                    const value = modal.fields.getTextInputValue('field-value');
                    const inline = modal.fields.getTextInputValue('field-inline').toLowerCase() === 'true';
                    
                    if (!name || !value) {
                        throw new Error('Le nom et la valeur du champ sont requis');
                    }
                    
                    if (this.embedData.fields.length >= 25) {
                        throw new Error('Maximum de 25 champs atteint');
                    }
                    
                    this.embedData.fields.push({ name, value, inline });
                    break;
            }

            await modal.reply({ content: '✅ Modification enregistrée.', ephemeral: true });
            await this.updateMessage();
        } catch (error) {
            await modal.reply({ 
                content: `❌ Erreur: ${error instanceof Error ? error.message : 'Une erreur est survenue'}`,
                ephemeral: true 
            });
        }
    }

    public async handleButtonClick(i: Interaction): Promise<void> {
        if (!i.isButton()) return;

        const modal = new ModalBuilder().setCustomId(`modal-${i.customId}`).setTitle('Modification');

        switch (i.customId) {
            case 'edit-title':
                modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(
                    new TextInputBuilder()
                        .setCustomId('title')
                        .setLabel('Nouveau titre')
                        .setStyle(TextInputStyle.Short)
                        .setValue(this.embedData.title)
                        .setMaxLength(256)
                ));
                await i.showModal(modal);
                break;
            case 'edit-description':
                modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(
                    new TextInputBuilder()
                        .setCustomId('description')
                        .setLabel('Nouvelle description')
                        .setStyle(TextInputStyle.Paragraph)
                        .setValue(this.embedData.description)
                        .setMaxLength(4000)
                ));
                await i.showModal(modal);
                break;
            case 'edit-image':
                modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(
                    new TextInputBuilder()
                        .setCustomId('image')
                        .setLabel('URL de l\'image')
                        .setStyle(TextInputStyle.Short)
                        .setValue(this.embedData.image ?? '')
                        .setPlaceholder('https://exemple.com/image.png')
                ));
                await i.showModal(modal);
                break;
            case 'edit-thumbnail':
                modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(
                    new TextInputBuilder()
                        .setCustomId('thumbnail')
                        .setLabel('URL de la miniature')
                        .setStyle(TextInputStyle.Short)
                        .setValue(this.embedData.thumbnail ?? '')
                        .setPlaceholder('https://exemple.com/thumbnail.png')
                ));
                await i.showModal(modal);
                break;
            case 'edit-author':
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId('author-name')
                            .setLabel('Nom de l\'auteur')
                            .setStyle(TextInputStyle.Short)
                            .setValue(this.embedData.author.name)
                            .setMaxLength(256)
                    ),
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId('author-icon')
                            .setLabel('URL de l\'icône')
                            .setStyle(TextInputStyle.Short)
                            .setValue(this.embedData.author.iconURL ?? '')
                            .setPlaceholder('https://exemple.com/icon.png')
                    )
                );
                await i.showModal(modal);
                break;
            case 'edit-footer':
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId('footer-text')
                            .setLabel('Texte du pied de page')
                            .setStyle(TextInputStyle.Short)
                            .setValue(this.embedData.footer.text)
                            .setMaxLength(2048)
                    ),
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId('footer-icon')
                            .setLabel('URL de l\'icône')
                            .setStyle(TextInputStyle.Short)
                            .setValue(this.embedData.footer.iconURL ?? '')
                            .setPlaceholder('https://exemple.com/icon.png')
                    )
                );
                await i.showModal(modal);
                break;
            case 'add-field':
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId('field-name')
                            .setLabel('Nom du champ')
                            .setStyle(TextInputStyle.Short)
                            .setMaxLength(256)
                    ),
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId('field-value')
                            .setLabel('Valeur du champ')
                            .setStyle(TextInputStyle.Paragraph)
                            .setMaxLength(1024)
                    ),
                    new ActionRowBuilder<TextInputBuilder>().addComponents(
                        new TextInputBuilder()
                            .setCustomId('field-inline')
                            .setLabel('Afficher en ligne? (true/false)')
                            .setStyle(TextInputStyle.Short)
                            .setValue('false')
                    )
                );
                await i.showModal(modal);
                break;
            case 'preview':
                await i.reply({ embeds: [this.buildEmbed()], ephemeral: true });
                break;
            case 'send':
                try {
                    if (this.embedData.messageId) {
                        const message = await (this.interaction.channel as TextChannel).messages.fetch(this.embedData.messageId);
                        await message.edit({ embeds: [this.buildEmbed()] });
                        await i.reply({ content: '✅ Embed modifié avec succès !', ephemeral: true });
                    } else {
                        const message = await (this.interaction.channel as TextChannel).send({ embeds: [this.buildEmbed()] });
                        this.embedData.messageId = message.id;
                        await i.reply({ content: '✅ Embed envoyé avec succès !', ephemeral: true });
                    }
                } catch (error) {
                    await i.reply({ 
                        content: '❌ Erreur lors de l\'envoi/modification de l\'embed. Vérifiez que j\'ai les permissions nécessaires.',
                        ephemeral: true 
                    });
                }
                break;
            case 'reset':
                this.embedData.title = 'Créateur d\'Embed';
                this.embedData.description = 'Utilisez les boutons ci-dessous pour personnaliser votre embed';
                this.embedData.color = '#2F3136';
                this.embedData.image = null;
                this.embedData.thumbnail = null;
                this.embedData.author = { name: '', iconURL: null };
                this.embedData.footer = { text: '', iconURL: null };
                this.embedData.fields = [];
                await this.updateMessage();
                break;
            case 'remove-field':
                if (this.embedData.fields.length === 0) {
                    await i.reply({ 
                        content: '❌ Il n\'y a aucun champ à supprimer.',
                        ephemeral: true 
                    });
                    return;
                }

                const removeFieldMenu = new StringSelectMenuBuilder()
                    .setCustomId('remove-field-select')
                    .setPlaceholder('Sélectionnez le champ à supprimer')
                    .addOptions(
                        this.embedData.fields.map((field, index) => ({
                            label: field.name.length > 100 ? field.name.substring(0, 97) + '...' : field.name,
                            description: field.value.length > 100 ? field.value.substring(0, 97) + '...' : field.value,
                            value: index.toString()
                        }))
                    );

                const removeFieldRow = new ActionRowBuilder<StringSelectMenuBuilder>()
                    .addComponents(removeFieldMenu);

                await i.reply({
                    content: '📝 Sélectionnez le champ à supprimer :',
                    components: [removeFieldRow],
                    ephemeral: true
                });
                break;
        }
    }

    public async handleSelectMenu(i: Interaction): Promise<void> {
        if (!i.isStringSelectMenu()) return;

        if (i.customId === 'select-color') {
            this.embedData.color = i.values[0];
            await this.updateMessage();
        } else if (i.customId === 'remove-field-select') {
            const index = parseInt(i.values[0]);
            const removedField = this.embedData.fields[index];
            this.embedData.fields.splice(index, 1);
            await i.update({
                content: `✅ Champ "${removedField.name}" supprimé avec succès.`,
                embeds: [this.buildEmbed()],
                components: this.getRows().map(row => row.toJSON())
            });
        }
    }

    private async updateMessage(): Promise<void> {
        await this.interaction.editReply({ 
            content: '🎨 **Créateur d\'Embed**\nUtilisez les boutons ci-dessous pour personnaliser votre embed.\n\n**Conseils :**\n• Cliquez sur "Aperçu" pour voir le résultat\n• Utilisez "Réinitialiser" pour tout effacer\n• Les images doivent être des URLs valides',
            embeds: [this.buildEmbed()], 
            components: this.getRows().map(row => row.toJSON())
        });
    }

    private getRows(): ActionRowBuilder<any>[] {
        const row1 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder().setCustomId('edit-title').setLabel('Titre').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('edit-description').setLabel('Description').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('edit-image').setLabel('Image').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('edit-thumbnail').setLabel('Miniature').setStyle(ButtonStyle.Primary),
            );

        const row2 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder().setCustomId('edit-author').setLabel('Auteur').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('edit-footer').setLabel('Pied de page').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('add-field').setLabel('Ajouter un champ').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('remove-field').setLabel('Supprimer un champ').setStyle(ButtonStyle.Primary),
            );

        const row3 = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select-color')
                    .setPlaceholder('Choisissez une couleur')
                    .addOptions([
                        { label: 'Rouge', value: '#FF0000', emoji: '🔴' },
                        { label: 'Vert', value: '#00FF00', emoji: '🟢' },
                        { label: 'Bleu', value: '#0000FF', emoji: '🔵' },
                        { label: 'Jaune', value: '#FFFF00', emoji: '🟡' },
                        { label: 'Violet', value: '#800080', emoji: '🟣' },
                        { label: 'Orange', value: '#FFA500', emoji: '🟠' },
                        { label: 'Rose', value: '#FF69B4', emoji: '💗' },
                        { label: 'Cyan', value: '#00FFFF', emoji: '💠' },
                        { label: 'Blanc', value: '#FFFFFF', emoji: '⚪' },
                        { label: 'Noir', value: '#000000', emoji: '⚫' }
                    ])
            );

        const row4 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder().setCustomId('preview').setLabel('Aperçu').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('send').setLabel('Envoyer').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('reset').setLabel('Réinitialiser').setStyle(ButtonStyle.Danger)
            );

        return [row1, row2, row3, row4];
    }

    public async start(): Promise<void> {
        // Initialiser l'interaction avec un message de réponse
        await this.interaction.reply({
            content: '🎨 **Créateur d\'Embed**\nUtilisez les boutons ci-dessous pour personnaliser votre embed.\n\n**Conseils :**\n• Cliquez sur "Aperçu" pour voir le résultat\n• Utilisez "Réinitialiser" pour tout effacer\n• Les images doivent être des URLs valides',
            embeds: [this.buildEmbed()],
            components: this.getRows().map(row => row.toJSON()),
            ephemeral: true
        });

        this.collector = this.interaction.channel?.createMessageComponentCollector({
            filter: i => i.user.id === this.interaction.user.id,
            time: 900_000 // 15 minutes
        });

        this.collector?.on('collect', async (i: Interaction) => {
            if (i.isButton()) {
                await this.handleButtonClick(i);
            } else if (i.isStringSelectMenu()) {
                await this.handleSelectMenu(i);
            }
        });

        this.collector?.on('end', async () => {
            this.client.removeListener('interactionCreate', this.handleModalSubmit.bind(this));
            await this.interaction.editReply({ 
                content: '⏱️ Temps écoulé. Utilisez la commande à nouveau pour créer un nouvel embed.',
                components: [] 
            });
        });

        this.client.on('interactionCreate', this.handleModalSubmit.bind(this));
    }
}