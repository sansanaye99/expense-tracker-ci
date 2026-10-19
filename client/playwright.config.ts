import { defineConfig } from "@playwright/test";

const externalBaseURL = process.env.E2E_BASE_URL;

export default defineConfig({
	testDir: "./e2e",
	timeout: 30_000,
	use: {
		baseURL: externalBaseURL ?? "http://127.0.0.1:5173",
		trace: "on-first-retry",
	},
	webServer: externalBaseURL
		? undefined
		: [
				{
					command: "npm --prefix ../server run dev",
					url: "http://127.0.0.1:3001/api/expenses",
					reuseExistingServer: true,
					timeout: 30_000,
				},
				{
					command: "npm run dev -- --host 127.0.0.1",
					url: "http://127.0.0.1:5173",
					reuseExistingServer: true,
					timeout: 30_000,
				},
			],
});
