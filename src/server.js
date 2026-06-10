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
    // Serve a minimal onboarding HTML page for the root path.
    const { title, body } = getOnboardingEmptyState();
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; padding: 48px; }
      .container { max-width: 640px; margin: 0 auto; }
      h1 { font-size: 28px; margin-bottom: 12px; }
      p { color: #444; margin-bottom: 20px; }
      .primary { background: #2563eb; color: white; padding: 10px 16px; border-radius: 6px; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${title}</h1>
      <p>${body}</p>
      <a class="primary" href="/create">Create project</a>
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
