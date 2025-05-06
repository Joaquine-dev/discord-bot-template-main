import DiscordBot from "@client/DiscordBot";
import Event from "@structure/Event";
import { Events, GuildMember, PartialGuildMember } from "discord.js";

export default new Event({
    event: Events.GuildMemberRemove,
    run: async (client: DiscordBot, member: GuildMember | PartialGuildMember) => {
        // TODO: Implémenter la logique de l'événement
    }
}).toJSON();


