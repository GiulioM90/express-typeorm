import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "express_orm",
    synchronize: true, // to disable in prod
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [], 
  });