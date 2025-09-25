import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1758790155633 implements MigrationInterface {
    name = 'InitDB1758790155633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled')`);
        await queryRunner.query(`CREATE TYPE "public"."events_type_enum" AS ENUM('online', 'offline', 'hybrid')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text, "time_start" TIMESTAMP NOT NULL, "time_end" TIMESTAMP NOT NULL, "venue" character varying(255), "location" character varying NOT NULL, "status" "public"."events_status_enum" NOT NULL DEFAULT 'upcoming', "type" "public"."events_type_enum" NOT NULL DEFAULT 'offline', "capacity" integer NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."attendances_status_enum" AS ENUM('registered', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "attendances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "event_id" uuid NOT NULL, "registered_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."attendances_status_enum" NOT NULL DEFAULT 'registered', "cancelled_at" TIMESTAMP, CONSTRAINT "UQ_97889faf26bc2db46bfe95f825e" UNIQUE ("user_id", "event_id"), CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('GUEST', 'USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "key_cloak_id" character varying, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "picture" character varying, "email" character varying NOT NULL, "gender" "public"."users_gender_enum", "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "birthday" date, "phone_number" character varying, CONSTRAINT "UQ_eda3bfb3d124aeedfe5f10643bf" UNIQUE ("key_cloak_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_aa902e05aeb5fde7c1dd4ced2b7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_c162246e3ed30830a054231629f" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_c162246e3ed30830a054231629f"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_aa902e05aeb5fde7c1dd4ced2b7"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`DROP TABLE "attendances"`);
        await queryRunner.query(`DROP TYPE "public"."attendances_status_enum"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
    }

}
