import { describe, expect, it } from "vitest";
import { parseNewCategory } from "../src/routes/category.js";

describe("parseNewCategory", () => {
  it("accepts a valid category body", () => {
    expect(parseNewCategory({ name: "Food" })).toEqual({
      name: "Food",
    });
  });

  it("rejects a body with no name", () => {
    expect(parseNewCategory({})).toBeNull();
  });

  it("rejects a non-string name", () => {
    expect(parseNewCategory({ name: 123 })).toBeNull();
  });
});

