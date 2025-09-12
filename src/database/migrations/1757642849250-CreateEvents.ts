import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEvents1757642849250 implements MigrationInterface {
    name = 'CreateEvents1757642849250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "public"."events_type_enum" AS ENUM('online', 'offline', 'hybrid')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "date" date NOT NULL, "timeStart" TIME NOT NULL, "timeEnd" TIME NOT NULL, "venue" character varying, "location" character varying NOT NULL, "status" "public"."events_status_enum" NOT NULL DEFAULT 'upcoming', "type" "public"."events_type_enum" NOT NULL DEFAULT 'offline', "capacity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
    }

}
