import { User } from "@entity/User";
import { GuildMember } from "discord.js";


export class UserService {

  static async createUserIfNotExists(client: any, member: GuildMember) {
    const userRepository = client.database.getClient().getRepository(User);
    let user = await userRepository.findOne({ 
      where: { 
        discordId: member.id, 
        guildId: member.guild.id 
      }
    });
    
    if (!user) {
      user = userRepository.create({
        discordId: member.id,
        username: member.user.username,
        nickname: member.nickname || member.user.username,
        guildId: member.guild.id
      });
      await userRepository.save(user);
    }
    return user;
  }
  static async getUserById(client: any, userId: string, guildId: string) {
    const userRepository = client.database.getClient().getRepository(User);
    return await userRepository.findOne({ 
      where: { 
        discordId: userId, 
        guildId: guildId 
      },
      select: ["id", "discordId", "username", "nickname", "xp", "level"]
    });
  }
  static async updateUser(client: any, userId: string, guildId: string, data: any) {
    const userRepository = client.database.getClient().getRepository(User);
    const user = await userRepository.findOne({ 
      where: { 
        discordId: userId, 
        guildId: guildId 
      }
    });
    
    if (user) {
      Object.assign(user, data);
      await userRepository.save(user);
    }
    return user;
  }
  static async deleteUserByGuildId(client: any, guildId: string, clientId: string) {
    const userRepository = client.database.getClient().getRepository(User);
    await userRepository.delete({ 
      guildId: guildId, 
      discordId: clientId 
    });
    return true;
  }
  

}
