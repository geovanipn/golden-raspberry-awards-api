import env from "../../main/config/env";
import { DataSource } from "typeorm"
import { LoadMovies1741029478264 } from "../migrations/1741029478264-load-movies";
import {join} from "path";

const isProductionMode = env.environment === "production";

const SqliteDataBase = new DataSource({
    type: 'sqlite',
    database: isProductionMode ? 'database.sqlite' : ':memory:',
    dropSchema: !isProductionMode,
    synchronize: true,
    logging: false,
    entities: [join(__dirname,  '../../domain/**/*.entity{.ts,.js}')],
    migrations: [LoadMovies1741029478264]
});

export default SqliteDataBase;