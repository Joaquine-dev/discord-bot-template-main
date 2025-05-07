import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746615249513 implements MigrationInterface {
    name = 'Init1746615249513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guilds" ADD CONSTRAINT "UQ_0699c7df346fa7be967e7eebd51" UNIQUE ("guildId")`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_d14b8725a0c3ac6359652f8edfc" FOREIGN KEY ("guildId") REFERENCES "guilds"("guildId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_d14b8725a0c3ac6359652f8edfc"`);
        await queryRunner.query(`ALTER TABLE "guilds" DROP CONSTRAINT "UQ_0699c7df346fa7be967e7eebd51"`);
    }

}
