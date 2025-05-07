import { Action } from "@/entity/Logs";
import { GuildService } from "@/services/GuildService";
import { LogsService } from "@/services/LogsService";
import DiscordBot from "@client/DiscordBot";
import Event from "@structure/Event";
import {
    Events,
    GuildMember,
    VoiceState,
    ChannelType,
    PermissionsBitField,
    VoiceChannel
} from "discord.js";



export default new Event({
    event: Events.VoiceStateUpdate,
    run: async (client: DiscordBot, oldState: VoiceState, newState: VoiceState) => {
      const guild = newState.guild;
      const member = newState.member as GuildMember;
      
        const guildData = await GuildService.getGuildById(client, guild.id);
        if (!guildData) return;

        const channelGenerator = guildData.channelGenerator;
        if (!channelGenerator) return;

        if (newState.channelId === channelGenerator && oldState.channelId !== channelGenerator) {
          let name = `Channel de ${member.user.username}`;
          const channel = await guild.channels.create({
              name: name,
              type: ChannelType.GuildVoice,
              parent: guildData.categoryChannelGenerator,
              permissionOverwrites: [
                  {
                      id: member.id,
                      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak, PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.ManageChannels],
                  },
                  {
                      id: guild.roles.everyone.id,
                      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak],
                  },
              ],
          }).then((channel: VoiceChannel) => {
              member.voice.setChannel(channel);
          });
      }
      if (oldState.channel && oldState.channel.members.size === 0 && oldState.channelId !== channelGenerator) {
        oldState.channel.delete();
      }

        if (oldState.channel && oldState.channelId !== channelGenerator) {
          
            if (oldState.channel.members.size === 0) {
                if (oldState.channel.parentId === newState.channel?.parentId) {
                    await oldState.channel.delete();
                }
            }
        }
    },
}).toJSON();   
