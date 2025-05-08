import { Interaction, EmbedBuilder } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";

module.exports = new ApplicationCommand({
    command: {
        name: 'ping',
        description: 'Affiche la latence du bot',
        options: [],
    },
    options: {},
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        if (!interaction.guild) return;
        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Ping')
            .setDescription(`Pong ! ${client.ws.ping}ms`)
            .setTimestamp();
        interaction.reply({ embeds: [embed]});
    }
}).toJSON();