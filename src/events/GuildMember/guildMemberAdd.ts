import { UserService } from "@/services/UserService";
import DiscordBot from "@client/DiscordBot";
import Event from "@structure/Event";

import { Events, GuildMember } from "discord.js";

export default new Event({
    event: Events.GuildMemberAdd,
    run: async (client: DiscordBot, member: GuildMember) => { 
        await UserService.createUserIfNotExists(client, member);
    }
}).toJSON();


