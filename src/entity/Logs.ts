
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Guilds } from "./Guilds";

export enum Action {
  BAN = "ban",
  UNBAN = "unban",
  KICK = "kick",
  MUTE = "mute",
  UNMUTE = "unmute",
  DISCONNECT = "disconnect",
  LOCK = "lock",
  UNLOCK = "unlock",
}

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "bigint" })
  guildId!: string;

  @ManyToOne(() => Guilds, { onDelete: "CASCADE" })
  @JoinColumn({ name: "guildId", referencedColumnName: "guildId" })
  guild!: Guilds;

  @Column({ type: "bigint" })
  executorId!: string;

  @Column({ type: "bigint" })
  targetId!: string;

  @Column({ type: "enum", enum: Action })
  action!: Action;

  @Column({ type: "varchar" })
  description!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;


  
}


