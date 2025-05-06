import { GuildMember, PermissionFlagsBits,  } from "discord.js";


export async function canReceiveDM(member: GuildMember): Promise<boolean> {
    try {
      await member.createDM();
      return true;
    } catch (error) {
      console.error(`Impossible de créer un canal DM pour ${member.user.tag}:`, error);
      return false;
    }
}