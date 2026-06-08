export function getOnboardingEmptyState() {
  return {
    title: 'Welcome',
    body: 'Create your first project to get started.'
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  console.log(getOnboardingEmptyState().title);
}
