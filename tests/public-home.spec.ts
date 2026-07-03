import { expect, test } from '@playwright/test';

test.describe('public home', () => {
  test('renders CBMP public entry points', async ({ page }) => {
    const signInName = /(?:sign|log)[\s-]*in/i;

    await page.goto('/');

    await expect(page.getByText(/\bCBMP\b/i).first()).toBeVisible();

    const competitions = page.getByRole('link', { name: /competitions/i }).first();
    await expect(competitions).toBeVisible();
    await expect(competitions).toHaveAttribute('href', /\/competitions(?:\/)?(?:$|[?#])/);

    const signIn = page
      .getByRole('link', { name: signInName })
      .or(page.getByRole('button', { name: signInName }))
      .first();
    await expect(signIn).toBeVisible();
  });
});
