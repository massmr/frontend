export function getOnboardingEmptyState() {
  return {
    title: 'Welcome',
    body: 'Create your first project to get started.'
  };
}

export function renderOnboardingPage() {
  const { title, body } = getOnboardingEmptyState();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Arial, Helvetica, sans-serif;
        background: #f4efe7;
        color: #1f2933;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: linear-gradient(180deg, #fcfaf7 0%, #f4efe7 100%);
      }

      main {
        width: min(560px, calc(100vw - 32px));
        padding: 40px 32px;
        border-radius: 24px;
        background: #ffffff;
        box-shadow: 0 24px 60px rgba(31, 41, 51, 0.12);
      }

      h1 {
        margin: 0 0 16px;
        font-size: clamp(2rem, 5vw, 3rem);
      }

      p {
        margin: 0 0 24px;
        font-size: 1.05rem;
        line-height: 1.6;
      }

      a {
        display: inline-block;
        padding: 14px 20px;
        border-radius: 999px;
        background: #2563eb;
        color: #ffffff;
        font-weight: 700;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(body)}</p>
      <a href="/onboarding">Create project</a>
    </main>
  </body>
</html>`;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  console.log(getOnboardingEmptyState().title);
}
