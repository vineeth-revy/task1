import {MigrationInterface, QueryRunner} from "typeorm";

export class EntityRelation1603296572987 implements MigrationInterface {
    name = 'EntityRelation1603296572987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "system_roles_entity" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7eb8642aa17a5aa48b90b70977d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "permissions" jsonb NOT NULL, "roleId" integer, CONSTRAINT "REL_39bf7e8af8fe54d9d1c7a8efe6" UNIQUE ("roleId"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "system_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_626299616c83a01c0e55d66b413" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_39bf7e8af8fe54d9d1c7a8efe6f" FOREIGN KEY ("roleId") REFERENCES "system_roles_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_39bf7e8af8fe54d9d1c7a8efe6f"`);
        await queryRunner.query(`DROP TABLE "system_entity"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "system_roles_entity"`);
    }

}
