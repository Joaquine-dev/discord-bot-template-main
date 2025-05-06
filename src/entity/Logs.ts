
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Action {
  BAN = "ban",
  UNBAN = "unban",
  KICK = "kick",
  MUTE = "mute",
  UNMUTE = "unmute",
  DISCONNECT = "disconnect",
}

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "bigint" })
  guildId!: string;

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


