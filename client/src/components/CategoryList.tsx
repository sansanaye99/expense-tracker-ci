import type { Category, NewCategory } from "../types/category";
import { CategoryListItem } from "./CategoryListItem";

type CategoryListProps = {
	categories: Category[];
	onEditCategory: (id: string, category: NewCategory) => Promise<void>;
	onRemoveCategory: (id: string) => Promise<void>;
};

export function CategoryList({
	categories,
	onEditCategory,
	onRemoveCategory,
}: CategoryListProps) {
	if (categories.length === 0) {
		return <p>No categories yet.</p>;
	}

	return (
		<ul>
			{categories.map((category) => (
				<CategoryListItem
					key={category.id}
					category={category}
					onEditCategory={onEditCategory}
					onRemoveCategory={onRemoveCategory}
				/>
			))}
		</ul>
	);
}
