import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../styles/unistyles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen
					name="country-details"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
			<StatusBar style="auto" />
		</QueryClientProvider>
	);
}
