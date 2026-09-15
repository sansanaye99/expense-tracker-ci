import { useState } from "react";
import type { NewCategory } from "../types/category";

type CategoryFormProps = {
	onAddCategory: (category: NewCategory) => Promise<void>;
};

export function CategoryForm({ onAddCategory }: CategoryFormProps) {
	const [name, setName] = useState("");

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const trimmedName = name.trim();

		if (!trimmedName) {
			return;
		}

		await onAddCategory({ name: trimmedName });
		setName("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="category-name">Category name</label>
			<input
				id="category-name"
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
			<button type="submit">Add category</button>
		</form>
	);
}
