import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746548875767 implements MigrationInterface {
    name = 'Init1746548875767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."logs_action_enum" AS ENUM('ban', 'unban', 'kick', 'mute', 'unmute', 'disconnect')`);
        await queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "guildId" bigint NOT NULL, "userId" bigint NOT NULL, "action" "public"."logs_action_enum" NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TYPE "public"."logs_action_enum"`);
    }

}
