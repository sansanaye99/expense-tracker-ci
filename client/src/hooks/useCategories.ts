import { useCallback, useEffect, useState } from "react";
import {
	createCategory,
	deleteCategory,
	fetchCategories,
	updateCategory,
} from "../api/categories";
import type { Category, NewCategory } from "../types/category";

export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadCategories = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			setCategories(await fetchCategories());
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "Could not load categories",
			);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadCategories();
	}, [loadCategories]);

	async function addCategory(newCategory: NewCategory) {
		const category = await createCategory(newCategory);
		setCategories((current) => [...current, category]);
	}

	async function editCategory(id: string, category: NewCategory) {
		const updated = await updateCategory(id, category);
		setCategories((current) =>
			current.map((item) => (item.id === id ? updated : item)),
		);
	}

	async function removeCategory(id: string) {
		await deleteCategory(id);
		setCategories((current) => current.filter((item) => item.id !== id));
	}

	return {
		categories,
		isLoading,
		error,
		addCategory,
		editCategory,
		removeCategory,
	};
}