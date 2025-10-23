import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { mockEuropeanCountries } from "@/__tests__/fixtures";
import HomeScreen from "../index";

const mockRefetch = jest.fn();
const mockUseCountries = jest.fn();

jest.mock("@/hooks/use-countries", () => ({
	useCountries: () => mockUseCountries(),
}));

const mockCountriesData = mockEuropeanCountries;

describe("HomeScreen", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = new QueryClient({
			defaultOptions: {
				queries: { retry: false },
			},
		});
		mockRefetch.mockClear();
		mockUseCountries.mockClear();
	});

	const renderWithProvider = (component: React.ReactElement) => {
		return render(
			<QueryClientProvider client={queryClient}>
				{component}
			</QueryClientProvider>,
		);
	};

	describe("Loading State", () => {
		it("displays loading state when data is being fetched", () => {
			mockUseCountries.mockReturnValue({
				data: undefined,
				isLoading: true,
				error: null,
				refetch: mockRefetch,
			});

			renderWithProvider(<HomeScreen />);

			expect(screen.getByText("Loading Countries")).toBeTruthy();
			expect(
				screen.getByText("Fetching data from around the world"),
			).toBeTruthy();
		});

		it("renders loading skeleton with correct structure", () => {
			mockUseCountries.mockReturnValue({
				data: undefined,
				isLoading: true,
				error: null,
				refetch: mockRefetch,
			});

			renderWithProvider(<HomeScreen />);

			expect(screen.getByTestId("icon-globe-outline")).toBeTruthy();
			expect(screen.getAllByTestId("skeleton-card")).toHaveLength(4);
		});
	});

	describe("Error State", () => {
		it("displays error state when there is an error", () => {
			mockUseCountries.mockReturnValue({
				data: undefined,
				isLoading: false,
				error: new Error("Network error"),
				refetch: mockRefetch,
			});

			renderWithProvider(<HomeScreen />);

			expect(screen.getByText("Failed to load countries")).toBeTruthy();
			expect(
				screen.getByText("Unable to fetch the list of countries"),
			).toBeTruthy();
		});

		it("displays error state when data is null", () => {
			mockUseCountries.mockReturnValue({
				data: null,
				isLoading: false,
				error: null,
				refetch: mockRefetch,
			});

			renderWithProvider(<HomeScreen />);

			expect(screen.getByText("Failed to load countries")).toBeTruthy();
		});

		it("calls refetch when retry button is pressed", () => {
			mockUseCountries.mockReturnValue({
				data: undefined,
				isLoading: false,
				error: new Error("Network error"),
				refetch: mockRefetch,
			});

			renderWithProvider(<HomeScreen />);

			const retryButton = screen.getByText("Try Again").parent;
			fireEvent.press(retryButton);

			expect(mockRefetch).toHaveBeenCalledTimes(1);
		});
	});

	describe("Success State - UI Elements", () => {
		beforeEach(() => {
			mockUseCountries.mockReturnValue({
				data: mockCountriesData,
				isLoading: false,
				error: null,
				refetch: mockRefetch,
			});
		});

		it("renders header with title and subtitle", () => {
			renderWithProvider(<HomeScreen />);

			expect(screen.getByText("Countries")).toBeTruthy();
			expect(screen.getByText("Explore the world")).toBeTruthy();
		});

		it("displays country count badge", () => {
			renderWithProvider(<HomeScreen />);

			expect(screen.getByText("3")).toBeTruthy();
		});

		it("renders search input with placeholder", () => {
			renderWithProvider(<HomeScreen />);

			expect(
				screen.getByPlaceholderText("Search countries or capitals..."),
			).toBeTruthy();
		});

		it("renders all countries in the list", () => {
			renderWithProvider(<HomeScreen />);

			expect(screen.getByText("Germany")).toBeTruthy();
			expect(screen.getByText("France")).toBeTruthy();
			expect(screen.getByText("Italy")).toBeTruthy();
		});
	});

	describe("Search Functionality", () => {
		beforeEach(() => {
			mockUseCountries.mockReturnValue({
				data: mockCountriesData,
				isLoading: false,
				error: null,
				refetch: mockRefetch,
			});
		});

		it("filters countries by common name", () => {
			renderWithProvider(<HomeScreen />);

			const searchInput = screen.getByPlaceholderText(
				"Search countries or capitals...",
			);
			fireEvent.changeText(searchInput, "Germany");

			expect(screen.getByText("Germany")).toBeTruthy();
			expect(screen.queryByText("France")).toBeNull();
			expect(screen.queryByText("Italy")).toBeNull();
		});

		it("filters countries by capital", () => {
			renderWithProvider(<HomeScreen />);

			const searchInput = screen.getByPlaceholderText(
				"Search countries or capitals...",
			);
			fireEvent.changeText(searchInput, "Paris");

			expect(screen.getByText("France")).toBeTruthy();
			expect(screen.queryByText("Germany")).toBeNull();
			expect(screen.queryByText("Italy")).toBeNull();
		});

		it("filters countries case-insensitively", () => {
			renderWithProvider(<HomeScreen />);

			const searchInput = screen.getByPlaceholderText(
				"Search countries or capitals...",
			);
			fireEvent.changeText(searchInput, "ITALY");

			expect(screen.getByText("Italy")).toBeTruthy();
			expect(screen.queryByText("Germany")).toBeNull();
		});

		it("updates country count badge when filtering", () => {
			renderWithProvider(<HomeScreen />);

			expect(screen.getByText("3")).toBeTruthy();

			const searchInput = screen.getByPlaceholderText(
				"Search countries or capitals...",
			);
			fireEvent.changeText(searchInput, "France");

			expect(screen.getByText("1")).toBeTruthy();
		});

		it("shows empty state when no countries match search", () => {
			renderWithProvider(<HomeScreen />);

			const searchInput = screen.getByPlaceholderText(
				"Search countries or capitals...",
			);
			fireEvent.changeText(searchInput, "XYZ123");

			expect(screen.getByText("No countries found")).toBeTruthy();
			expect(screen.getByText("Try a different search term")).toBeTruthy();
		});

		it("filters by official name", () => {
			renderWithProvider(<HomeScreen />);

			const searchInput = screen.getByPlaceholderText(
				"Search countries or capitals...",
			);
			fireEvent.changeText(searchInput, "Federal Republic");

			expect(screen.getByText("Germany")).toBeTruthy();
			expect(screen.queryByText("France")).toBeNull();
		});
	});

	describe("Empty State", () => {
		it("renders empty state with icon and message", () => {
			mockUseCountries.mockReturnValue({
				data: mockCountriesData,
				isLoading: false,
				error: null,
				refetch: mockRefetch,
			});

			renderWithProvider(<HomeScreen />);

			const searchInput = screen.getByPlaceholderText(
				"Search countries or capitals...",
			);
			fireEvent.changeText(searchInput, "NonExistentCountry");

			expect(screen.getByText("No countries found")).toBeTruthy();
			expect(screen.getByText("Try a different search term")).toBeTruthy();

			const searchIcons = screen.getAllByTestId("icon-search");
			expect(searchIcons.length).toBeGreaterThan(0);
		});
	});

	describe("Integration", () => {
		it("transitions from loading to success state", async () => {
			mockUseCountries.mockReturnValue({
				data: undefined,
				isLoading: true,
				error: null,
				refetch: mockRefetch,
			});

			const { rerender } = renderWithProvider(<HomeScreen />);

			expect(screen.getByText("Loading Countries")).toBeTruthy();

			mockUseCountries.mockReturnValue({
				data: mockCountriesData,
				isLoading: false,
				error: null,
				refetch: mockRefetch,
			});

			rerender(
				<QueryClientProvider client={queryClient}>
					<HomeScreen />
				</QueryClientProvider>,
			);

			expect(screen.getByText("Countries")).toBeTruthy();
			expect(screen.getByText("Germany")).toBeTruthy();
		});

		it("maintains search state after filtering", () => {
			mockUseCountries.mockReturnValue({
				data: mockCountriesData,
				isLoading: false,
				error: null,
				refetch: mockRefetch,
			});

			renderWithProvider(<HomeScreen />);

			const searchInput = screen.getByPlaceholderText(
				"Search countries or capitals...",
			);

			fireEvent.changeText(searchInput, "France");
			expect(screen.getByText("1")).toBeTruthy();

			fireEvent.changeText(searchInput, "Italy");
			expect(screen.getByText("1")).toBeTruthy();
			expect(screen.getByText("Italy")).toBeTruthy();
			expect(screen.queryByText("France")).toBeNull();
		});
	});
});
