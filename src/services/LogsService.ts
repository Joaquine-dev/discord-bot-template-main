


import { Logs } from "@/entity/Logs";
import { Action } from "@/entity/Logs";
import { Guild, GuildMember } from "discord.js";


export class LogsService {

  static async createLog(client: any, guild: Guild, executor: GuildMember, target: GuildMember, action: Action, description: string) {
    const logsRepository = client.database.getClient().getRepository(Logs);
    const log = logsRepository.create({ guildId: guild.id, executorId: executor.id, targetId: target.id, action: action, description: description });
    await logsRepository.save(log);
  }




  
}
