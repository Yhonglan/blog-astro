/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						'code': {
							'background-color': '#e5e9f0',
							'border-radius': '3px',
							'padding-left': '2px',
							'padding-right': '2px'
						},
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						}
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
