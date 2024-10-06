import { createFileRoute } from "@tanstack/react-router";
import { OAuthCallback } from "../../components/auth/oauth-callback";

export const Route = createFileRoute("/(auth)/callback")({
  component: () => (
    <div>
      <OAuthCallback />
    </div>
  ),
});
