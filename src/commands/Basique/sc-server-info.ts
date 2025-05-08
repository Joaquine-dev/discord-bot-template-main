import { Interaction, EmbedBuilder } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";

module.exports = new ApplicationCommand({
    command: {
        name: 'server-info',
        description: 'Affiche les informations du serveur',
        options: [],
    },
    options: {},
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        if (!interaction.guild) return;
        const embed = new EmbedBuilder()  
            .setColor('Blue')   
            .setTitle(interaction.guild.name)
            .setDescription(`**ID:** ${interaction.guild.id}\n**Date de création:** ${interaction.guild.createdAt.toLocaleString()}\n**Nombre de membres:** ${interaction.guild.memberCount}\n**Nombre de rôles:** ${interaction.guild.roles.cache.size}\n**Nombre de salons:** ${interaction.guild.channels.cache.size}`)
            .setThumbnail(interaction.guild.iconURL({ size: 4096 }))
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
    } 
}).toJSON();