import { describe, expect, it } from "vitest";
import { toExpense } from "../src/store/expense.js";

describe("toExpense", () => {
	it("converts a database amount string into a number", () => {
		const result = toExpense({
			id: "expense-1",
			description: "Coffee",
			amount: "4.50",
			date: "2026-10-05",
		});

		expect(result).toEqual({
			id: "expense-1",
			description: "Coffee",
			amount: 4.5,
			date: "2026-10-05",
		});
	});

	it("keeps a numeric amount as a number", () => {
		const result = toExpense({
			id: "expense-2",
			description: "Bus ticket",
			amount: 3.2,
			date: "2026-10-06",
		});

		expect(result.amount).toBe(3.2);
	});
});
