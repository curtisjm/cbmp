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

    await expect(
      page
        .getByRole('navigation', { name: /global navigation/i })
        .getByRole('link', { name: /public home/i }),
    ).toHaveCount(0);
  });

  test('keeps competition discovery off the home page', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /competition lifecycle/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        exact: true,
        name: 'Public Competitions',
      }),
    ).toHaveCount(0);
    await expect(page.getByText(/No public Competitions yet/i)).toHaveCount(0);
    await expect(
      page.getByLabel(/public competitions preview/i),
    ).toHaveCount(0);
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

test.describe('public competitions', () => {
  test('owns the public Competition discovery table', async ({ page }) => {
    await page.goto('/competitions');

    await expect(
      page.getByRole('heading', {
        exact: true,
        name: 'Competitions',
      }),
    ).toBeVisible();
    await expect(
      page.getByText(/Public discovery surface for collegiate ballroom/i),
    ).toBeVisible();
    await expect(
      page.getByRole('row', {
        name: /MIT Open Ballroom Championships/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByText('Competition Lifecycle', { exact: true }),
    ).toHaveCount(0);
    await expect(page.getByText('Status', { exact: true })).toBeVisible();
  });

  test('does not render route-path decoration in the public list', async ({
    page,
  }) => {
    await page.goto('/competitions');

    await expect(page.getByText('/competitions')).toHaveCount(0);
    await expect(page.getByText('Route', { exact: true })).toHaveCount(0);
  });
});
