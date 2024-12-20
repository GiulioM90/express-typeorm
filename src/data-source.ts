import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User";
import { Question } from "./entity/Question";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "express_orm",
    synchronize: false, // to disable in prod
    logging: true,
    entities:  [User, Question],
    migrations: ["build/migration/*.js"],
    migrationsTableName: "custom_migration_table", // specify if you need a name different from 'migrations'
    subscribers: [], 
});