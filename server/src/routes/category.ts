import { Router } from "express";
import {
	addCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "../store/category.js";
import type { NewCategory } from "../types/category.js";

export function parseNewCategory(body: unknown): NewCategory | null {
	if (
		typeof body !== "object" ||
		body === null ||
		!("name" in body) ||
		typeof body.name !== "string"
	) {
		return null;
	}

	return { name: body.name };
}

export const categoryRouter = Router();

categoryRouter.get("/", async (_req, res) => {
	res.json(await getCategories());
});

categoryRouter.post("/", async (req, res) => {
	const category = parseNewCategory(req.body);

	if (!category) {
		res.status(400).json({ error: "name is required" });
		return;
	}

	res.status(201).json(await addCategory(category));
});

categoryRouter.put("/:id", async (req, res) => {
	const category = parseNewCategory(req.body);

	if (!category) {
		res.status(400).json({ error: "name is required" });
		return;
	}

	const updated = await updateCategory(req.params.id, category);

	if (!updated) {
		res.status(404).json({ error: "Category not found" });
		return;
	}

	res.json(updated);
});

categoryRouter.delete("/:id", async (req, res) => {
	const deleted = await deleteCategory(req.params.id);

	if (!deleted) {
		res.status(404).json({ error: "Category not found" });
		return;
	}

	res.status(204).send();
});
