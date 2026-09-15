import type { Category, NewCategory } from "../types/category";

const API_URL = "http://localhost:3001/api/categories";

export async function fetchCategories(): Promise<Category[]> {
	const response = await fetch(API_URL);

	if (!response.ok) {
		throw new Error("Could not fetch categories");
	}

	return response.json();
}

export async function createCategory(
	newCategory: NewCategory,
): Promise<Category> {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newCategory),
	});

	if (!response.ok) {
		throw new Error("Could not create category");
	}

	return response.json();
}

export async function updateCategory(
	id: string,
	category: NewCategory,
): Promise<Category> {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(category),
	});

	if (!response.ok) {
		throw new Error("Could not update category");
	}

	return response.json();
}

export async function deleteCategory(id: string): Promise<void> {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Could not delete category");
	}
}
