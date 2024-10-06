import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding/$slug')({
  component: () => <div>Hello /onboarding/$page!</div>,
})
