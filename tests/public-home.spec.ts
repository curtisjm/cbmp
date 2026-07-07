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

  test('opens the live demo webinar competition workspace without public chrome', async ({
    page,
  }) => {
    await page.goto('/');

    const liveDemo = page.getByRole('link', {
      name: /live demo webinar/i,
    });
    await expect(liveDemo).toBeVisible();
    await expect(liveDemo).toHaveAttribute(
      'href',
      '/app/competitions/mit-open-2026',
    );

    await liveDemo.click();

    await expect(page).toHaveURL(
      /\/app\/competitions\/mit-open-2026(?:$|[?#])/,
    );
    await expect(
      page.getByRole('navigation', { name: /global navigation/i }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('heading', {
        exact: true,
        name: 'MIT Open Ballroom Championships',
      }),
    ).toBeVisible();
    await expect(page.getByText(/competition management demo/i)).toBeVisible();
    await expect(page.getByText(/playable fixture/i)).toBeVisible();
    await expect(
      page.getByRole('group', { name: /competition management module/i }),
    ).toBeVisible();
  });

  test('routes preview cards to matching coming soon surfaces', async ({
    page,
  }) => {
    await page.goto('/');

    const scrutineersCard = page.getByRole('link', {
      name: /preview the scrutineers surface/i,
    });
    await expect(scrutineersCard).toBeVisible();
    await expect(scrutineersCard).toHaveAttribute(
      'href',
      '/coming-soon?surface=scrutineers',
    );

    await scrutineersCard.click();

    await expect(page).toHaveURL(/\/coming-soon\?surface=scrutineers$/);
    await expect(
      page.getByRole('heading', {
        exact: true,
        name: 'Scrutineers is coming soon.',
      }),
    ).toBeVisible();

    const home = page
      .getByLabel('Scrutineers is coming soon.')
      .getByRole('link', { exact: true, name: 'Home' });
    await expect(home).toHaveAttribute('href', '/');

    await home.click();

    await expect(page).toHaveURL(/\/(?:$|[?#])/);
    await expect(
      page.getByRole('heading', { name: /competition operations/i }),
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

test.describe('competition management demo', () => {
  test('updates module content, readiness counts, and session details', async ({
    page,
  }) => {
    await page.goto('/app/competitions/mit-open-2026');

    await expect(
      page.getByRole('navigation', { name: /global navigation/i }),
    ).toHaveCount(0);
    await expect(page.getByText('4 of 10 sample checks toggled.')).toBeVisible();
    await expect(
      page.getByText(/host-facing summary for fixture data/i),
    ).toBeVisible();

    const moduleGroup = page.getByRole('group', {
      name: /competition management module/i,
    });
    await moduleGroup.getByRole('button', { name: /schedule/i }).click();

    await expect(
      moduleGroup.getByRole('button', { name: /schedule/i }),
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByText(/session-level floor readiness/i),
    ).toBeVisible();
    await expect(page.getByText(/0\/3 checks/i)).toBeVisible();

    const deckPackets = page.getByRole('checkbox', {
      name: /print deck captain packets/i,
    });
    await expect(deckPackets).toBeEnabled();
    await deckPackets.check();

    await expect(deckPackets).toBeChecked();
    await expect(page.getByText('5 of 10 sample checks toggled.')).toBeVisible();
    await expect(page.getByText(/1\/3 checks/i)).toBeVisible();

    await expect(page.getByText(/latin multi-dance rounds/i)).toBeVisible();

    const sessionGroup = page.getByRole('group', {
      name: /competition session/i,
    });
    await sessionGroup
      .getByRole('button', { name: /saturday morning/i })
      .click();

    await expect(
      sessionGroup.getByRole('button', { name: /saturday morning/i }),
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByText(/bronze standard heats/i)).toBeVisible();
    await expect(page.getByText(/deck b - noah patel/i)).toBeVisible();
    await expect(
      page.getByText('2 of 3 session checks complete.'),
    ).toBeVisible();
  });

  test('keeps animated demo interactions enabled with reduced motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const liveDemo = page.getByRole('link', {
      name: /live demo webinar/i,
    });
    await expect(liveDemo).toBeVisible();
    await expect(liveDemo).toBeEnabled();
    const pulse = page.getByTestId('live-demo-status-pulse');
    const pulseDuration = Number(await pulse.getAttribute('data-motion-duration-ms'));
    const pulseRepeatCount = Number(
      await pulse.getAttribute('data-motion-repeat-count'),
    );
    expect(pulseDuration).toBeGreaterThan(0);
    expect(pulseDuration).toBeLessThanOrEqual(1600);
    expect(pulseRepeatCount).toBeGreaterThan(0);
    expect(pulseRepeatCount).toBeLessThanOrEqual(2);

    await liveDemo.click();

    await expect(page).toHaveURL(
      /\/app\/competitions\/mit-open-2026(?:$|[?#])/,
    );
    await expect(
      page.getByRole('heading', {
        exact: true,
        name: 'MIT Open Ballroom Championships',
      }),
    ).toBeVisible();

    const moduleGroup = page.getByRole('group', {
      name: /competition management module/i,
    });
    const officialsModule = moduleGroup.getByRole('button', {
      name: /officials/i,
    });
    await expect(officialsModule).toBeEnabled();
    await officialsModule.click();

    await expect(officialsModule).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByText(/reference surface for assignments/i),
    ).toBeVisible();

    const officialsBrief = page.getByRole('checkbox', {
      name: /brief officials on session flow/i,
    });
    await expect(officialsBrief).toBeEnabled();
    await officialsBrief.check();

    await expect(officialsBrief).toBeChecked();
    await expect(page.getByText('5 of 10 sample checks toggled.')).toBeVisible();

    const sessionGroup = page.getByRole('group', {
      name: /competition session/i,
    });
    const fridayEvening = sessionGroup.getByRole('button', {
      name: /friday evening/i,
    });
    await expect(fridayEvening).toBeEnabled();
    await fridayEvening.click();

    await expect(fridayEvening).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByText(/newcomer smooth and rhythm/i)).toBeVisible();
    await expect(page.getByText(/deck a - maya chen/i)).toBeVisible();
  });
});
