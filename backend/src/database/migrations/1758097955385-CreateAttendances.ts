import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAttendances1758097955385 implements MigrationInterface {
    name = 'CreateAttendances1758097955385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."attendances_status_enum" AS ENUM('registered', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "attendances" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "eventId" integer NOT NULL, "registeredAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."attendances_status_enum" NOT NULL DEFAULT 'registered', "cancelledAt" TIMESTAMP, CONSTRAINT "UQ_53702aede8810d27769afda7705" UNIQUE ("userId", "eventId"), CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_5e20bdbc6b72f0da23eb2ff1b60" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_7a932ab45da20b26714bf463831" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_7a932ab45da20b26714bf463831"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_5e20bdbc6b72f0da23eb2ff1b60"`);
        await queryRunner.query(`DROP TABLE "attendances"`);
        await queryRunner.query(`DROP TYPE "public"."attendances_status_enum"`);
    }

}
