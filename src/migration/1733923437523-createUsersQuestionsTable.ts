import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersQuestionsTable1733923437523 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'users_questions',
            columns: [
              {
                name: 'user_id',
                type: 'int',
                isNullable: false,
              },
              {
                name: 'question_id',
                type: 'int',
                isNullable: false,
              },
            ],
            indices: [
              {
                name: 'IDX_USERS_QUESTIONS',
                columnNames: ['user_id', 'question_id'],
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_questions');
      }

}
