import { GuildService } from "@/services/GuildService";
import { UserService } from "@services/UserService";
import Event from "@structure/Event";
import { success, info, error as errorConsole } from "@utils/console";
import { Events, Guild, GuildMember } from "discord.js";

export default new Event({
  event: Events.ClientReady,
  once: true,
  run: async (client) => {
    if (!client.database.getClient().isInitialized) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    client.guilds.cache.forEach(async (guild: Guild) => {
      await GuildService.createGuildIfNotExist(client, guild);
      guild.members.cache.forEach(async (member: GuildMember) => {
        try {
          await UserService.createUserIfNotExists(client, member);
        } catch (error: any) {
          errorConsole(`Erreur lors de la création/récupération de l'utilisateur ${member.user.username}:`, error);
        }
      });
    });
  },
}).toJSON();
