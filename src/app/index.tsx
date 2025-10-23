import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { CountryListItem } from "@/components/country-list-item";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useCountries } from "@/hooks/use-countries";

export default function HomeScreen() {
	const { data, isLoading, error, refetch } = useCountries();
	const [searchQuery, setSearchQuery] = useState("");
	const { theme, rt: runtime } = useUnistyles();

	if (isLoading) {
		return <LoadingState />;
	}

	if (error || !data) {
		return (
			<ErrorState
				onRetry={() => refetch()}
				message="Failed to load countries"
				submessage="Unable to fetch the list of countries"
			/>
		);
	}

	const filterCountries = () => {
		let filtered = data;

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter((country) => {
				const officialName = country.name.official.toLowerCase();
				const commonName = country.name.common?.toLowerCase() || "";
				const capital = country.capital?.[0]?.toLowerCase() || "";

				return (
					officialName.includes(query) ||
					commonName.includes(query) ||
					capital.includes(query)
				);
			});
		}

		return filtered;
	};

	const filteredCountries = filterCountries();

	return (
		<SafeAreaView
			edges={["top"]}
			style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", flex: 1 }}
		>
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
				<BlurView
					intensity={80}
					tint={runtime.themeName === "dark" ? "dark" : "light"}
				>
					<View style={styles.headerContainer}>
						<View style={styles.headerContent}>
							<LinearGradient
								colors={[
									theme.colors.accent.primary,
									theme.colors.accent.secondary,
								]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								style={styles.globeIcon}
							>
								<Ionicons name="globe-outline" size={22} color="white" />
							</LinearGradient>

							<View style={styles.titleSection}>
								<Text style={styles.title}>Countries</Text>
								<Text style={styles.subtitle}>Explore the world</Text>
							</View>

							<View style={styles.badge}>
								<Text style={styles.badgeText}>{filteredCountries.length}</Text>
							</View>
						</View>

						<View style={styles.searchContainer}>
							<View style={styles.searchIconContainer}>
								<Ionicons
									name="search"
									size={20}
									color={theme.colors.text.tertiary}
								/>
							</View>
							<TextInput
								value={searchQuery}
								onChangeText={setSearchQuery}
								placeholder="Search countries or capitals..."
								placeholderTextColor={theme.colors.text.secondary}
								style={styles.searchInput}
								autoCapitalize="none"
								autoCorrect={false}
								returnKeyType="search"
							/>
							{searchQuery.length > 0 && (
								<Pressable
									onPress={() => setSearchQuery("")}
									style={styles.clearButton}
									hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
								>
									<Ionicons
										name="close"
										size={18}
										color={theme.colors.text.secondary}
									/>
								</Pressable>
							)}
						</View>
					</View>
				</BlurView>

				<View style={styles.listContainer}>
					<FlashList
						data={filteredCountries}
						renderItem={({ item, index }) => (
							<CountryListItem item={item} index={index} />
						)}
						keyExtractor={(item) => item.name.official}
						contentContainerStyle={styles.listContent}
						ListEmptyComponent={() => (
							<View style={styles.emptyContainer}>
								<LinearGradient
									colors={[
										theme.colors.background.tertiary,
										theme.colors.border.primary,
									]}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 1 }}
									style={styles.emptyIcon}
								>
									<Ionicons
										name="search"
										size={32}
										color={theme.colors.text.tertiary}
									/>
								</LinearGradient>

								<Text style={styles.emptyTitle}>No countries found</Text>
								<Text style={styles.emptySubtitle}>
									Try a different search term
								</Text>
							</View>
						)}
					/>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	headerContainer: {
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing["2xl"],
		backgroundColor:
			rt.themeName === "dark"
				? "rgba(31, 41, 55, 0.8)"
				: "rgba(255, 255, 255, 0.8)",
		borderBottomWidth: 1,
		borderBottomColor:
			rt.themeName === "dark"
				? "rgba(55, 65, 81, 0.5)"
				: "rgba(229, 231, 235, 0.5)",
	},
	headerContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.md,
		marginBottom: theme.spacing.xl,
	},
	globeIcon: {
		width: 40,
		height: 40,
		borderRadius: theme.borderRadius.md,
		alignItems: "center",
		justifyContent: "center",
		...theme.shadows.sm,
	},
	titleSection: {
		flex: 1,
	},
	title: {
		fontSize: theme.typography.fontSize["2xl"],
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.primary,
	},
	subtitle: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.text.secondary,
	},
	badge: {
		backgroundColor: theme.colors.badge.background,
		paddingHorizontal: theme.spacing.md,
		paddingVertical: 6,
		borderRadius: theme.borderRadius.full,
	},
	badgeText: {
		fontSize: theme.typography.fontSize.sm,
		fontWeight: theme.typography.fontWeight.semibold,
		color: theme.colors.badge.text,
	},
	searchContainer: {
		position: "relative",
	},
	searchIconContainer: {
		position: "absolute",
		left: 12,
		top: 0,
		bottom: 0,
		justifyContent: "center",
		zIndex: 1,
	},
	searchInput: {
		paddingLeft: 40,
		paddingRight: 40,
		height: 48,
		backgroundColor: theme.colors.background.tertiary,
		borderWidth: 1,
		borderColor: theme.colors.border.primary,
		borderRadius: theme.borderRadius.md,
		fontSize: theme.typography.fontSize.base,
		color: theme.colors.text.primary,
		paddingVertical: 0,
	},
	clearButton: {
		position: "absolute",
		right: 12,
		top: 0,
		bottom: 0,
		justifyContent: "center",
	},
	listContainer: {
		flex: 1,
	},
	listContent: {
		paddingBottom: theme.spacing.lg,
		paddingTop: theme.spacing.lg,
	},
	emptyContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 64,
		paddingHorizontal: theme.spacing.lg,
		minHeight: 300,
	},
	emptyIcon: {
		width: 80,
		height: 80,
		borderRadius: theme.borderRadius.full,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: theme.spacing.lg,
	},
	emptyTitle: {
		fontSize: theme.typography.fontSize.base,
		fontWeight: theme.typography.fontWeight.semibold,
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.xs,
	},
	emptySubtitle: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.text.secondary,
	},
}));
