import { CategoryForm } from "./components/CategoryForm";
import { CategoryList } from "./components/CategoryList";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseTotal } from "./components/ExpenseTotal";
import { useCategories } from "./hooks/useCategories";
import { useExpenses } from "./hooks/useExpenses";

// Composition root: wires the data hooks to the presentational components.
function App() {
	const { expenses, addExpense, editExpense, removeExpense } = useExpenses();

	const {
		categories,
		isLoading: categoriesLoading,
		error: categoriesError,
		addCategory,
		editCategory,
		removeCategory,
	} = useCategories();

	return (
		<>
			<h1>Expense tracker</h1>

			<ExpenseForm onAdd={addExpense} />
			<ExpenseList
				expenses={expenses}
				onUpdate={editExpense}
				onDelete={removeExpense}
			/>
			<ExpenseTotal expenses={expenses} />

			<section>
				<h2>Categories</h2>

				<CategoryForm onAddCategory={addCategory} />

				{categoriesLoading && <p>Loading categories...</p>}

				{categoriesError && <p>{categoriesError}</p>}

				{!categoriesLoading && !categoriesError && (
					<CategoryList
						categories={categories}
						onEditCategory={editCategory}
						onRemoveCategory={removeCategory}
					/>
				)}
			</section>
		</>
	);
}

export default App;
