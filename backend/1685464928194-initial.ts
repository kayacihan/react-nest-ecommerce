import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1685464928194 implements MigrationInterface {
    name = 'initial1685464928194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "productId" uuid, CONSTRAINT "REL_201d54a73cc85b302b9d5ac927" UNIQUE ("productId"), CONSTRAINT "PK_75d0abfd06b38a8592b662a6703" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "price" numeric(8,2) NOT NULL, "photo" character varying NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_products_entity" ("orderId" uuid NOT NULL, "productId" uuid NOT NULL, "quantity" integer NOT NULL, "price" numeric(8,2) NOT NULL, CONSTRAINT "PK_890b95e8840b941b6c5c3e6beb9" PRIMARY KEY ("orderId", "productId"))`);
        await queryRunner.query(`CREATE TABLE "order_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying(50) NOT NULL, "price" numeric(8,2) NOT NULL, "date" character varying(25) NOT NULL, "status" character varying(50) NOT NULL, "user_id" integer NOT NULL, "userId" integer, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" character varying NOT NULL DEFAULT false, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock_entity" ADD CONSTRAINT "FK_201d54a73cc85b302b9d5ac9276" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_products_entity" ADD CONSTRAINT "FK_cf526db36bc7d751e03371c6336" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_products_entity" ADD CONSTRAINT "FK_82aaadea7a0c0322b2f898f57b4" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`);
        await queryRunner.query(`ALTER TABLE "orders_products_entity" DROP CONSTRAINT "FK_82aaadea7a0c0322b2f898f57b4"`);
        await queryRunner.query(`ALTER TABLE "orders_products_entity" DROP CONSTRAINT "FK_cf526db36bc7d751e03371c6336"`);
        await queryRunner.query(`ALTER TABLE "stock_entity" DROP CONSTRAINT "FK_201d54a73cc85b302b9d5ac9276"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "order_entity"`);
        await queryRunner.query(`DROP TABLE "orders_products_entity"`);
        await queryRunner.query(`DROP TABLE "product_entity"`);
        await queryRunner.query(`DROP TABLE "stock_entity"`);
    }

}
