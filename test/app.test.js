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

  const homepage = dispatch('/');
  assert.equal(homepage.statusCode, 200);
  assert.equal(homepage.headers['content-type'], 'text/html; charset=utf-8');
  assert.match(homepage.body, /<!doctype html>/iu);
  assert.match(homepage.body, new RegExp(getOnboardingEmptyState().title, 'u'));
  assert.match(homepage.body, new RegExp(getOnboardingEmptyState().body, 'u'));
  assert.match(homepage.body, /Create project/u);

  const onboarding = dispatch('/onboarding');
  assert.equal(onboarding.statusCode, 200);
  assert.equal(onboarding.headers['content-type'], 'application/json; charset=utf-8');
  assert.deepEqual(JSON.parse(onboarding.body), getOnboardingEmptyState());
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
