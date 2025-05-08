import { Interaction, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";

module.exports = new ApplicationCommand({
    command: {
        name: 'user-info',
        description: 'Affiche les informations d\'un utilisateur',
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
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: 'Utilisateur non trouvé', ephemeral: true });
        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Informations de l\'utilisateur')   
            .setDescription(`**Nom:** ${user.username}\n**ID:** ${user.id}\n**Statut:** ${member.presence?.status || 'Hors ligne'}\n**Rôles:** ${member.roles.cache.map(role => role.name).join(', ')}\n**Date de création:** ${user.createdAt.toLocaleString()}\n**Date d'inscription:** ${member.joinedAt?.toLocaleString()}`)
            .setThumbnail(user.displayAvatarURL({ size: 4096 }))
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
    }
}).toJSON();