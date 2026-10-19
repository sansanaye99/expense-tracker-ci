import { Pool } from "pg";

export const pool = new Pool({
	host: process.env.PGHOST ?? process.env.DB_HOST ?? "localhost",
	port: Number(process.env.PGPORT ?? process.env.DB_PORT ?? 5432),
	user: process.env.PGUSER ?? process.env.DB_USER ?? "app",
	password: process.env.PGPASSWORD ?? process.env.DB_PASSWORD ?? "app_pw",
	database: process.env.PGDATABASE ?? process.env.DB_NAME ?? "app_db",
});
