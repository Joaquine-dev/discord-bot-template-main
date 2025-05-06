import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, type: "bigint" })
  discordId!: string;

  @Column({ type: "varchar" })
  username!: string;

  @Column({ default: 0 , type: "bigint"})
  xp!: number;

  @Column({ default: 0 , type: "bigint"})
  level!: number;
}
