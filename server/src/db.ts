import { Pool } from "pg";

export const pool = new Pool({
	host: process.env.DB_HOST ?? "localhost",
	port: Number(process.env.DB_PORT ?? 5432),
	user: process.env.DB_USER ?? "app",
	password: process.env.DB_PASSWORD ?? "app_pw",
	database: process.env.DB_NAME ?? "app_db",
});
