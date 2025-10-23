import { render, screen } from "@testing-library/react-native";
import { mockCountryNoCapital, mockGermany } from "@/__tests__/fixtures";
import { CountryListItem } from "../country-list-item";

describe("CountryListItem", () => {
	it("renders country name correctly", () => {
		render(<CountryListItem item={mockGermany} index={0} />);

		expect(screen.getByText("Germany")).toBeTruthy();
	});

	it("renders capital when available", () => {
		render(<CountryListItem item={mockGermany} index={0} />);

		expect(screen.getByText("Berlin")).toBeTruthy();
	});

	it("does not render capital section when capital array is empty", () => {
		render(<CountryListItem item={mockCountryNoCapital} index={0} />);

		expect(screen.queryByText("Berlin")).toBeNull();
		expect(screen.queryByTestId("icon-location-outline")).toBeNull();
	});

	it("renders flag image with correct URI", () => {
		render(<CountryListItem item={mockGermany} index={0} />);

		const flagImage = screen.getByTestId("expo-image");
		expect(flagImage.props.source.uri).toBe("https://flagcdn.com/w320/de.png");
	});

	it("creates link with correct country name in URL", () => {
		const { UNSAFE_root } = render(
			<CountryListItem item={mockGermany} index={0} />,
		);

		// Find the mock link element
		const linkElement = UNSAFE_root.findByProps({ testID: "mock-link" });
		expect(linkElement.props["data-href"]).toBe(
			"/country-details?name=Germany",
		);
	});

	it("renders chevron icon", () => {
		render(<CountryListItem item={mockGermany} index={0} />);

		expect(screen.getByTestId("icon-chevron-forward")).toBeTruthy();
	});

	it("renders location icon when capital exists", () => {
		render(<CountryListItem item={mockGermany} index={0} />);

		expect(screen.getByTestId("icon-location-outline")).toBeTruthy();
	});

	it("handles multiple capitals by showing only the first one", () => {
		const multiCapitalCountry = {
			...mockGermany,
			capital: ["Amsterdam", "The Hague"],
		};

		render(<CountryListItem item={multiCapitalCountry} index={0} />);

		expect(screen.getByText("Amsterdam")).toBeTruthy();
		expect(screen.queryByText("The Hague")).toBeNull();
	});
});
