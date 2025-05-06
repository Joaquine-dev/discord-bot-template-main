import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746549203863 implements MigrationInterface {
    name = 'Init1746549203863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "executorId" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "targetId" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "targetId"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "executorId"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "userId" bigint NOT NULL`);
    }

}
