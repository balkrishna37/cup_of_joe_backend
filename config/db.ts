import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";
import { Token } from "../entity/token.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: `${process.env.DB_HOST}`,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    logging: false,
    entities: [
        __dirname + "../entity/*.{js,ts}",
        User,
        Token
    ],
    subscribers: [],
    migrations: [],
    synchronize: true,
    connectorPackage: "mysql2",
    charset: "utf8mb4_unicode_ci",
});
