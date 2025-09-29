import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumOfUserTableEventTableAttendanceTable1759129443115 implements MigrationInterface {
    name = 'ChangeColumOfUserTableEventTableAttendanceTable1759129443115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_5e20bdbc6b72f0da23eb2ff1b60"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_7a932ab45da20b26714bf463831"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "UQ_53702aede8810d27769afda7705"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "timeStart"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "timeEnd"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "eventId"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "registeredAt"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "cancelledAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" ADD "time_start" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD "time_end" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "event_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "registered_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "cancelled_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "key_cloak_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_eda3bfb3d124aeedfe5f10643bf" UNIQUE ("key_cloak_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "picture" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" "public"."users_gender_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('GUEST', 'USER', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthday" date`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "PK_40731c7151fe4be3116e45ddf73"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "UQ_97889faf26bc2db46bfe95f825e" UNIQUE ("user_id", "event_id")`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_aa902e05aeb5fde7c1dd4ced2b7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_c162246e3ed30830a054231629f" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_c162246e3ed30830a054231629f"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_aa902e05aeb5fde7c1dd4ced2b7"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "UQ_97889faf26bc2db46bfe95f825e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "PK_483ed97cd4cd43ab4a117516b69" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "PK_40731c7151fe4be3116e45ddf73"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_eda3bfb3d124aeedfe5f10643bf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "key_cloak_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "cancelled_at"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "registered_at"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "event_id"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "attendances" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "time_end"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "time_start"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "cancelledAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "registeredAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "eventId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "events" ADD "timeEnd" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD "timeStart" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "UQ_53702aede8810d27769afda7705" UNIQUE ("userId", "eventId")`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_7a932ab45da20b26714bf463831" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendances" ADD CONSTRAINT "FK_5e20bdbc6b72f0da23eb2ff1b60" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
