import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746532707361 implements MigrationInterface {
    name = 'Init1746532707361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" ALTER COLUMN "channelWelcome" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" ALTER COLUMN "channelWelcome" SET NOT NULL`);
    }

}
