import { ApplicationCommandOptionType, ChannelType, GuildMember, Interaction, PermissionsBitField, GuildChannel, PermissionFlagsBits, Guild } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";
import { canAction } from "@/job/userAction";
import { LogsService } from "@/services/LogsService";
import { Action } from "@/entity/Logs";

module.exports = new ApplicationCommand({
    command: {
        name: 'lock-channel',
        description: 'Verrouiller/Déverrouiller un salon',
        options: [
          {
            type: ApplicationCommandOptionType.Channel,
            name: 'channel',
            description: 'Salon à verrouiller/déverrouiller',
            required: true,
          },
          {
            type: ApplicationCommandOptionType.String,
            name: 'reason',
            description: 'Raison du verrouillage',
            required: false,
          }
        ],
    },
    options: {
        default_member_permissions: PermissionsBitField.Flags.ManageChannels
    },
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        if (!interaction.guild) return;

        const member = interaction.member as GuildMember;
        const reason = interaction.options.getString('reason');
        const channel = interaction.options.getChannel('channel') as GuildChannel;

        if (!channel) return interaction.reply({ content: 'Salon introuvable', ephemeral: true });
        if (channel.type !== ChannelType.GuildVoice && channel.type !== ChannelType.GuildText) {
            return interaction.reply({ content: 'Ce salon doit être un salon vocal ou textuel', ephemeral: true });
        }
        const currentPerms = channel.permissionsFor(interaction.guild.roles.everyone);
        const isLocked = currentPerms?.has(channel.type === ChannelType.GuildVoice ? PermissionFlagsBits.Connect : PermissionFlagsBits.SendMessages) === false;
        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                [channel.type === ChannelType.GuildVoice ? 'Connect' : 'SendMessages']: isLocked,
            });
            if (!isLocked) {
                const modRole = interaction.guild.roles.cache.find(role => 
                    role.permissions.has(PermissionFlagsBits.ModerateMembers)
                );
                if (modRole) {
                    await channel.permissionOverwrites.edit(modRole, {
                        [channel.type === ChannelType.GuildVoice ? 'Connect' : 'SendMessages']: true,
                    });
                }
            }
            await LogsService.createLog(client, interaction.guild as Guild, interaction.member as GuildMember, member as GuildMember, isLocked ? Action.UNLOCK : Action.LOCK, `Le salon ${channel.name} a été ${isLocked ? 'déverrouillé' : 'verrouillé'} ${reason ? `pour la raison: ${reason}` : ''} par ${interaction.user.username}`);

            return interaction.reply({ 
                content: `Le salon ${channel} a été ${isLocked ? 'déverrouillé' : 'verrouillé'} ${reason ? `pour la raison: ${reason}` : ''}`,
                ephemeral: true 
            });
        } catch (error) {
            console.error('Erreur lors du verrouillage du salon:', error);
            return interaction.reply({ 
                content: 'Une erreur est survenue lors du verrouillage/déverrouillage du salon',
                ephemeral: true 
            });
        }
    }
}).toJSON();