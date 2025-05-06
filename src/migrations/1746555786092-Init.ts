import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746555786092 implements MigrationInterface {
    name = 'Init1746555786092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" ADD "categoryChannelGenerator" bigint`);
        await queryRunner.query(`ALTER TABLE "guilds" ADD "channelGenerator" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" DROP COLUMN "channelGenerator"`);
        await queryRunner.query(`ALTER TABLE "guilds" DROP COLUMN "categoryChannelGenerator"`);
    }

}
