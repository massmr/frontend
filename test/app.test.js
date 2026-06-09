import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getOnboardingEmptyState } from '../src/app.js';

test('returns onboarding empty state copy', () => {
  const emptyState = getOnboardingEmptyState();

  assert.equal(emptyState.title, 'Create your first project');
  assert.equal(
    emptyState.body,
    'Start by creating a project so you can invite teammates and track your work in one place.'
  );
});
