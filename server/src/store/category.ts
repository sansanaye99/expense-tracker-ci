import { pool } from "../db.js";
import type { Category, NewCategory } from "../types/category.js";

type CategoryRow = {
	id: string;
	name: string;
};

function toCategory(row: CategoryRow): Category {
	return {
		id: row.id,
		name: row.name,
	};
}

export async function getCategories(): Promise<Category[]> {
	const result = await pool.query<CategoryRow>(
		"SELECT id, name FROM categories ORDER BY name",
	);

	return result.rows.map(toCategory);
}

export async function addCategory(newCategory: NewCategory): Promise<Category> {
	const result = await pool.query<CategoryRow>(
		"INSERT INTO categories (name) VALUES ($1) RETURNING id, name",
		[newCategory.name],
	);

	return toCategory(result.rows[0]);
}

export async function updateCategory(
	id: string,
	update: NewCategory,
): Promise<Category | null> {
	const result = await pool.query<CategoryRow>(
		"UPDATE categories SET name = $1 WHERE id = $2 RETURNING id, name",
		[update.name, id],
	);

	return result.rows[0] ? toCategory(result.rows[0]) : null;
}

export async function deleteCategory(id: string): Promise<boolean> {
	const result = await pool.query("DELETE FROM categories WHERE id = $1", [id]);

	return result.rowCount === 1;
}
