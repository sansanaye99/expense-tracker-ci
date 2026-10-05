import { describe, expect, it } from "vitest";
import { parseNewExpense } from "../src/routes/expense.js";

describe("parseNewExpense", () => {
  it("accepts a valid expense body", () => {
    expect(
      parseNewExpense({
        description: "Lunch",
        amount: 12.5,
        date: "2026-10-05",
      }),
    ).toEqual({
      description: "Lunch",
      amount: 12.5,
      date: "2026-10-05",
    });
  });

  it("rejects a body with a missing amount", () => {
    expect(
      parseNewExpense({
        description: "Lunch",
        date: "2026-10-05",
      }),
    ).toBeNull();
  });

  it("rejects an amount that is a string", () => {
    expect(
      parseNewExpense({
        description: "Lunch",
        amount: "12.5",
        date: "2026-10-05",
      }),
    ).toBeNull();
  });

  it("rejects null", () => {
    expect(parseNewExpense(null)).toBeNull();
  });
});
