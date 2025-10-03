import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnGoogleEventIdToEventTable1759294466220 implements MigrationInterface {
    name = 'AddColumnGoogleEventIdToEventTable1759294466220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "google_event_id" character varying(255)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_67ac58b1a00f28484c045f3680" ON "events" ("google_event_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_67ac58b1a00f28484c045f3680"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "google_event_id"`);
    }

}
