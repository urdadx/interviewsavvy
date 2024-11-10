const { wedgesTW } = require("@lemonsqueezy/wedges");

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/@lemonsqueezy/wedges/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				regular: ["Inter", "sans-serif"],
			},
			colors: {
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
		},
	},
	darkMode: "class",
	plugins: [
		wedgesTW({
			prefix: "wg", // prefix used for CSS variables
			defaultTheme: "light", // default theme
			defaultExtendTheme: "light", // default theme to extend when creating custom themes
			fontSmooth: "antialiased", // specify font smoothing for Wedges components
		}),
	],
};
