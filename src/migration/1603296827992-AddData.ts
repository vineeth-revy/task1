import {MigrationInterface, QueryRunner} from "typeorm";

export class AddData1603296827992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO system_entity (name) VALUES ('Catlog')");
        queryRunner.query("INSERT INTO system_entity (name) VALUES ('Facet')");
        queryRunner.query("INSERT INTO system_entity (name) VALUES ('Setting')");
        queryRunner.query("INSERT INTO system_entity (name) VALUES ('Customer')");
        queryRunner.query("INSERT INTO system_entity (name) VALUES ('Order')");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DELETE FROM system_entity");
    }

}
