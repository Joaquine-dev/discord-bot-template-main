import { Guilds } from "@/entity/Guilds";
import { Guild } from "discord.js";


export class GuildService {

  static async createGuildIfNotExist(client: any, guild: Guild) {
    const guildRepository = client.database.getClient().getRepository(Guilds);
    let guildData = await guildRepository.findOne({ where: { guildId: guild.id } });
    if (!guildData) {
      guildData = guildRepository.create({ guildId: guild.id, name: guild.name });
      await guildRepository.save(guildData);
    }
    return guildData; 
  }
  static async getGuildById(client: any, guildId: string) {
    const guildRepository = client.database.getClient().getRepository(Guilds);
    return await guildRepository.findOne({ where: { guildId } });
  }

  static async updateGuild(client: any, guildId: string, data: Partial<Guilds>) {
    const guildRepository = client.database.getClient().getRepository(Guilds);
    const guild = await guildRepository.findOne({ where: { guildId } });
    if (guild) {
      Object.assign(guild, data);
      await guildRepository.save(guild);
    }
  }


  
}
