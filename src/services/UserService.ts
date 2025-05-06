import { User } from "@entity/User";
import { GuildMember } from "discord.js";


export class UserService {

  static async createUserIfNotExists(client: any, member: GuildMember) {
    const userRepository = client.database.getClient().getRepository(User);
    let user = await userRepository.findOne({ where: { discordId: member.id } });
    if (!user) {
      user = userRepository.create({ discordId: member.id, username: member.user.username });
      await userRepository.save(user);
    }
    return user;
  }
  static async getUserById(client: any, userId: string, guildId: string) {
    const userRepository = client.database.getClient().getRepository(User);
    return await userRepository.findOne({ where: { discordId: userId, guildId: guildId } });
  }
  

}
