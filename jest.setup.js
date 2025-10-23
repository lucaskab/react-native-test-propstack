// Jest setup file with common mocks for all tests

// Mock expo-router
jest.mock("expo-router", () => ({
	Link: ({ children, href, asChild, ...props }) => {
		const React = require("react");
		const { View } = require("react-native");

		if (asChild && React.isValidElement(children)) {
			return React.cloneElement(children, {
				...children.props,
				...props,
				testID: "mock-link",
				"data-href": href,
			});
		}

		return React.createElement(
			View,
			{ testID: "mock-link", "data-href": href, ...props },
			children,
		);
	},
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		back: jest.fn(),
	}),
	usePathname: () => "/",
	useSearchParams: () => ({}),
}));

// Mock services api
jest.mock("@/services/api", () => ({
	api: {
		get: jest.fn(),
	},
}));

// Mock expo-image
jest.mock("expo-image", () => ({
	Image: ({ source, style, testID, ...props }) => {
		const React = require("react");
		const { Image: RNImage } = require("react-native");
		return React.createElement(RNImage, {
			source,
			style,
			testID: testID || "expo-image",
			...props,
		});
	},
}));

// Mock expo-linear-gradient
jest.mock("expo-linear-gradient", () => ({
	LinearGradient: ({ children, testID, ...props }) => {
		const React = require("react");
		const { View } = require("react-native");
		return React.createElement(View, { testID, ...props }, children);
	},
}));

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
	Ionicons: ({ name, testID, ...props }) => {
		const React = require("react");
		const { Text } = require("react-native");
		return React.createElement(Text, {
			testID: testID || `icon-${name}`,
			...props,
		});
	},
}));

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
	const React = require("react");
	const {
		View: RNView,
		Text: RNText,
		ScrollView: RNScrollView,
	} = require("react-native");

	const AnimatedView = ({ children, style, entering, ...props }) =>
		React.createElement(
			RNView,
			{ style, testID: "animated-view", ...props },
			children,
		);

	const AnimatedText = ({ children, style, entering, ...props }) =>
		React.createElement(RNText, { style, ...props }, children);

	const AnimatedScrollView = ({ children, style, ...props }) =>
		React.createElement(RNScrollView, { style, ...props }, children);

	return {
		__esModule: true,
		default: {
			View: AnimatedView,
			Text: AnimatedText,
			ScrollView: AnimatedScrollView,
		},
		View: AnimatedView,
		Text: AnimatedText,
		ScrollView: AnimatedScrollView,
		useSharedValue: (initialValue) => ({ value: initialValue }),
		useAnimatedStyle: () => ({}),
		withTiming: (value) => value,
		withSpring: (value) => value,
		withRepeat: (animation) => animation,
		withSequence: (...animations) => animations[0],
		withDelay: (delay, animation) => animation,
		cancelAnimation: jest.fn(),
		runOnJS: (fn) => fn,
		FadeInUp: {
			delay: jest.fn(() => ({
				springify: jest.fn(() => ({})),
			})),
		},
		FadeInDown: {
			delay: jest.fn(() => ({
				springify: jest.fn(() => ({})),
			})),
		},
		FadeIn: {
			delay: jest.fn(() => ({
				springify: jest.fn(() => ({})),
			})),
		},
		Easing: {
			linear: 1,
			ease: 1,
			quad: 1,
			cubic: 1,
			bezier: () => 1,
			in: (easing) => easing,
			out: (easing) => easing,
			inOut: (easing) => easing,
		},
	};
});

jest.mock("react-native-unistyles", () => {
	const { lightTheme } = require("./src/styles/theme");

	return {
		StyleSheet: {
			create: (styles) => {
				if (typeof styles === "function") {
					const mockRuntime = {
						themeName: "light",
						colorScheme: "light",
					};
					return styles(lightTheme, mockRuntime);
				}
				return styles;
			},
		},
		useUnistyles: () => ({
			theme: lightTheme,
			breakpoint: "md",
			rt: {
				themeName: "light",
				colorScheme: "light",
			},
		}),
		createStyleSheet: (styles) => styles,
		UnistylesRegistry: {
			addThemes: jest.fn(),
			addBreakpoints: jest.fn(),
			addConfig: jest.fn(),
		},
	};
});

// Mock react-native-gesture-handler
jest.mock("react-native-gesture-handler", () => {
	const React = require("react");
	const { View } = require("react-native");

	return {
		GestureHandlerRootView: ({ children }) =>
			React.createElement(View, {}, children),
		PanGestureHandler: ({ children }) =>
			React.createElement(View, {}, children),
		State: {},
		Directions: {},
	};
});

// Mock @tanstack/react-query
jest.mock("@tanstack/react-query", () => ({
	...jest.requireActual("@tanstack/react-query"),
	QueryClient: jest.fn().mockImplementation(() => ({
		clear: jest.fn(),
		cancelQueries: jest.fn(),
		invalidateQueries: jest.fn(),
		refetchQueries: jest.fn(),
	})),
	QueryClientProvider: ({ children }) => {
		const React = require("react");
		return children;
	},
	useQuery: jest.fn(),
	useMutation: jest.fn(),
}));

// Mock @shopify/flash-list
jest.mock("@shopify/flash-list", () => ({
	FlashList: ({ data, renderItem, ListEmptyComponent, keyExtractor }) => {
		const React = require("react");
		const { FlatList } = require("react-native");
		return React.createElement(FlatList, {
			data,
			renderItem,
			ListEmptyComponent,
			keyExtractor,
			testID: "flash-list",
		});
	},
}));

// Mock expo-blur
jest.mock("expo-blur", () => ({
	BlurView: ({ children }) => {
		const React = require("react");
		const { View } = require("react-native");
		return React.createElement(View, { testID: "blur-view" }, children);
	},
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
	SafeAreaView: ({ children, style, edges }) => {
		const React = require("react");
		const { View } = require("react-native");
		return React.createElement(
			View,
			{ style, testID: "safe-area", "data-edges": edges?.join(",") },
			children,
		);
	},
}));

// Suppress console warnings in tests
global.console = {
	...console,
	warn: jest.fn(),
	error: jest.fn(),
};
