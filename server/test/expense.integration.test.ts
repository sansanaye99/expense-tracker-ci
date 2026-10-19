import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { pool } from "../src/db.js";

const createdExpenseIds: string[] = [];

function uniqueDescription(label: string): string {
	return `${label}-${Date.now()}-${Math.random()}`;
}

describe("Expense API integration tests", () => {
	it("GET /api/expenses returns an array", async () => {
		const response = await request(app).get("/api/expenses");

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("POST /api/expenses creates an expense in app_test_db", async () => {
		const response = await request(app)
			.post("/api/expenses")
			.send({
				description: uniqueDescription("Lunch"),
				amount: 12.5,
				date: "2026-10-05",
			});

		expect(response.status).toBe(201);
		expect(response.body.id).toEqual(expect.any(String));
		expect(response.body.amount).toBe(12.5);

		createdExpenseIds.push(response.body.id);
	});

	it("POST /api/expenses rejects invalid data", async () => {
		const response = await request(app).post("/api/expenses").send({
			description: "Missing amount",
			date: "2026-10-05",
		});

		expect(response.status).toBe(400);
	});

	it("PUT /api/expenses/:id updates an expense", async () => {
		const created = await request(app)
			.post("/api/expenses")
			.send({
				description: uniqueDescription("Old"),
				amount: 5,
				date: "2026-10-05",
			});

		createdExpenseIds.push(created.body.id);

		const response = await request(app)
			.put(`/api/expenses/${created.body.id}`)
			.send({
				description: uniqueDescription("Updated"),
				amount: 9.5,
				date: "2026-10-06",
			});

		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({
			id: created.body.id,
			amount: 9.5,
			date: "2026-10-06",
		});
	});

	it("DELETE /api/expenses/:id removes an expense", async () => {
		const created = await request(app)
			.post("/api/expenses")
			.send({
				description: uniqueDescription("Delete"),
				amount: 1,
				date: "2026-10-05",
			});

		const response = await request(app).delete(
			`/api/expenses/${created.body.id}`,
		);

		expect(response.status).toBe(204);
	});
});

afterAll(async () => {
	for (const id of createdExpenseIds) {
		await pool.query("DELETE FROM expenses WHERE id = $1", [id]);
	}

	await pool.end();
});
