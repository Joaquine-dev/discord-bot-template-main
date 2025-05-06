import { UserService } from "@/services/UserService";
import DiscordBot from "@client/DiscordBot";
import Event from "@structure/Event";
import { Events, GuildMember, PartialGuildMember } from "discord.js";

export default new Event({
    event: Events.GuildMemberRemove,
    run: async (client: DiscordBot, member: GuildMember | PartialGuildMember) => {
        await UserService.deleteUserByGuildId(client, member.guild.id, member.id);
    }
}).toJSON();


