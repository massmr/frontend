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
    const html = renderHomePage(state);

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

function renderHomePage(state) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${escapeHtml(state.title)} | Ewokbot Frontend</title>
    <style>
      :root { color-scheme: light; }
      body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: #f3f4f6; color: #111827; }
      .page { max-width: 920px; margin: 0 auto; padding: 48px 24px 64px; }
      .hero, .status { background: white; border: 1px solid #e5e7eb; border-radius: 20px; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06); }
      .hero { padding: 32px; }
      .eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 999px; background: #dbeafe; color: #1d4ed8; font-size: 0.875rem; font-weight: 600; }
      h1 { margin: 18px 0 12px; font-size: clamp(2rem, 4vw, 3.25rem); line-height: 1.05; }
      p { margin: 0; line-height: 1.6; color: #374151; }
      .status { margin-top: 20px; padding: 24px 32px 28px; }
      .status h2 { margin: 0 0 16px; font-size: 1.1rem; }
      .status-list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
      .status-row { padding: 16px; border-radius: 14px; background: #f9fafb; border: 1px solid #e5e7eb; font-size: 1rem; font-weight: 600; color: #111827; }
      @media (max-width: 640px) {
        .page { padding: 20px 16px 40px; }
        .hero, .status { padding-left: 20px; padding-right: 20px; border-radius: 16px; }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="hero" aria-labelledby="onboarding-title">
        <span class="eyebrow">Ewokbot Frontend</span>
        <h1 id="onboarding-title">${escapeHtml(state.title)}</h1>
        <p>${escapeHtml(state.body)}</p>
      </section>

      <section class="status" aria-labelledby="deployment-status-title">
        <h2 id="deployment-status-title">Deployment status</h2>
        <div class="status-list">
          <div class="status-row">Environment: staging</div>
          <div class="status-row">Branch: develop</div>
          <div class="status-row">Runtime: Railway</div>
          <div class="status-row">Status: Ready</div>
        </div>
      </section>
    </main>
  </body>
</html>`;
}

function escapeHtml(str) {
  // Minimal HTML escaper for untrusted content
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const port = Number.parseInt(process.env.PORT ?? '3000', 10);
  const server = createAppServer();

  server.listen(port, '0.0.0.0', () => {
    console.log(`frontend listening on port ${port}`);
  });
}
