import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { Logs } from "./Logs";

@Entity()
@Unique(["guildId"])
export class Guilds {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "bigint", unique: true })
  guildId!: string;

  
  @Column({ type: "varchar" })
  name!: string;

  
  @Column({ type: "bigint", nullable: true })
  channelWelcome!: string;

  @Column({ type: "bigint", nullable: true })
  categoryChannelGenerator!: string;


  @Column({ type: "bigint", nullable: true })
  channelGenerator!: string;


  @OneToMany(() => Logs, logs => logs.guild)
  logs!: Logs[];



}
