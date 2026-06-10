import { createServer } from 'node:http';

import { getOnboardingEmptyState } from './app.js';

export function createAppServer() {
  return createServer(handleAppRequest);
}

export function handleAppRequest(request, response) {
  const url = new URL(request.url ?? '/', 'http://localhost');

  if (url.pathname === '/health') {
    response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (url.pathname === '/') {
    const state = getOnboardingEmptyState();
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${state.title}</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial; padding: 40px; }
      .container { max-width: 700px; margin: 0 auto; }
      h1 { font-size: 28px; margin-bottom: 8px; }
      p { color: #444; }
      .primary { display: inline-block; margin-top: 20px; padding: 10px 14px; background: #0070f3; color: white; border-radius: 6px; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${state.title}</h1>
      <p>${state.body}</p>
      <a href="/create" class="primary">Create project</a>
    </div>
  </body>
</html>`;

    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(html);
    return;
  }

  if (url.pathname === '/onboarding') {
    response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(getOnboardingEmptyState()));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify({ error: 'not_found' }));
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const port = Number.parseInt(process.env.PORT ?? '3000', 10);
  const server = createAppServer();

  server.listen(port, '0.0.0.0', () => {
    console.log(`frontend listening on port ${port}`);
  });
}
