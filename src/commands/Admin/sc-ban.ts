import { ApplicationCommandOptionType, ApplicationCommandType, Guild, GuildMember, Interaction, PermissionsBitField } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";
import { canAction } from "@/job/userAction";
import { Action } from "@/entity/Logs";
import { LogsService } from "@/services/LogsService";


module.exports = new ApplicationCommand({
    command: {
        name: 'ban',
        description: 'Bannir un utilisateur',
        options: [
          {
            type: ApplicationCommandOptionType.User,
            name: 'user',
            description: 'Utilisateur à bannir',
            required: true,
          },
          {
            type: ApplicationCommandOptionType.String,
            name: 'reason',
            description: 'Raison du bannissement',
            required: true,
          },
        ],
    },
    options: {
      default_member_permissions: PermissionsBitField.Flags.BanMembers
    },

    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        try {
          const user = interaction.options.getUser('user');
          const reason = interaction.options.getString('reason');
          
          if (!user) return interaction.reply({ content: 'Veuillez entrer un utilisateur valide', ephemeral: true });
          
          const member = interaction.guild?.members.cache.get(user.id);
          if (!member) return interaction.reply({ content: 'Utilisateur non trouvé', ephemeral: true });
  
          if (!await canAction(
            interaction.member as GuildMember,
            member as GuildMember,
            new PermissionsBitField(PermissionsBitField.Flags.BanMembers)
        )) {
            return interaction.reply({ content: 'Vous ne pouvez pas faire cette action', ephemeral: true });
          }
          
          await member.ban({ reason: reason || 'Aucune raison spécifiée' });
          await LogsService.createLog(client, interaction.guild as Guild, interaction.member as GuildMember, member as GuildMember, Action.BAN, reason || 'Aucune raison spécifiée');
          interaction.reply({ content: `Utilisateur banni avec succès`, ephemeral: true });
          interaction.deleteReply();
        } catch (error) {
          console.error(error);
        }
    }
}).toJSON();