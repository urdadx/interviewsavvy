import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
// vite.config.ts
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite(), viteReact()],
	resolve: {
		alias: {
			"@shared": "../shared/*",
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
