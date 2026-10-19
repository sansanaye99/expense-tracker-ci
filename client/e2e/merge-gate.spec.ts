import { expect, test } from "@playwright/test";

test("temporary failure to demonstrate the merge gate", () => {
	expect(1).toBe(2);
});
