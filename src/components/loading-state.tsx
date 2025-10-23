import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface LoadingStateProps {
	message?: string;
	submessage?: string;
}

export function LoadingState({
	message = "Loading Countries",
	submessage = "Fetching data from around the world",
}: LoadingStateProps) {
	const { theme } = useUnistyles();

	const globeRotation = useSharedValue(0);
	const globeScale = useSharedValue(1);
	const ringRotation = useSharedValue(0);
	const dotsOpacity = useSharedValue(0);

	useEffect(() => {
		globeRotation.value = withRepeat(
			withTiming(360, { duration: 3000, easing: Easing.linear }),
			-1,
		);

		globeScale.value = withRepeat(
			withSequence(
				withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
				withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
			),
			-1,
		);

		ringRotation.value = withRepeat(
			withTiming(-360, { duration: 4000, easing: Easing.linear }),
			-1,
		);

		dotsOpacity.value = withRepeat(
			withSequence(
				withTiming(0, { duration: 500 }),
				withTiming(1, { duration: 500 }),
				withTiming(0, { duration: 500 }),
			),
			-1,
		);
	}, [globeRotation, globeScale, ringRotation, dotsOpacity]);

	const globeAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ rotate: `${globeRotation.value}deg` },
			{ scale: globeScale.value },
		],
	}));

	const dotsAnimatedStyle = useAnimatedStyle(() => ({
		opacity: dotsOpacity.value,
	}));

	return (
		<LinearGradient
			colors={[
				theme.colors.gradient.start,
				theme.colors.gradient.middle,
				theme.colors.gradient.end,
			]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.container}
		>
			<View style={styles.content}>
				<View style={styles.globeContainer}>
					<Animated.View style={[styles.globeWrapper, globeAnimatedStyle]}>
						<LinearGradient
							colors={[
								theme.colors.accent.blue,
								theme.colors.accent.indigo,
								theme.colors.accent.purple,
							]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.globeGradient}
						></LinearGradient>
					</Animated.View>
					<Ionicons
						name="globe-outline"
						size={48}
						color={theme.colors.white}
						style={styles.globeIcon}
					/>
				</View>

				<View style={styles.textContainer}>
					<View style={styles.titleRow}>
						<Text style={styles.title}>{message}</Text>
						<Animated.Text style={[styles.dots, dotsAnimatedStyle]}>
							...
						</Animated.Text>
					</View>
					<Text style={styles.subtitle}>{submessage}</Text>
				</View>

				<View style={styles.skeletonContainer}>
					{[0, 1, 2, 3].map((i) => (
						<SkeletonCard key={i} />
					))}
				</View>
			</View>
		</LinearGradient>
	);
}

function SkeletonCard() {
	const { theme } = useUnistyles();
	const opacity = useSharedValue(0.4);

	useEffect(() => {
		opacity.value = withRepeat(
			withSequence(
				withTiming(0.7, {
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
				}),
				withTiming(0.4, {
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
				}),
			),
			-1,
		);
	}, [opacity]);

	const flagAnimatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	const title1AnimatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	const title2AnimatedStyle = useAnimatedStyle(() => ({
		opacity: withRepeat(
			withSequence(
				withTiming(0.7, {
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
				}),
				withTiming(0.4, {
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
				}),
			),
			-1,
		),
	}));

	return (
		<View style={styles.skeletonCard} testID="skeleton-card">
			<Animated.View style={[styles.skeletonFlag, flagAnimatedStyle]}>
				<LinearGradient
					colors={[theme.colors.skeleton.start, theme.colors.skeleton.end]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.skeletonFlagGradient}
				/>
			</Animated.View>

			<View style={styles.skeletonTextContainer}>
				<Animated.View style={[styles.skeletonTitle, title1AnimatedStyle]}>
					<LinearGradient
						colors={[theme.colors.skeleton.start, theme.colors.skeleton.end]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.skeletonTitleGradient}
					/>
				</Animated.View>
				<Animated.View style={[styles.skeletonSubtitle, title2AnimatedStyle]}>
					<LinearGradient
						colors={[theme.colors.skeleton.start, theme.colors.skeleton.end]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.skeletonSubtitleGradient}
					/>
				</Animated.View>
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
	},
	globeContainer: {
		position: "relative",
		marginBottom: theme.spacing.xl * 1.5,
		width: 96,
		height: 96,
	},
	globeWrapper: {
		width: 96,
		height: 96,
	},
	globeGradient: {
		width: "100%",
		height: "100%",
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
		...theme.shadows.lg,
	},
	globeIcon: {
		position: "absolute",
		alignSelf: "center",
		top: "50%",
		marginTop: -24,
	},
	textContainer: {
		alignItems: "center",
		marginBottom: theme.spacing.xl * 2,
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: theme.spacing.sm,
	},
	title: {
		fontSize: theme.typography.fontSize.xl,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.primary,
	},
	dots: {
		fontSize: theme.typography.fontSize.xl,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.primary,
		marginLeft: theme.spacing.xs,
	},
	subtitle: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.text.secondary,
	},
	skeletonContainer: {
		width: "100%",
		gap: theme.spacing.md,
		marginBottom: theme.spacing.xl * 1.5,
	},
	skeletonCard: {
		backgroundColor: theme.colors.overlay.subtle,
		borderRadius: theme.borderRadius.xl,
		padding: theme.spacing.lg,
		borderWidth: 1,
		borderColor: theme.colors.border.primary,
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.lg,
		...theme.shadows.card,
	},
	skeletonFlag: {
		width: 64,
		height: 48,
		borderRadius: theme.borderRadius.md,
		overflow: "hidden",
	},
	skeletonFlagGradient: {
		width: "100%",
		height: "100%",
	},
	skeletonTextContainer: {
		flex: 1,
		gap: theme.spacing.sm,
	},
	skeletonTitle: {
		height: 20,
		borderRadius: theme.borderRadius.md,
		width: "75%",
		overflow: "hidden",
	},
	skeletonTitleGradient: {
		width: "100%",
		height: "100%",
	},
	skeletonSubtitle: {
		height: 16,
		borderRadius: theme.borderRadius.md,
		width: "50%",
		overflow: "hidden",
	},
	skeletonSubtitleGradient: {
		width: "100%",
		height: "100%",
	},
}));
