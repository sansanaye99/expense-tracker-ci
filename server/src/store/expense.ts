import { pool } from "../db.js";
import type { Expense, NewExpense } from "../types/expense.js";

type ExpenseRow = {
  id: string;
  description: string;
  amount: number | string;
  date: string;
};

export function toExpense(row: ExpenseRow): Expense {
  return {
    id: row.id,
    description: row.description,
    amount: Number(row.amount),
    date: row.date,
  };
}

export async function getExpenses(): Promise<Expense[]> {
  const result = await pool.query<ExpenseRow>(
    "SELECT id, description, amount::float8 AS amount, date::text AS date FROM expenses ORDER BY date",
  );

  return result.rows.map(toExpense);
}

export async function addExpense(newExpense: NewExpense): Promise<Expense> {
  const result = await pool.query<ExpenseRow>(
    `INSERT INTO expenses (description, amount, date)
     VALUES ($1, $2, $3)
     RETURNING id, description, amount::float8 AS amount, date::text AS date`,
    [newExpense.description, newExpense.amount, newExpense.date],
  );

  return toExpense(result.rows[0]);
}

export async function updateExpense(
  id: string,
  update: NewExpense,
): Promise<Expense | null> {
  const result = await pool.query<ExpenseRow>(
    `UPDATE expenses
     SET description = $1, amount = $2, date = $3
     WHERE id = $4
     RETURNING id, description, amount::float8 AS amount, date::text AS date`,
    [update.description, update.amount, update.date, id],
  );

  return result.rows[0] ? toExpense(result.rows[0]) : null;
}

export async function deleteExpense(id: string): Promise<boolean> {
  const result = await pool.query("DELETE FROM expenses WHERE id = $1", [id]);

  return result.rowCount === 1;
}
