import ApplicationCommand from "@structure/ApplicationCommand";
import { ChannelType, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import { Interaction } from "discord.js";
import { GuildService } from "@/services/GuildService";

module.exports = new ApplicationCommand({
    command: {
        name: 'setup-channel-generator',
        description: 'Setup the channel generator',
    },
    options: {
        default_member_permissions: PermissionsBitField.Flags.ManageChannels
    },
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        if (!interaction.guild) return;

        const guildData = await GuildService.getGuildById(client, interaction.guild.id);
        if (!guildData) return interaction.reply({ content: 'Erreur lors de la récupération des données du serveur', ephemeral: true });

        if (guildData.categoryChannelGenerator && guildData.channelGenerator) {
            try {
                await interaction.guild?.channels.cache.get(guildData.categoryChannelGenerator)?.delete();
                await interaction.guild?.channels.cache.get(guildData.channelGenerator)?.delete();
            } catch (error) {
                console.error(error);
            }
        }

        const category = await interaction.guild?.channels.create({
            name: 'Générateur de salons',
            type: ChannelType.GuildCategory,
        }); 
        if (!category) return interaction.reply({ content: 'Erreur lors de la création de la catégorie', ephemeral: true });
        const channel = await interaction.guild?.channels.create({
            name: '🔊 ┆ Créer un salon vocal',
            type: ChannelType.GuildVoice,
            parent: category,
            permissionOverwrites: [
                {
                    id: interaction.guild?.id,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect],
                },
            ],
        });
        if (!channel) return interaction.reply({ content: 'Erreur lors de la création du salon', ephemeral: true });
        await GuildService.updateGuild(client, interaction.guild?.id, {
            categoryChannelGenerator: category.id,
            channelGenerator: channel.id,
        });
       return interaction.reply({ content: 'Salon générateur configuré avec succès', ephemeral: true });
    }
}).toJSON();