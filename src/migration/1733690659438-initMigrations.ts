import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableColumn,
    TableForeignKey,
} from "typeorm"

export class InitMigrations1733690659438 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "question",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true, 
                        generationStrategy: "increment", 
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP", 
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true, 
                    },
                ],
            }),
            true,
        )

        await queryRunner.createIndex(
            "question",
            new TableIndex({
                name: "IDX_QUESTION_NAME",
                columnNames: ["name"],
            }),
        )

        await queryRunner.createTable(
            new Table({
                name: "answer",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true, 
                        generationStrategy: "increment", 
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP", 
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true, 
                    },
                ],
            }),
            true,
        )

        await queryRunner.addColumn(
            "answer",
            new TableColumn({
                name: "questionId",
                type: "int",
            }),
        )

        await queryRunner.createForeignKey(
            "answer",
            new TableForeignKey({
                columnNames: ["questionId"],
                referencedColumnNames: ["id"],
                referencedTableName: "question",
                onDelete: "CASCADE",
            }),
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("answer")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("questionId") !== -1,
        )
        await queryRunner.dropForeignKey("answer", foreignKey)
        await queryRunner.dropColumn("answer", "questionId")
        await queryRunner.dropTable("answer")
        await queryRunner.dropIndex("question", "IDX_QUESTION_NAME")
        await queryRunner.dropTable("question")
    }
}