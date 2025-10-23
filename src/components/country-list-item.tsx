import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import type { Country } from "@/@types/countries";

interface CountryListItemProps {
	item: Country;
}

export function CountryListItem({ item }: CountryListItemProps) {
	const { theme } = useUnistyles();

	return (
		<View style={styles.container}>
			<Link href={`/country-details?name=${item.name.common}`} asChild>
				<Pressable style={styles.card}>
					<View style={styles.content}>
						<View style={styles.flagContainer}>
							<Image source={{ uri: item.flags.png }} style={styles.flag} />
						</View>

						<View style={styles.info}>
							<Text style={styles.name}>{item.name.common}</Text>
							{item.capital.length > 0 && (
								<View style={styles.capitalContainer}>
									<Ionicons
										name="location-outline"
										size={14}
										color={theme.colors.accent.indigo}
										style={styles.locationIcon}
									/>
									<Text style={styles.capital}>{item.capital[0]}</Text>
								</View>
							)}
						</View>

						<View style={styles.chevronContainer}>
							<Ionicons
								name="chevron-forward"
								size={18}
								color={theme.colors.text.tertiary}
							/>
						</View>
					</View>
				</Pressable>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		marginHorizontal: theme.spacing.lg,
		marginBottom: theme.spacing.md,
	},
	card: {
		backgroundColor: theme.colors.card.background,
		borderRadius: theme.borderRadius.xl,
		padding: theme.spacing.lg,
		...theme.shadows.card,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
	},
	flagContainer: {
		marginRight: theme.spacing.lg,
		...theme.shadows.flag,
	},
	flag: {
		width: 56,
		height: 40,
		borderRadius: theme.borderRadius.sm,
	},
	info: {
		flex: 1,
	},
	name: {
		fontSize: theme.typography.fontSize.base,
		fontWeight: theme.typography.fontWeight.bold,
		color: theme.colors.text.primary,
		marginBottom: theme.spacing.xs,
	},
	capitalContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	locationIcon: {
		marginRight: theme.spacing.xs,
	},
	capital: {
		fontSize: theme.typography.fontSize.sm,
		color: theme.colors.text.secondary,
	},
	chevronContainer: {
		width: 32,
		height: 32,
		backgroundColor: theme.colors.background.tertiary,
		borderRadius: theme.borderRadius.full,
		alignItems: "center",
		justifyContent: "center",
	},
}));
