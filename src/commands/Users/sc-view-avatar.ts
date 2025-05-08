import { Interaction, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";

module.exports = new ApplicationCommand({
    command: {
        name: 'view-avatar',
        description: 'Affiche l\'avatar d\'un utilisateur',
        options: [
            {
                name: 'user',
                description: 'L\'utilisateur à afficher',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
        ],
    },
    options: {},
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        if (!interaction.guild) return;
        const user = interaction.options.getUser('user');
        if (!user) return interaction.reply({ content: 'Utilisateur non trouvé', ephemeral: true });
        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(user.username)
            .setDescription(`**Avatar:** ${user.displayAvatarURL({ size: 4096 })}`)
            .setImage(user.displayAvatarURL({ size: 4096 }))
            .setTimestamp();  
        interaction.reply({ embeds: [embed] });
    }
}).toJSON();