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
    const state = getOnboardingEmptyState();
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${state.title}</title>
    <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:32px;} .container{max-width:720px;margin:0 auto;} .hero{margin-top:48px;} .action{display:inline-block;padding:10px 16px;background:#0b5fff;color:#fff;border-radius:6px;text-decoration:none;margin-top:16px;}</style>
  </head>
  <body>
    <div class="container">
      <h1>${state.title}</h1>
      <p class="hero">${state.body}</p>
      <a class="action" href="#">Create project</a>
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
