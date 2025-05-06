import { UserService } from "@/services/UserService";
import DiscordBot from "@client/DiscordBot";
import Event from "@structure/Event";

import { Events, GuildMember, PartialGuildMember } from "discord.js";

export default new Event({
    event: Events.GuildMemberUpdate,
    run: async (client: DiscordBot, oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => { 
        if (oldMember.nickname !== newMember.nickname) {
            await UserService.updateUser(client, newMember.id, newMember.guild.id, {
                nickname: newMember.nickname || newMember.user.username
            });
        }
    }
}).toJSON();



