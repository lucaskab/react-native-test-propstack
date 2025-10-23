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
	withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

interface ErrorStateProps {
	onRetry: () => void;
	message?: string;
	submessage?: string;
}

export function ErrorState({
	onRetry,
	message = "Oops! Something went wrong",
	submessage = "Failed to load countries",
}: ErrorStateProps) {
	const ring1Scale = useSharedValue(1);
	const ring1Opacity = useSharedValue(0.5);
	const ring2Scale = useSharedValue(1);
	const ring2Opacity = useSharedValue(0.5);
	const ring3Scale = useSharedValue(1);
	const ring3Opacity = useSharedValue(0.5);

	const rings = [
		{ scale: ring1Scale, opacity: ring1Opacity, delay: 0 },
		{ scale: ring2Scale, opacity: ring2Opacity, delay: 400 },
		{ scale: ring3Scale, opacity: ring3Opacity, delay: 800 },
	];

	useEffect(() => {
		rings.forEach((ring) => {
			ring.scale.value = withDelay(
				ring.delay,
				withRepeat(
					withTiming(1.8, { duration: 2000, easing: Easing.out(Easing.ease) }),
					-1,
				),
			);
			ring.opacity.value = withDelay(
				ring.delay,
				withRepeat(
					withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) }),
					-1,
				),
			);
		});
	});

	const ring1AnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: ring1Scale.value }],
		opacity: ring1Opacity.value,
	}));

	const ring2AnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: ring2Scale.value }],
		opacity: ring2Opacity.value,
	}));

	const ring3AnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: ring3Scale.value }],
		opacity: ring3Opacity.value,
	}));

	const ringAnimatedStyles = [
		ring1AnimatedStyle,
		ring2AnimatedStyle,
		ring3AnimatedStyle,
	];

	return (
		<LinearGradient
			colors={["#FEF2F2", "#FFF7ED", "#FDF2F8"]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.container}
		>
			<View style={styles.content}>
				<View style={styles.iconContainer}>
					<Animated.View style={[styles.ring, ringAnimatedStyles[0]]} />
					<Animated.View style={[styles.ring, ringAnimatedStyles[1]]} />
					<Animated.View style={[styles.ring, ringAnimatedStyles[2]]} />

					<View style={[styles.iconWrapper]}>
						<LinearGradient
							colors={["#EF4444", "#F97316", "#EC4899"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.iconGradient}
						>
							<Ionicons name="wifi-outline" size={48} color="white" />
						</LinearGradient>
					</View>

					<View style={[styles.badge]}>
						<View style={styles.badgeInner}>
							<Ionicons name="alert-circle" size={24} color="#EF4444" />
						</View>
					</View>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.title}>{message}</Text>
					<Text style={styles.subtitle}>{submessage}</Text>
					<Text style={styles.description}>
						Please check your connection and try again
					</Text>
				</View>

				<View style={[styles.buttonWrapper]}>
					<TouchableOpacity
						onPress={onRetry}
						style={styles.button}
						activeOpacity={0.6}
					>
						<LinearGradient
							colors={["#EF4444", "#F97316", "#EC4899"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={styles.buttonGradient}
						>
							<Ionicons
								name="refresh"
								size={20}
								color="white"
								style={styles.buttonIcon}
							/>
							<Text style={styles.buttonText}>Try Again</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</View>
		</LinearGradient>
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
	iconContainer: {
		position: "relative",
		width: 96,
		height: 96,
		marginBottom: theme.spacing.xl * 2.5,
	},
	iconWrapper: {
		width: 96,
		height: 96,
	},
	iconGradient: {
		width: "100%",
		height: "100%",
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 12,
		elevation: 8,
	},
	badge: {
		position: "absolute",
		top: -8,
		right: -8,
		width: 36,
		height: 36,
	},
	badgeInner: {
		width: "100%",
		height: "100%",
		backgroundColor: "white",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 4,
	},
	ring: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 24,
		borderWidth: 2,
		borderColor: "#FCA5A5",
	},
	textContainer: {
		alignItems: "center",
		marginBottom: theme.spacing.xl * 2.5,
		paddingHorizontal: theme.spacing.md,
	},
	title: {
		fontSize: theme.typography.fontSize.xl,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.sm,
		textAlign: "center",
	},
	subtitle: {
		fontSize: theme.typography.fontSize.base,
		color: "#4B5563",
		marginBottom: theme.spacing.xs,
		textAlign: "center",
	},
	description: {
		fontSize: theme.typography.fontSize.sm,
		color: "#6B7280",
		textAlign: "center",
	},
	buttonWrapper: {
		width: "100%",
		paddingHorizontal: theme.spacing.lg,
		marginBottom: theme.spacing.xl * 2,
	},
	button: {
		width: "100%",
		borderRadius: theme.borderRadius.xl,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 4,
	},
	buttonGradient: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: theme.spacing.lg,
		paddingHorizontal: theme.spacing.xl,
		height: 56,
	},
	buttonIcon: {
		marginRight: theme.spacing.sm,
	},
	buttonText: {
		fontSize: theme.typography.fontSize.base,
		fontWeight: theme.typography.fontWeight.semibold,
		color: "white",
	},
	cardsContainer: {
		width: "100%",
		gap: theme.spacing.md,
		paddingHorizontal: theme.spacing.lg,
	},
	errorCard: {
		backgroundColor: "rgba(255, 255, 255, 0.4)",
		borderRadius: theme.borderRadius.xl,
		padding: theme.spacing.lg,
		borderWidth: 1,
		borderColor: "rgba(254, 202, 202, 0.5)",
	},
	errorCardContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.lg,
	},
	errorCardFlag: {
		width: 64,
		height: 48,
		borderRadius: theme.borderRadius.md,
	},
	errorCardTitle: {
		height: 20,
		borderRadius: theme.borderRadius.md,
		width: "75%",
	},
	errorCardSubtitle: {
		height: 16,
		borderRadius: theme.borderRadius.md,
		width: "50%",
	},
}));
