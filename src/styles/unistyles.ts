import { StyleSheet } from "react-native-unistyles";
import { breakpoints, darkTheme, lightTheme } from "./theme";

StyleSheet.configure({
	themes: {
		light: lightTheme,
		dark: darkTheme,
	},
	breakpoints,
	settings: {
		adaptiveThemes: true,
	},
});

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
	light: typeof lightTheme;
	dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
	export interface UnistylesBreakpoints extends AppBreakpoints {}
	export interface UnistylesThemes extends AppThemes {}
}
