import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getOnboardingEmptyState } from '../src/app.js';
import { handleAppRequest } from '../src/server.js';

test('returns onboarding empty state copy', () => {
  assert.equal(getOnboardingEmptyState().title, 'Welcome');
  assert.match(getOnboardingEmptyState().body, /first project/u);
});

test('serves health and onboarding responses over HTTP', () => {
  const health = dispatch('/health');
  assert.equal(health.statusCode, 200);
  assert.deepEqual(JSON.parse(health.body), { status: 'ok' });

  const onboarding = dispatch('/onboarding');
  assert.equal(onboarding.statusCode, 200);
  assert.deepEqual(JSON.parse(onboarding.body), getOnboardingEmptyState());
});

test('serves HTML onboarding page at root', () => {
  const root = dispatch('/');
  assert.equal(root.statusCode, 200);
  // Should be HTML
  assert.match(root.body, /<!doctype html>/i);
  // Title and body copy from getOnboardingEmptyState()
  const state = getOnboardingEmptyState();
  assert.match(root.body, new RegExp(state.title));
  assert.match(root.body, new RegExp(state.body));
  // Primary action visible
  assert.match(root.body, /Create project/);
});

function dispatch(url) {
  const result = {
    statusCode: 0,
    headers: {},
    body: ''
  };
  const response = {
    writeHead(statusCode, headers) {
      result.statusCode = statusCode;
      result.headers = headers;
    },
    end(body) {
      result.body = body;
    }
  };

  handleAppRequest({ url }, response);
  return result;
}
