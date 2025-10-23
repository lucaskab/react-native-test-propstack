import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import type { Country } from "@/@types/countries";
import { useCountries } from "@/hooks/use-countries";

export default function CountryDetailsScreen() {
	const { name } = useLocalSearchParams<{ name: string }>();
	const { data } = useCountries();
	const { theme } = useUnistyles();
	const router = useRouter();

	if (!data) {
		return null;
	}

	const country = data.find((c) => c.name.common === name) as Country;

	const population = country.population.toLocaleString();
	const area = `${country.area.toLocaleString()} km²`;
	const languages = country.languages
		? Object.values(country.languages).join(", ")
		: "N/A";
	const currencies = Object.values(country.currencies)
		.map((c) => `${c.name} (${c.symbol})`)
		.join(", ");
	const capital = country.capital[0];
	const subregion = country.subregion;

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
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.headerContainer}>
					<View style={styles.flagWrapper}>
						<Image
							source={{ uri: country?.flags.png }}
							style={styles.flagImage}
						/>
						<LinearGradient
							colors={["transparent", "rgba(0,0,0,0.6)"]}
							style={styles.flagOverlay}
						/>
					</View>

					<SafeAreaView edges={["top"]} style={styles.backButtonContainer}>
						<Animated.View entering={FadeInUp.delay(300).springify()}>
							<Pressable
								onPress={() => router.back()}
								style={styles.backButton}
								hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
							>
								<Ionicons name="arrow-back" size={24} color="white" />
							</Pressable>
						</Animated.View>
					</SafeAreaView>

					<Animated.View
						style={styles.nameOverlay}
						entering={FadeInUp.delay(200).springify()}
					>
						<Text style={styles.countryName}>{country.name.common}</Text>
						<View style={styles.capitalRow}>
							<Ionicons
								name="location"
								size={18}
								color="rgba(255,255,255,0.9)"
							/>
							<Text style={styles.capitalText}>{capital}</Text>
						</View>
					</Animated.View>
				</View>

				<View style={styles.detailsContainer}>
					<Animated.View
						style={styles.detailCard}
						entering={FadeInDown.delay(400).springify()}
					>
						<LinearGradient
							colors={[
								theme.colors.accent.primary,
								theme.colors.accent.secondary,
							]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.iconContainer}
						>
							<Ionicons name="people" size={24} color="white" />
						</LinearGradient>
						<View style={styles.detailContent}>
							<Text style={styles.detailLabel}>Population</Text>
							<Text style={styles.detailValue}>{population}</Text>
						</View>
					</Animated.View>

					<Animated.View
						style={styles.detailCard}
						entering={FadeInDown.delay(500).springify()}
					>
						<LinearGradient
							colors={["#10B981", "#059669"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.iconContainer}
						>
							<Ionicons name="map" size={24} color="white" />
						</LinearGradient>
						<View style={styles.detailContent}>
							<Text style={styles.detailLabel}>Area</Text>
							<Text style={styles.detailValue}>{area}</Text>
						</View>
					</Animated.View>

					<Animated.View
						style={styles.detailCard}
						entering={FadeInDown.delay(600).springify()}
					>
						<LinearGradient
							colors={["#8B5CF6", "#7C3AED"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.iconContainer}
						>
							<Ionicons name="cash" size={24} color="white" />
						</LinearGradient>
						<View style={styles.detailContent}>
							<Text style={styles.detailLabel}>Currency</Text>
							<Text style={styles.detailValue}>{currencies}</Text>
						</View>
					</Animated.View>

					<Animated.View
						style={styles.detailCard}
						entering={FadeInDown.delay(700).springify()}
					>
						<LinearGradient
							colors={["#F59E0B", "#D97706"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.iconContainer}
						>
							<Ionicons name="language" size={24} color="white" />
						</LinearGradient>
						<View style={styles.detailContent}>
							<Text style={styles.detailLabel}>Languages</Text>
							<Text style={styles.detailValue}>{languages}</Text>
						</View>
					</Animated.View>

					<Animated.View
						style={styles.detailCard}
						entering={FadeInDown.delay(800).springify()}
					>
						<LinearGradient
							colors={["#6366F1", "#4F46E5"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.iconContainer}
						>
							<Ionicons name="globe" size={24} color="white" />
						</LinearGradient>
						<View style={styles.detailContent}>
							<Text style={styles.detailLabel}>Region</Text>
							<Text style={styles.detailValue}>{subregion}</Text>
						</View>
					</Animated.View>
				</View>
			</ScrollView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	headerContainer: {
		position: "relative",
		height: 320,
	},
	flagWrapper: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 320,
	},
	flagImage: {
		width: "100%",
		height: "100%",
	},
	flagOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 128,
	},
	backButtonContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 20,
	},
	backButton: {
		marginLeft: theme.spacing.lg,
		marginTop: theme.spacing.sm,
		width: 40,
		height: 40,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: theme.borderRadius.xl,
		alignItems: "center",
		justifyContent: "center",
		...theme.shadows.card,
	},
	nameOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
		zIndex: 10,
	},
	countryName: {
		fontSize: theme.typography.fontSize["2xl"],
		fontWeight: theme.typography.fontWeight.bold,
		color: "white",
		marginBottom: theme.spacing.sm,
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 8,
	},
	capitalRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.xs,
		marginBottom: theme.spacing.md,
	},
	capitalText: {
		fontSize: theme.typography.fontSize.base,
		color: "rgba(255, 255, 255, 0.9)",
		textShadowColor: "rgba(0, 0, 0, 0.75)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 4,
	},
	detailsContainer: {
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.xl,
		gap: theme.spacing.md,
	},
	detailCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: theme.colors.card.background,
		borderRadius: theme.borderRadius.xl,
		padding: theme.spacing.lg,
		gap: theme.spacing.lg,
		...theme.shadows.card,
	},
	iconContainer: {
		width: 48,
		height: 48,
		borderRadius: theme.borderRadius.xl,
		alignItems: "center",
		justifyContent: "center",
		...theme.shadows.sm,
	},
	detailContent: {
		flex: 1,
	},
	detailLabel: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.text.secondary,
		marginBottom: theme.spacing.xs,
	},
	detailValue: {
		fontSize: theme.typography.fontSize.base,
		fontWeight: theme.typography.fontWeight.semibold,
		color: theme.colors.text.primary,
	},
}));
