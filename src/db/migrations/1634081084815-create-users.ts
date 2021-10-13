import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1634081084815 implements MigrationInterface {
  private usersTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestampz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestampz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.usersTable);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.usersTable);
  }
}
