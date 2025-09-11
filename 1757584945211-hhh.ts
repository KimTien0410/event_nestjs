import { MigrationInterface, QueryRunner } from "typeorm";

export class Hhh1757584945211 implements MigrationInterface {
    name = 'Hhh1757584945211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isDeleted" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isDeleted"`);
    }

}
