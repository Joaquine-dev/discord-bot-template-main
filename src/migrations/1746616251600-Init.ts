import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746616251600 implements MigrationInterface {
    name = 'Init1746616251600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."logs_action_enum" AS ENUM('ban', 'unban', 'kick', 'mute', 'unmute', 'disconnect')`);
        await queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "guildId" bigint NOT NULL, "executorId" bigint NOT NULL, "targetId" bigint NOT NULL, "action" "public"."logs_action_enum" NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guilds" ("id" SERIAL NOT NULL, "guildId" bigint NOT NULL, "name" character varying NOT NULL, "channelWelcome" bigint, "categoryChannelGenerator" bigint, "channelGenerator" bigint, CONSTRAINT "UQ_0699c7df346fa7be967e7eebd51" UNIQUE ("guildId"), CONSTRAINT "UQ_0699c7df346fa7be967e7eebd51" UNIQUE ("guildId"), CONSTRAINT "PK_e7e7f2a51bd6d96a9ac2aa560f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "discordId" bigint NOT NULL, "guildId" bigint NOT NULL, "username" character varying NOT NULL, "nickname" character varying NOT NULL, CONSTRAINT "UQ_13af5754f14d8d255fd9b3ee5c7" UNIQUE ("discordId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_d14b8725a0c3ac6359652f8edfc" FOREIGN KEY ("guildId") REFERENCES "guilds"("guildId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_d14b8725a0c3ac6359652f8edfc"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "guilds"`);
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TYPE "public"."logs_action_enum"`);
    }

}
