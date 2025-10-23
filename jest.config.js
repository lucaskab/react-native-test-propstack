module.exports = {
	preset: "jest-expo",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	transformIgnorePatterns: [
		"node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
	],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/__tests__/**",
		"!src/**/*.test.{ts,tsx}",
	],
	coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/", "/coverage/"],
	testMatch: [
		"**/__tests__/**/*.test.[jt]s?(x)",
		"**/?(*.)+(spec|test).[jt]s?(x)",
	],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};
