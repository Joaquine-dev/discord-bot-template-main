import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746532523379 implements MigrationInterface {
    name = 'Init1746532523379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" ADD "channelWelcome" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" DROP COLUMN "channelWelcome"`);
    }

}
