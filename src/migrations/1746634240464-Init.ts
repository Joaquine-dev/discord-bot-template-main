import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746634240464 implements MigrationInterface {
    name = 'Init1746634240464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."logs_action_enum" RENAME TO "logs_action_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."logs_action_enum" AS ENUM('ban', 'unban', 'kick', 'mute', 'unmute', 'disconnect', 'lock', 'unlock')`);
        await queryRunner.query(`ALTER TABLE "logs" ALTER COLUMN "action" TYPE "public"."logs_action_enum" USING "action"::"text"::"public"."logs_action_enum"`);
        await queryRunner.query(`DROP TYPE "public"."logs_action_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."logs_action_enum_old" AS ENUM('ban', 'unban', 'kick', 'mute', 'unmute', 'disconnect')`);
        await queryRunner.query(`ALTER TABLE "logs" ALTER COLUMN "action" TYPE "public"."logs_action_enum_old" USING "action"::"text"::"public"."logs_action_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."logs_action_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."logs_action_enum_old" RENAME TO "logs_action_enum"`);
    }

}
