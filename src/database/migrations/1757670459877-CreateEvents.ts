import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEvents1757670459877 implements MigrationInterface {
    name = 'CreateEvents1757670459877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "timeStart" TIMESTAMP NOT NULL, "timeEnd" TIMESTAMP NOT NULL, "venue" character varying, "location" character varying NOT NULL, "status" "public"."events_status_enum" NOT NULL DEFAULT 'upcoming', "type" "public"."events_type_enum" NOT NULL DEFAULT 'offline', "capacity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(
          `ALTER TABLE "events" DROP COLUMN "description"`,
        );
        await queryRunner.query(`ALTER TABLE "events" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "venue"`);
        await queryRunner.query(
          `ALTER TABLE "events" ADD "venue" character varying(255)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "venue"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "venue" character varying`,);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "description"`,);
        await queryRunner.query(`ALTER TABLE "events" ADD "description" character varying`,);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
