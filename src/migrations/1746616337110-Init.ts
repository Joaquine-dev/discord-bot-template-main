import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746616337110 implements MigrationInterface {
    name = 'Init1746616337110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "joinDate" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "joinDate"`);
    }

}
