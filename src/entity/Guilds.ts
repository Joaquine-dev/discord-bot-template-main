import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Guilds {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "bigint" })
  guildId!: string;

  
  @Column({ type: "varchar" })
  name!: string;

  
  @Column({ type: "bigint", nullable: true })
  channelWelcome!: string;

  @Column({ type: "bigint", nullable: true })
  categoryChannelGenerator!: string;


  @Column({ type: "bigint", nullable: true })
  channelGenerator!: string;




}
