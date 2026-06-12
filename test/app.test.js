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
  assert.equal(health.headers['content-type'], 'application/json; charset=utf-8');

  const onboarding = dispatch('/onboarding');
  assert.equal(onboarding.statusCode, 200);
  assert.deepEqual(JSON.parse(onboarding.body), getOnboardingEmptyState());
  assert.equal(onboarding.headers['content-type'], 'application/json; charset=utf-8');

  const root = dispatch('/');
  assert.equal(root.statusCode, 200);
  assert.equal(root.headers['content-type'], 'text/html; charset=utf-8');
  assert.match(root.body, /<title>Welcome \| Ewokbot Frontend<\/title>/u);
  assert.match(root.body, /<h1[^>]*>Welcome<\/h1>/u);
  assert.match(root.body, /Create your first project to get started\./u);
  assert.match(root.body, /Ewokbot Railway smoke test/u);
  assert.match(root.body, /Railway verified/u);
  assert.match(root.body, /Railway polling check/u);
  assert.match(root.body, /Deployment status/u);
  assert.match(root.body, /Environment: staging/u);
  assert.match(root.body, /Branch: develop/u);
  assert.match(root.body, /Railway/u);
  assert.match(root.body, /Status: Ready/u);
  assert.match(root.body, /Ready/u);
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
