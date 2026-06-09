export function getOnboardingEmptyState() {
  return {
    title: 'Create your first project',
    body: 'Start by creating a project so you can invite teammates and track your work in one place.'
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  console.log(getOnboardingEmptyState().title);
}
