const plugin = require("tailwindcss/plugin");

const {
	colorPalette,
	boxShadows,
	fontWeights,
	fontSizes,
	lineHeights,
	scales,
	heights,
	borderRadius,
	spacing,
	proseSpacing,
	proseVariants,
} = require("./tools/tailwind-config.cjs");

/**
 * Add animation delay utilities. Example: .animation-delay-1000
 */
const animationDelayPlugin = plugin(({ addUtilities, theme, e }) => {
	const values = theme("animationDelay");
	const utilities = Object.entries(values).map(([key, value]) => {
		return {
			[`.${e(`animation-delay-${key}`)}`]: { animationDelay: `${value}` },
		};
	});
	addUtilities(utilities);
});

/**
 * Add animation iteration utilities. Example: .animation-iteration-infinite
 */
const animationIterationPlugin = plugin(({ addUtilities, theme, e }) => {
	const values = theme("animationIteration");
	const utilities = Object.entries(values).map(([key, value]) => {
		return {
			[`.${e(`animation-iteration-${key}`)}`]: {
				animationIterationCount: `${value}`,
			},
		};
	});
	addUtilities(utilities);
});

/**
 * Add animation duration utilities. Example: .animation-duration-1000
 */
const animationDuration = plugin(({ addUtilities, theme, e }) => {
	const values = theme("animationDuration");
	const utilities = Object.entries(values).map(([key, value]) => {
		return {
			[`.${e(`animation-duration-${key}`)}`]: {
				animationDuration: `${value}`,
			},
		};
	});
	addUtilities(utilities);
});

/**
 * Add animation fill mode  utilities. Example: .animation-fill-forwards
 */
const animationFill = plugin(({ addUtilities, theme, e }) => {
	const values = theme("animationFill");
	const utilities = Object.entries(values).map(([key, value]) => {
		return {
			[`.${e(`animation-fill-${key}`)}`]: {
				animationFillMode: `${value}`,
			},
		};
	});
	addUtilities(utilities);
});

module.exports = {
	content: [
		"./src/**/*.{ts,html,css,scss,mdx}",
		"./package/**/*.{ts,html,css,scss,mdx}",
		"./stories/**/*.{ts,html,css,scss,mdx}",
		"./*.{ts,html,css,scss,mdx}",
	],
	theme: {
		fontFamily: {
			inter: ["Inter", "sans-serif"],
			mono: ['"PT Mono"', "sans-serif"],
		},
		extend: {
			colors: colorPalette,
			boxShadow: boxShadows,
			fontSize: fontSizes,
			fontWeight: fontWeights,
			lineHeight: lineHeights,
			transitionDuration: {
				25: "25ms",
				250: "250ms",
			},
			transitionProperty: {
				width: "width",
				height: "height",
			},
			scale: scales,
			height: heights,
			animation: {
				"pulse-resize": "pulse-resize 1s ease-in-out infinite",
				"resize-in": "resize-in 0.5s ease-in-out",
				"fade-in": "fade-in 0.5s ease-in-out",
				bounce2: "bounce2 1s ease-in-out infinite alternate",
				"fade-in-up": "fade-in-up 0.5s ease-out forwards",
			},
			keyframes: {
				"pulse-resize": {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(0.7)" },
				},
				"resize-in": {
					"0%": { transform: "scale(0.5)" },
					"100%": { transform: "scale(1)" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				bounce2: {
					"0%": { transform: "translateY(-6px)" },
					"100%": { transform: "translateY(10)" },
				},
				"fade-in-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
			},
			animationDelay: {
				none: "0s",
				75: "75ms",
				100: "100ms",
				150: "150ms",
				200: "200ms",
				300: "300ms",
				400: "400ms",
				500: "500ms",
				600: "600ms",
				700: "700ms",
				800: "800ms",
				900: "900ms",
				1000: "1000ms",
				1500: "1500ms",
				2000: "2000ms",
				3000: "3000ms",
				5000: "5000ms",
			},
			animationIteration: {
				infinite: "infinite",
				1: "1",
				2: "2",
				3: "3",
			},
			animationDuration: {
				25: "25ms",
				50: "50ms",
				75: "75ms",
				100: "100ms",
				150: "150ms",
				200: "200ms",
				300: "300ms",
				400: "400ms",
				500: "500ms",
				600: "600ms",
				700: "700ms",
				800: "800ms",
				900: "900ms",
				1000: "1000ms",
				1500: "1500ms",
				2000: "2000ms",
				3000: "3000ms",
			},
			animationFill: {
				none: "none",
				forwards: "forwards",
				backwards: "backwards",
				both: "both",
			},
			borderRadius,
			spacing,
			typography: {
				...Object.fromEntries(
					proseVariants.map((variant) => [
						variant,
						{
							css: {
								maxWidth: "none",
								lineHeight: "1.6", // general baseline line-height for prose content
								...proseSpacing,
							},
						},
					]),
				),
				inherit: {
					css: {
						"--tw-prose-body": "inherit",
						"--tw-prose-headings": "inherit",
						"--tw-prose-lead": "inherit",
						"--tw-prose-links": "inherit",
						"--tw-prose-bold": "inherit",
						"--tw-prose-counters": "inherit",
						"--tw-prose-bullets": "inherit",
					},
				},
			},
		},
	},
	// styles that will be always included in the build
	safelist: [
		{
			pattern: /^prose(-[a-z0-9]+)?$/,
		},
	],
	plugins: [
		animationDelayPlugin,
		animationIterationPlugin,
		animationDuration,
		animationFill,
		require("@tailwindcss/typography"),
	],
};
