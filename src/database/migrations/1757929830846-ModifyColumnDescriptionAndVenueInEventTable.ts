import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyColumnDescriptionAndVenueInEventTable1757929830846 implements MigrationInterface {
    name = 'ModifyColumnDescriptionAndVenueInEventTable1757929830846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "venue"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "venue" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "venue"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "venue" character varying`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "description" character varying`);
    }

}
