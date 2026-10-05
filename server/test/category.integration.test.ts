import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { pool } from "../src/db.js";

const createdCategoryIds: string[] = [];

function uniqueName(label: string): string {
  return `${label}-${Date.now()}-${Math.random()}`;
}

describe("Category API integration tests", () => {
  it("GET /api/categories returns an array", async () => {
    const response = await request(app).get("/api/categories");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /api/categories creates a category in app_test_db", async () => {
    const name = uniqueName("Food");

    const response = await request(app)
      .post("/api/categories")
      .send({ name });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ name });
    expect(response.body.id).toEqual(expect.any(String));

    createdCategoryIds.push(response.body.id);
  });

  it("PUT /api/categories/:id updates a category", async () => {
    const created = await request(app)
      .post("/api/categories")
      .send({ name: uniqueName("Old") });

    createdCategoryIds.push(created.body.id);

    const newName = uniqueName("New");
    const response = await request(app)
      .put(`/api/categories/${created.body.id}`)
      .send({ name: newName });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: created.body.id,
      name: newName,
    });
  });

  it("DELETE /api/categories/:id removes a category", async () => {
    const created = await request(app)
      .post("/api/categories")
      .send({ name: uniqueName("Delete") });

    const response = await request(app).delete(
      `/api/categories/${created.body.id}`,
    );

    expect(response.status).toBe(204);
  });
});

afterAll(async () => {
  for (const id of createdCategoryIds) {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  }
});
