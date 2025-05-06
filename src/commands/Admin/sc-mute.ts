import { ApplicationCommandOptionType, DiscordAPIError, Guild, GuildMember, Interaction, PermissionsBitField } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";
import { canAction } from "@/job/userAction";
import { Action } from "@/entity/Logs";
import { LogsService } from "@/services/LogsService";
module.exports = new ApplicationCommand({
    command: {
        name: 'mute',
        description: 'Mettre en sourdine un utilisateur',
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: 'user',
                description: 'Utilisateur à mettre en sourdine',
                required: true,
            },
            {
              type: ApplicationCommandOptionType.String,
              name: 'duration',
              description: 'Durée de la sourdine (en minutes) default: 10',
              required: false,  
            },
            {
              type: ApplicationCommandOptionType.String,
              name: 'reason',
              description: 'Raison de la sourdine',
              required: false,
            }
        ],
    },
    options: {
        default_member_permissions: PermissionsBitField.Flags.MuteMembers
    },
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;

        const user = interaction.options.getUser('user');
        if (!user) return interaction.reply({ content: 'Utilisateur non trouvé', ephemeral: true });

        const member = interaction.guild?.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: 'Utilisateur non trouvé', ephemeral: true });
        if (member?.isCommunicationDisabled()) {
            await member.timeout(null);
            await LogsService.createLog(client, interaction.guild as Guild, interaction.member as GuildMember, member as GuildMember, Action.UNMUTE, 
              `${interaction.member.user.username} a démuté ${member.user.username}`);
            return interaction.reply({ content: 'Utilisateur démuté avec succès', ephemeral: true });
        } 

        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason');

        if (!await canAction(interaction.member as GuildMember, member as GuildMember, new PermissionsBitField(PermissionsBitField.Flags.MuteMembers))) {
            return interaction.reply({ content: 'Vous ne pouvez pas faire cette action', ephemeral: true });
        }
          
        try {
          await member.timeout(1000 * 60 * (duration ? parseInt(duration) : 10));
          await LogsService.createLog(client, interaction.guild as Guild, interaction.member as GuildMember, member as GuildMember, Action.MUTE, 
            `${interaction.member.user.username} a mis ${member.user.username} en sourdine pour ${duration ? duration + ' minutes' : '10 minutes'} ${reason ? `(${reason})` : 'sans raison précise'}`);
            return interaction.reply({ content: `Utilisateur mis en sourdine avec succès`, ephemeral: true });
        } catch (error) {
          console.error(error);
          interaction.reply({ content: `Une erreur est survenue lors de la mise en sourdine de l'utilisateur`, ephemeral: true });
        }

    }
}).toJSON();