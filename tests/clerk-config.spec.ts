import { expect, test } from '@playwright/test';

import { isClerkPublishableKeyConfigured } from '../src/lib/clerk';

test.describe('Clerk configuration', () => {
  test('treats example placeholders as unavailable', () => {
    expect(isClerkPublishableKeyConfigured(undefined)).toBe(false);
    expect(isClerkPublishableKeyConfigured('')).toBe(false);
    expect(
      isClerkPublishableKeyConfigured('pk_test_replace_with_clerk_publishable_key'),
    ).toBe(false);
    expect(isClerkPublishableKeyConfigured('pk_test_placeholder')).toBe(false);
    expect(isClerkPublishableKeyConfigured('your-publishable-key')).toBe(false);
  });

  test('accepts plausible Clerk publishable keys', () => {
    expect(isClerkPublishableKeyConfigured('pk_test_localDevelopmentKey')).toBe(
      true,
    );
    expect(isClerkPublishableKeyConfigured('pk_live_productionKey')).toBe(true);
  });
});
