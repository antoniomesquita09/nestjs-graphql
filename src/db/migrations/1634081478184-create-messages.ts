import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createMessages1634081478184 implements MigrationInterface {
  private messagesTable = new Table({
    name: 'messages',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'user_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'content',
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
  private foreignkey = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'users',
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.messagesTable);
    await queryRunner.createForeignKey('messages', this.foreignkey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.messagesTable);
  }
}
