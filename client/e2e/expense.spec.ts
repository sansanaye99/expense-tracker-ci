import { expect, test } from "@playwright/test";

test("user can add, edit, and delete an expense", async ({ page }) => {
  const originalDescription = `E2E expense ${Date.now()}`;
  const updatedDescription = `${originalDescription} updated`;

  await page.goto("/");

  await page.getByPlaceholder("Description").fill(originalDescription);
  await page.getByPlaceholder("Amount (€)").fill("12.50");
  await page.getByPlaceholder("dd.mm.yyyy").first().fill("05.10.2026");
  await page.getByRole("button", { name: "Add", exact: true }).click();

  const createdRow = page.locator("li").filter({ hasText: originalDescription });
  await expect(createdRow).toBeVisible();

  await createdRow.getByRole("button", { name: "Edit", exact: true }).click();

  await page.locator('input[name="editDescription"]').fill(updatedDescription);
  await page.locator('input[name="editAmount"]').fill("15.75");
  await page.locator('input[name="editDate"]').fill("06.10.2026");
  await page.getByRole("button", { name: "Save", exact: true }).click();

  const updatedRow = page.locator("li").filter({ hasText: updatedDescription });
  await expect(updatedRow).toBeVisible();

  await updatedRow.getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page.getByText(updatedDescription, { exact: true })).toHaveCount(0);
});
