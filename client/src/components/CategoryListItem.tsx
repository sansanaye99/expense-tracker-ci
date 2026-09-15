import { useState } from "react";
import type { Category, NewCategory } from "../types/category";

type CategoryListItemProps = {
	category: Category;
	onEditCategory: (id: string, category: NewCategory) => Promise<void>;
	onRemoveCategory: (id: string) => Promise<void>;
};

export function CategoryListItem({
	category,
	onEditCategory,
	onRemoveCategory,
}: CategoryListItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(category.name);

	async function saveEdit() {
		const trimmedName = name.trim();

		if (!trimmedName) {
			return;
		}

		await onEditCategory(category.id, { name: trimmedName });
		setIsEditing(false);
	}

	if (isEditing) {
		return (
			<li>
				<input value={name} onChange={(event) => setName(event.target.value)} />
				<button type="button" onClick={saveEdit}>
					Save
				</button>
				<button type="button" onClick={() => setIsEditing(false)}>
					Cancel
				</button>
			</li>
		);
	}

	return (
		<li>
			{category.name}
			<button type="button" onClick={() => setIsEditing(true)}>
				Edit
			</button>
			<button type="button" onClick={() => onRemoveCategory(category.id)}>
				Delete
			</button>
		</li>
	);
}
