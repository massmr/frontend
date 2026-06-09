import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getOnboardingEmptyState } from '../src/app.js';

test('returns onboarding empty state copy', () => {
  assert.equal(getOnboardingEmptyState().title, 'Create your first project');
  assert.equal(
    getOnboardingEmptyState().body,
    'Start by creating a project so you can add your details and begin onboarding.'
  );
});
