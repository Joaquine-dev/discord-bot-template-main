import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746547880232 implements MigrationInterface {
    name = 'Init1746547880232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "discordId" bigint NOT NULL, "guildId" bigint NOT NULL, "username" character varying NOT NULL, "nickname" character varying NOT NULL, "xp" bigint NOT NULL DEFAULT '0', "level" bigint NOT NULL DEFAULT '0', CONSTRAINT "UQ_13af5754f14d8d255fd9b3ee5c7" UNIQUE ("discordId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guilds" ("id" SERIAL NOT NULL, "guildId" bigint NOT NULL, "name" character varying NOT NULL, "channelWelcome" bigint, CONSTRAINT "PK_e7e7f2a51bd6d96a9ac2aa560f9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "guilds"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
