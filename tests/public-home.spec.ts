import { expect, test } from '@playwright/test';

test.describe('public home', () => {
  test('renders CBMP public access points', async ({ page }) => {
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

    const accessLinks = page
      .getByRole('list', { name: /CBMP public access links/i })
      .getByRole('link');
    await expect(accessLinks).toHaveCount(2);
    await expect(accessLinks.nth(0)).toHaveAttribute(
      'href',
      /\/competitions(?:\/)?(?:$|[?#])/,
    );
    await expect(accessLinks.nth(1)).toHaveAttribute(
      'href',
      /\/sign-in(?:\/)?(?:$|[?#])/,
    );
    await expect(page.getByRole('link', { name: /public home/i })).toBeVisible();
  });

  test('renders a public sign-in fallback when Clerk is unavailable', async ({
    page,
  }) => {
    await page.goto('/sign-in');

    await expect(
      page.getByRole('heading', { name: /sign in unavailable/i }),
    ).toBeVisible();
    await expect(page.getByText(/Clerk is not configured/i)).toBeVisible();

    const competitions = page
      .getByLabel('Sign in unavailable')
      .getByRole('link', { name: /competitions/i });
    await expect(competitions).toBeVisible();
    await expect(competitions).toHaveAttribute(
      'href',
      /\/competitions(?:\/)?(?:$|[?#])/,
    );
  });
});
