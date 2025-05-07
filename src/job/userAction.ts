import config from "@/config/config";
import { GuildMember, PermissionFlagsBits, PermissionsBitField } from "discord.js";


export async function canReceiveDM(member: GuildMember): Promise<boolean> {
    try {
      await member.createDM();
      return true;
    } catch (error) {
      console.error(`Impossible de créer un canal DM pour ${member.user.tag}:`, error);
      return false;
    }
}

export async function canAction(executor: GuildMember, target: GuildMember, permission: PermissionsBitField): Promise<boolean> {
  if (target.permissions.has(PermissionFlagsBits.Administrator)) return false;
  if (executor.permissions.has(PermissionFlagsBits.Administrator)) return true; 
  if (executor.permissions.has(permission)) return true;
  if (executor.id == config.users.ownerId) return true;
  if (executor.id === target.id) return false;
  if (executor.roles.highest.position >= target.roles.highest.position) return false;
  return true;
}