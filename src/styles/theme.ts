export const lightTheme = {
	colors: {
		background: {
			primary: "#f9fafb",
			secondary: "#ffffff",
			tertiary: "#f3f4f6",
		},
		text: {
			primary: "#111827",
			secondary: "#6b7280",
			tertiary: "#9ca3af",
		},
		border: {
			primary: "#e5e7eb",
			secondary: "#d1d5db",
		},
		gradient: {
			start: "#eff6ff",
			middle: "#e0e7ff",
			end: "#f3e8ff",
		},
		accent: {
			primary: "#3b82f6",
			secondary: "#4f46e5",
			indigo: "#6366f1",
		},
		badge: {
			background: "#e0e7ff",
			text: "#4338ca",
		},
		card: {
			background: "rgba(255, 255, 255, 0.95)",
		},
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 12,
		lg: 16,
		xl: 20,
		"2xl": 24,
		"3xl": 32,
	},
	borderRadius: {
		sm: 8,
		md: 12,
		lg: 16,
		xl: 20,
		full: 9999,
	},
	shadows: {
		card: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 8,
			elevation: 3,
		},
		flag: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.2,
			shadowRadius: 4,
			elevation: 2,
		},
		sm: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.05,
			shadowRadius: 2,
			elevation: 1,
		},
	},
	typography: {
		fontSize: {
			xs: 12,
			sm: 14,
			base: 16,
			lg: 18,
			xl: 20,
			"2xl": 24,
		},
		fontWeight: {
			normal: "400" as const,
			medium: "500" as const,
			semibold: "600" as const,
			bold: "700" as const,
		},
	},
} as const;

export const darkTheme = {
	colors: {
		background: {
			primary: "#030712",
			secondary: "#1f2937",
			tertiary: "#374151",
		},
		text: {
			primary: "#ffffff",
			secondary: "#9ca3af",
			tertiary: "#6b7280",
		},
		border: {
			primary: "#374151",
			secondary: "#4b5563",
		},
		gradient: {
			start: "#0f172a",
			middle: "#1e1b4b",
			end: "#312e81",
		},
		accent: {
			primary: "#60a5fa",
			secondary: "#818cf8",
			indigo: "#6366f1",
		},
		badge: {
			background: "#312e81",
			text: "#a5b4fc",
		},
		card: {
			background: "rgba(31, 41, 55, 0.95)",
		},
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 12,
		lg: 16,
		xl: 20,
		"2xl": 24,
		"3xl": 32,
	},
	borderRadius: {
		sm: 8,
		md: 12,
		lg: 16,
		xl: 20,
		full: 9999,
	},
	shadows: {
		card: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.3,
			shadowRadius: 8,
			elevation: 3,
		},
		flag: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.4,
			shadowRadius: 4,
			elevation: 2,
		},
		sm: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.2,
			shadowRadius: 2,
			elevation: 1,
		},
	},
	typography: {
		fontSize: {
			xs: 12,
			sm: 14,
			base: 16,
			lg: 18,
			xl: 20,
			"2xl": 24,
		},
		fontWeight: {
			normal: "400" as const,
			medium: "500" as const,
			semibold: "600" as const,
			bold: "700" as const,
		},
	},
} as const;

export const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
} as const;

export type AppTheme = typeof lightTheme;
