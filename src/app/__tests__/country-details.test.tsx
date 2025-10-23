import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react-native";
import type { Country } from "@/@types/countries";
import { mockFrance, mockGermany } from "@/__tests__/fixtures";
import CountryDetailsScreen from "../country-details";

const mockBack = jest.fn();
const mockUseRouter = jest.fn(() => ({
	back: mockBack,
	push: jest.fn(),
	replace: jest.fn(),
}));

const mockUseLocalSearchParams = jest.fn();

jest.mock("expo-router", () => ({
	...jest.requireActual("expo-router"),
	useRouter: () => mockUseRouter(),
	useLocalSearchParams: () => mockUseLocalSearchParams(),
}));

const mockUseCountries = jest.fn();

jest.mock("@/hooks/use-countries", () => ({
	useCountries: () => mockUseCountries(),
}));

describe("CountryDetailsScreen", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = new QueryClient({
			defaultOptions: {
				queries: { retry: false },
			},
		});
		mockBack.mockClear();
		mockUseRouter.mockClear();
		mockUseLocalSearchParams.mockClear();
		mockUseCountries.mockClear();
	});

	const renderWithProvider = (component: React.ReactElement) => {
		return render(
			<QueryClientProvider client={queryClient}>
				{component}
			</QueryClientProvider>,
		);
	};

	describe("Basic Rendering", () => {
		it("renders country details when data is available", () => {
			mockUseLocalSearchParams.mockReturnValue({ name: "Germany" });
			mockUseCountries.mockReturnValue({
				data: [mockGermany],
			});

			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Germany")).toBeTruthy();
			expect(screen.getByText("Berlin")).toBeTruthy();
		});

		it("returns null when no data is available", () => {
			mockUseLocalSearchParams.mockReturnValue({ name: "Germany" });
			mockUseCountries.mockReturnValue({
				data: null,
			});

			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.queryByText("Germany")).toBeNull();
			expect(screen.queryByText("Population")).toBeNull();
		});

		it("finds and displays correct country from data array", () => {
			mockUseLocalSearchParams.mockReturnValue({ name: "France" });
			mockUseCountries.mockReturnValue({
				data: [mockGermany, mockFrance],
			});

			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("France")).toBeTruthy();
			expect(screen.getByText("Paris")).toBeTruthy();
			expect(screen.queryByText("Germany")).toBeNull();
		});
	});

	describe("Flag and Header", () => {
		beforeEach(() => {
			mockUseLocalSearchParams.mockReturnValue({ name: "Germany" });
			mockUseCountries.mockReturnValue({
				data: [mockGermany],
			});
		});

		it("renders flag image with correct source", () => {
			renderWithProvider(<CountryDetailsScreen />);

			const flagImage = screen.getByTestId("expo-image");
			expect(flagImage.props.source.uri).toBe(
				"https://flagcdn.com/w320/de.png",
			);
		});

		it("renders country name in header", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Germany")).toBeTruthy();
		});

		it("renders capital city with location icon", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Berlin")).toBeTruthy();
			expect(screen.getByTestId("icon-location")).toBeTruthy();
		});

		it("renders back button", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByTestId("icon-arrow-back")).toBeTruthy();
		});

		it("navigates back when back button is pressed", () => {
			renderWithProvider(<CountryDetailsScreen />);

			const backButton = screen.getByTestId("icon-arrow-back").parent;
			fireEvent.press(backButton);

			expect(mockBack).toHaveBeenCalledTimes(1);
		});
	});

	describe("Detail Cards", () => {
		beforeEach(() => {
			mockUseLocalSearchParams.mockReturnValue({ name: "Germany" });
			mockUseCountries.mockReturnValue({
				data: [mockGermany],
			});
		});

		it("renders population card with formatted number", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Population")).toBeTruthy();
			expect(screen.getByText("83,783,942")).toBeTruthy();
			expect(screen.getByTestId("icon-people")).toBeTruthy();
		});

		it("renders area card with formatted value", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Area")).toBeTruthy();
			expect(screen.getByText("357,114 km²")).toBeTruthy();
			expect(screen.getByTestId("icon-map")).toBeTruthy();
		});

		it("renders currency card with name and symbol", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Currency")).toBeTruthy();
			expect(screen.getByText("Euro (€)")).toBeTruthy();
			expect(screen.getByTestId("icon-cash")).toBeTruthy();
		});

		it("renders languages card with comma-separated values", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Languages")).toBeTruthy();
			expect(screen.getByText("German")).toBeTruthy();
			expect(screen.getByTestId("icon-language")).toBeTruthy();
		});

		it("renders region card with subregion", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Region")).toBeTruthy();
			expect(screen.getByText("Western Europe")).toBeTruthy();
			expect(screen.getByTestId("icon-globe")).toBeTruthy();
		});
	});

	describe("Formatting and Edge Cases", () => {
		it("formats large population numbers with commas", () => {
			mockUseLocalSearchParams.mockReturnValue({ name: "France" });
			mockUseCountries.mockReturnValue({
				data: [mockFrance],
			});

			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("67,391,582")).toBeTruthy();
		});

		it("formats large area numbers with commas and km²", () => {
			mockUseLocalSearchParams.mockReturnValue({ name: "France" });
			mockUseCountries.mockReturnValue({
				data: [mockFrance],
			});

			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("551,695 km²")).toBeTruthy();
		});

		it("handles multiple currencies", () => {
			const multiCurrencyCountry: Country = {
				...mockGermany,
				currencies: {
					EUR: { name: "Euro", symbol: "€" },
					CHF: { name: "Swiss franc", symbol: "Fr" },
				},
			};

			mockUseLocalSearchParams.mockReturnValue({ name: "Germany" });
			mockUseCountries.mockReturnValue({
				data: [multiCurrencyCountry],
			});

			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Currency")).toBeTruthy();
			expect(screen.getByText("Euro (€), Swiss franc (Fr)")).toBeTruthy();
		});

		it("handles multiple languages", () => {
			const multiLanguageCountry: Country = {
				...mockGermany,
				languages: {
					deu: "German",
					fra: "French",
					ita: "Italian",
				},
			};

			mockUseLocalSearchParams.mockReturnValue({ name: "Germany" });
			mockUseCountries.mockReturnValue({
				data: [multiLanguageCountry],
			});

			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Languages")).toBeTruthy();
			expect(screen.getByText("German, French, Italian")).toBeTruthy();
		});
	});

	describe("Icons", () => {
		beforeEach(() => {
			mockUseLocalSearchParams.mockReturnValue({ name: "Germany" });
			mockUseCountries.mockReturnValue({
				data: [mockGermany],
			});
		});

		it("renders all detail card icons", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByTestId("icon-people")).toBeTruthy();
			expect(screen.getByTestId("icon-map")).toBeTruthy();
			expect(screen.getByTestId("icon-cash")).toBeTruthy();
			expect(screen.getByTestId("icon-language")).toBeTruthy();
			expect(screen.getByTestId("icon-globe")).toBeTruthy();
		});

		it("renders location icon for capital", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByTestId("icon-location")).toBeTruthy();
		});

		it("renders back arrow icon", () => {
			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByTestId("icon-arrow-back")).toBeTruthy();
		});
	});

	describe("Integration", () => {
		it("displays all information for a complete country data", () => {
			mockUseLocalSearchParams.mockReturnValue({ name: "Germany" });
			mockUseCountries.mockReturnValue({
				data: [mockGermany],
			});

			renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Germany")).toBeTruthy();
			expect(screen.getByText("Berlin")).toBeTruthy();

			expect(screen.getByText("Population")).toBeTruthy();
			expect(screen.getByText("83,783,942")).toBeTruthy();
			expect(screen.getByText("Area")).toBeTruthy();
			expect(screen.getByText("357,114 km²")).toBeTruthy();
			expect(screen.getByText("Currency")).toBeTruthy();
			expect(screen.getByText("Euro (€)")).toBeTruthy();
			expect(screen.getByText("Languages")).toBeTruthy();
			expect(screen.getByText("German")).toBeTruthy();
			expect(screen.getByText("Region")).toBeTruthy();
			expect(screen.getByText("Western Europe")).toBeTruthy();

			expect(screen.getByTestId("icon-arrow-back")).toBeTruthy();
			expect(screen.getByTestId("icon-location")).toBeTruthy();
			expect(screen.getByTestId("icon-people")).toBeTruthy();
			expect(screen.getByTestId("icon-map")).toBeTruthy();
			expect(screen.getByTestId("icon-cash")).toBeTruthy();
			expect(screen.getByTestId("icon-language")).toBeTruthy();
			expect(screen.getByTestId("icon-globe")).toBeTruthy();
		});

		it("correctly switches between different countries", () => {
			mockUseLocalSearchParams.mockReturnValue({ name: "Germany" });
			mockUseCountries.mockReturnValue({
				data: [mockGermany, mockFrance],
			});

			const { rerender } = renderWithProvider(<CountryDetailsScreen />);

			expect(screen.getByText("Germany")).toBeTruthy();

			mockUseLocalSearchParams.mockReturnValue({ name: "France" });

			rerender(
				<QueryClientProvider client={queryClient}>
					<CountryDetailsScreen />
				</QueryClientProvider>,
			);

			expect(screen.getByText("France")).toBeTruthy();
			expect(screen.getByText("Paris")).toBeTruthy();
			expect(screen.queryByText("Germany")).toBeNull();
		});
	});
});
