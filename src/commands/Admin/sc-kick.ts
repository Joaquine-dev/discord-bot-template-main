import { ApplicationCommandOptionType, Guild, GuildMember, Interaction, PermissionsBitField } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";
import { canAction } from "@/job/userAction";
import { Action } from "@/entity/Logs";
import { LogsService } from "@/services/LogsService";

module.exports = new ApplicationCommand({
    command: {
        name: 'kick',
        description: 'Expulser un utilisateur',
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: 'user',
                description: 'Utilisateur à expulser',
                required: true,
            },
            {
                type: ApplicationCommandOptionType.String,
                name: 'reason',
                description: 'Raison de l\'expulsion',
                required: false,
            },
        ],
    },
    options: {
      default_member_permissions: PermissionsBitField.Flags.KickMembers
    },
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        const user = interaction.options.getUser('user'); 
        if (!user) return interaction.reply({ content: 'Utilisateur non trouvé', ephemeral: true });
        const member = interaction.guild?.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: 'Utilisateur non trouvé', ephemeral: true });
        if (!await canAction(
            interaction.member as GuildMember,
            member as GuildMember,
            new PermissionsBitField(PermissionsBitField.Flags.KickMembers)
        )) {
            return interaction.reply({ content: 'Vous ne pouvez pas faire cette action', ephemeral: true });
        }
        const reason = interaction.options.getString('reason') || 'Aucune raison spécifiée';
        try {
          await member.kick(reason);
          await LogsService.createLog(client, interaction.guild as Guild, interaction.member as GuildMember, member as GuildMember, Action.KICK, 
            `${interaction.member.user.username} a expulsé ${member.user.username} pour ${reason}`
          );
            return interaction.reply({ content: `Utilisateur expulsé avec succès`, ephemeral: true });
        } catch (error) {
          console.error(error);
          return interaction.reply({ content: `Une erreur est survenue lors de l'expulsion de l'utilisateur`, ephemeral: true });
        }
     

    }
}).toJSON();