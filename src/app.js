export function getOnboardingEmptyState() {
  return {
    title: 'Create your first project',
    body: 'Start by creating a project so you can add your details and begin onboarding.'
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  console.log(getOnboardingEmptyState().title);
}
