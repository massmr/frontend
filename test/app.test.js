import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getOnboardingEmptyState } from '../src/app.js';

test('returns onboarding empty state copy', () => {
  assert.equal(getOnboardingEmptyState().title, 'Welcome');
  assert.match(getOnboardingEmptyState().body, /first project/u);
});
