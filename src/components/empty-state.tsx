import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface EmptyStateProps {
	onSelectSuggestion: (country: string) => void;
}

export function EmptyState({ onSelectSuggestion }: EmptyStateProps) {
	const floatingIcon1Y = useSharedValue(0);
	const floatingIcon1Rotation = useSharedValue(0);
	const floatingIcon2Y = useSharedValue(0);
	const floatingIcon2Rotation = useSharedValue(0);
	const { theme } = useUnistyles();

	const europeanCountries = ["France", "Germany", "Italy", "Spain"];

	useEffect(() => {
		floatingIcon1Y.value = withRepeat(
			withSequence(
				withTiming(-10, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
				withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
			),
			-1,
		);
		floatingIcon1Rotation.value = withRepeat(
			withSequence(
				withTiming(5, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
				withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
			),
			-1,
		);

		floatingIcon2Y.value = withDelay(
			500,
			withRepeat(
				withSequence(
					withTiming(10, {
						duration: 2500,
						easing: Easing.inOut(Easing.ease),
					}),
					withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
				),
				-1,
			),
		);
		floatingIcon2Rotation.value = withDelay(
			500,
			withRepeat(
				withSequence(
					withTiming(-5, {
						duration: 2500,
						easing: Easing.inOut(Easing.ease),
					}),
					withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
				),
				-1,
			),
		);
	});

	const floatingIcon1Style = useAnimatedStyle(() => ({
		transform: [
			{ translateY: floatingIcon1Y.value },
			{ rotate: `${floatingIcon1Rotation.value}deg` },
		],
	}));

	const floatingIcon2Style = useAnimatedStyle(() => ({
		transform: [
			{ translateY: floatingIcon2Y.value },
			{ rotate: `${floatingIcon2Rotation.value}deg` },
		],
	}));

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.iconContainer}>
					<View style={styles.mainIconWrapper}>
						<LinearGradient
							colors={[
								theme.colors.background.tertiary,
								theme.colors.border.primary,
								theme.colors.border.secondary,
							]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.mainIconGradient}
						>
							<Ionicons
								name="search"
								size={48}
								color={theme.colors.text.tertiary}
							/>
						</LinearGradient>
					</View>

					<Animated.View
						style={[
							styles.floatingIcon,
							styles.floatingIcon1,
							floatingIcon1Style,
						]}
					>
						<LinearGradient
							colors={[theme.colors.accent.blue, theme.colors.accent.indigo]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.floatingIconGradient}
						>
							<Ionicons name="location" size={20} color={theme.colors.white} />
						</LinearGradient>
					</Animated.View>

					<Animated.View
						style={[
							styles.floatingIcon,
							styles.floatingIcon2,
							floatingIcon2Style,
						]}
					>
						<LinearGradient
							colors={[theme.colors.accent.purple, theme.colors.accent.pink]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.floatingIconGradient}
						>
							<Ionicons name="compass" size={20} color={theme.colors.white} />
						</LinearGradient>
					</Animated.View>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.title}>No countries found</Text>
					<Text style={styles.description}>
						Try searching with a different term
					</Text>
				</View>

				<View style={styles.suggestionsContainer}>
					<Text style={styles.suggestionsTitle}>Suggestions:</Text>
					<View style={styles.suggestionsGrid}>
						{europeanCountries.map((country) => (
							<TouchableOpacity
								key={country}
								onPress={() => onSelectSuggestion(country)}
								style={styles.suggestionCard}
							>
								<Text style={styles.suggestionText}>{country}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.xl * 4,
	},
	iconContainer: {
		position: "relative",
		width: 112,
		height: 112,
		marginBottom: theme.spacing.xl * 2,
	},
	mainIconWrapper: {
		width: 112,
		height: 112,
		position: "relative",
	},
	mainIconGradient: {
		width: "100%",
		height: "100%",
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
		...theme.shadows.lg,
	},
	floatingIcon: {
		position: "absolute",
		width: 48,
		height: 48,
	},
	floatingIcon1: {
		top: -8,
		right: -8,
	},
	floatingIcon2: {
		bottom: -8,
		left: -8,
	},
	floatingIconGradient: {
		width: "100%",
		height: "100%",
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		...theme.shadows.floatingIcon,
	},
	textContainer: {
		alignItems: "center",
		marginBottom: theme.spacing.xl * 1.5,
		paddingHorizontal: theme.spacing.md,
	},
	title: {
		fontSize: theme.typography.fontSize.xl,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.sm,
		textAlign: "center",
	},
	queryText: {
		color: theme.colors.accent.indigo,
		fontWeight: theme.typography.fontWeight.semibold,
	},
	description: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.text.secondary,
		textAlign: "center",
	},
	suggestionsContainer: {
		width: "100%",
		maxWidth: 400,
		paddingHorizontal: theme.spacing.lg,
	},
	suggestionsTitle: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.text.secondary,
		textAlign: "center",
		marginBottom: theme.spacing.md,
	},
	suggestionsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: theme.spacing.md,
		justifyContent: "center",
	},
	suggestionCard: {
		backgroundColor: theme.colors.overlay.subtle,
		borderRadius: theme.borderRadius.xl,
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.lg,
		borderWidth: 1,
		borderColor: theme.colors.border.primary,
		minWidth: "45%",
		alignItems: "center",
	},
	suggestionText: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.text.primary,
		fontWeight: theme.typography.fontWeight.medium,
	},
}));
