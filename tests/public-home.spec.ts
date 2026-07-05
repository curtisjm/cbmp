import { expect, test } from '@playwright/test';

test.describe('public home', () => {
  test('renders CBMP public access points', async ({ page }) => {
    const signInName = /(?:sign|log)[\s-]*in/i;

    await page.goto('/');

    await expect(page.getByText(/\bCBMP\b/i).first()).toBeVisible();

    const competitions = page
      .getByRole('link', { name: /competitions/i })
      .first();
    await expect(competitions).toBeVisible();
    await expect(competitions).toHaveAttribute(
      'href',
      /\/competitions(?:\/)?(?:$|[?#])/,
    );

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

  test('navigates between public routes from stable public links', async ({
    page,
  }) => {
    await page.goto('/');

    await page
      .getByRole('navigation', { name: /global navigation/i })
      .getByRole('link', { name: /^competitions$/i })
      .click();
    await expect(page).toHaveURL(/\/competitions(?:$|[?#])/);
    await expect(
      page.getByRole('heading', { exact: true, name: 'Competitions' }),
    ).toBeVisible();

    await page
      .getByRole('navigation', { name: /global navigation/i })
      .getByRole('link', { name: /app reference/i })
      .click();
    await expect(page).toHaveURL(/\/app(?:$|[?#])/);
    await expect(
      page.getByRole('heading', { name: /app reference shell/i }),
    ).toBeVisible();
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
  test('owns the redesigned public Competition discovery surface', async ({
    page,
  }) => {
    await page.goto('/competitions');

    await expect(
      page.getByRole('heading', {
        exact: true,
        name: 'Competitions',
      }),
    ).toBeVisible();
    await expect(
      page.getByText(/Find published collegiate ballroom Competitions/i),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: /MIT Open Ballroom Championships/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('searchbox', { name: /search competitions/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /entries open/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/Draft setup stays private to hosts/i),
    ).toBeVisible();
  });

  test('does not render route-path decoration in the public list', async ({
    page,
  }) => {
    await page.goto('/competitions');

    await expect(page.getByText('/competitions')).toHaveCount(0);
    await expect(page.getByText('Route', { exact: true })).toHaveCount(0);
  });

  test('searches and filters public Competition rows', async ({ page }) => {
    await page.goto('/competitions');

    const search = page.getByRole('searchbox', {
      name: /search competitions/i,
    });
    await expect(search).toBeEnabled();

    await search.fill('Berkeley');
    await expect(
      page.getByRole('heading', { name: /Berkeley Classic/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /MIT Open Ballroom Championships/i }),
    ).toHaveCount(0);
    await expect(page.getByText('1 of 6 Competitions')).toBeVisible();

    await search.clear();
    await page.getByRole('button', { name: 'Running' }).click();
    await expect(
      page.getByRole('heading', {
        name: /Midwest Collegiate Championships/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Berkeley Classic/i }),
    ).toHaveCount(0);
    await expect(page.getByText('1 of 6 Competitions')).toBeVisible();

    await page.getByRole('button', { name: 'All' }).click();
    await expect(
      page.getByRole('heading', { name: /MIT Open Ballroom Championships/i }),
    ).toBeVisible();
    await expect(page.getByText('6 of 6 Competitions')).toBeVisible();
  });

  test('shows and clears an empty Competition result state', async ({ page }) => {
    await page.goto('/competitions');

    await page
      .getByRole('searchbox', { name: /search competitions/i })
      .fill('no matching host or city');

    await expect(
      page.getByRole('heading', {
        name: /No Competitions match these filters/i,
      }),
    ).toBeVisible();
    await expect(page.getByText('0 of 6 Competitions')).toBeVisible();

    await page.getByRole('button', { name: /clear filters/i }).click();

    await expect(
      page.getByRole('heading', { name: /MIT Open Ballroom Championships/i }),
    ).toBeVisible();
    await expect(page.getByText('6 of 6 Competitions')).toBeVisible();
  });
});

test.describe('app reference route', () => {
  test('renders the prototype shell without public chrome', async ({ page }) => {
    await page.goto('/app');

    await expect(
      page.getByRole('navigation', { name: /global navigation/i }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('heading', { name: /app reference shell/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /overview/i }),
    ).toHaveAttribute('aria-current', 'page');
    await expect(
      page.getByRole('searchbox', { name: /reference search preview/i }),
    ).toHaveAttribute('readonly', '');
    await expect(page.getByText(/prototype\/reference/i)).toBeVisible();
    await expect(page.getByText(/not Clerk-protected/i)).toBeVisible();
  });

  test('keeps soon navigation inert and opens mobile navigation', async ({
    page,
  }) => {
    await page.goto('/app');

    const entries = page.getByRole('link', { name: /entries soon/i });
    await expect(entries).toHaveAttribute('aria-disabled', 'true');
    await expect(entries).toHaveAttribute('href', '/app');
    await expect(page).toHaveURL(/\/app(?:$|[?#])/);

    await page.setViewportSize({ width: 390, height: 844 });
    await page
      .getByRole('button', { name: /open app reference navigation/i })
      .click();

    await expect(
      page.getByRole('navigation', {
        name: /mobile reference app navigation/i,
      }),
    ).toBeVisible();
    await expect(page.getByText(/Prototype navigation surface/i)).toBeVisible();
  });
});
