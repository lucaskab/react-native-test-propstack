import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface SearchInputProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
}

export function SearchInput({
	value,
	onChangeText,
	placeholder = "Search...",
}: SearchInputProps) {
	const { theme } = useUnistyles();
	const [isFocused, setIsFocused] = useState(false);

	const handleClear = () => {
		onChangeText("");
	};

	return (
		<View style={styles.container}>
			<View
				testID="search-input-container"
				style={[
					styles.inputContainer,
					isFocused && {
						borderColor: theme.colors.accent.primary,
						...theme.shadows.sm,
					},
				]}
			>
				{/* Search Icon */}
				<Ionicons
					name="search"
					size={20}
					testID="search-icon"
					color={
						isFocused
							? theme.colors.accent.primary
							: theme.colors.text.secondary
					}
					style={styles.searchIcon}
				/>

				{/* Text Input */}
				<TextInput
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={theme.colors.text.secondary}
					style={styles.textInput}
					autoCapitalize="none"
					autoCorrect={false}
					returnKeyType="search"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>

				{/* Clear Button */}
				{value.length > 0 && (
					<Pressable
						onPress={handleClear}
						style={styles.clearButton}
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					>
						<Ionicons
							name="close-circle"
							size={20}
							color={theme.colors.text.secondary}
						/>
					</Pressable>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create((theme) => ({
	container: {
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.md,
		backgroundColor: "transparent",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: theme.borderRadius.md,
		borderWidth: 1,
		borderColor: theme.colors.border.primary,
		backgroundColor: theme.colors.background.secondary,
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.md,
	},
	searchIcon: {
		marginRight: theme.spacing.sm,
	},
	textInput: {
		flex: 1,
		fontSize: theme.typography.fontSize.base,
		fontWeight: theme.typography.fontWeight.medium,
		color: theme.colors.text.primary,
		paddingVertical: 0,
	},
	clearButton: {
		marginLeft: theme.spacing.sm,
		padding: theme.spacing.xs,
		borderRadius: theme.borderRadius.full,
	},
}));
