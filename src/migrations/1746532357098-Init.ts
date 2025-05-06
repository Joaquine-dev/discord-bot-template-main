import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746532357098 implements MigrationInterface {
    name = 'Init1746532357098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" ADD "guildId" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" DROP COLUMN "guildId"`);
    }

}
