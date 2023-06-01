import { MigrationInterface, QueryRunner } from 'typeorm';

export class seed1685493233784 implements MigrationInterface {
  name = 'seed1685493233784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user_entity(email, username, password, is_admin) VALUES ('admin@admin.com', 'admin', '$2b$10$QaJWQHP9HALT/PhBDfJfBe3vJxKXQgXCYfX/xeM95xGjfplAJ1sza', 'true')`,
    );
    await queryRunner.query(
      `INSERT INTO user_entity(email, username, password, is_admin) VALUES ('user@user.com', 'user', '$2b$10$42p0sk0vI.lvXqfM6NrLbuqHxPU3pAukjw6rq4C7QYIUX.9OHStmC', 'false')`,
    );
    await queryRunner.query(
      `INSERT INTO user_entity(email, username, password, is_admin) VALUES ('cihan@cihan.com', 'cihan', '$2b$10$HavKsLk80rDRI.LOBQYeAeAGs1wbjy6CkWNZWIrU8EvgmXTiznppa', 'true')`,
    );
  }

  public async down(): Promise<void> {}
}
