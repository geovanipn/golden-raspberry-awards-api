import dotenv from "dotenv";
dotenv.config();

import SqliteDataBase from "../infra/database/sqlite";
import env from "./config/env";

async function serve() {
    SqliteDataBase.initialize()
        .then(async () => {
            console.log("\nSqlite database initialized!");
            await SqliteDataBase.runMigrations();

            const app = (await import('./config/app')).default;
            app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
        })
        .catch(console.error);
}

serve().then();
