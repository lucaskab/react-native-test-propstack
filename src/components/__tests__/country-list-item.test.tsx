import { render, screen } from "@testing-library/react-native";
import { mockGermany } from "@/__tests__/fixtures";
import { CountryListItem } from "../country-list-item";

describe("CountryListItem", () => {
	it("renders country name correctly", () => {
		render(<CountryListItem item={mockGermany} />);

		expect(screen.getByText("Germany")).toBeTruthy();
	});

	it("renders capital when available", () => {
		render(<CountryListItem item={mockGermany} />);

		expect(screen.getByText("Berlin")).toBeTruthy();
	});

	it("renders flag image with correct URI", () => {
		render(<CountryListItem item={mockGermany} />);

		const flagImage = screen.getByTestId("expo-image");
		expect(flagImage.props.source.uri).toBe("https://flagcdn.com/w320/de.png");
	});

	it("creates link with correct country name in URL", () => {
		const { UNSAFE_root } = render(<CountryListItem item={mockGermany} />);

		const linkElement = UNSAFE_root.findByProps({ testID: "mock-link" });
		expect(linkElement.props["data-href"]).toBe(
			"/country-details?name=Germany",
		);
	});

	it("renders chevron icon", () => {
		render(<CountryListItem item={mockGermany} />);

		expect(screen.getByTestId("icon-chevron-forward")).toBeTruthy();
	});

	it("renders location icon when capital exists", () => {
		render(<CountryListItem item={mockGermany} />);

		expect(screen.getByTestId("icon-location-outline")).toBeTruthy();
	});

	it("handles multiple capitals by showing only the first one", () => {
		const multiCapitalCountry = {
			...mockGermany,
			capital: ["Amsterdam", "The Hague"],
		};

		render(<CountryListItem item={multiCapitalCountry} />);

		expect(screen.getByText("Amsterdam")).toBeTruthy();
		expect(screen.queryByText("The Hague")).toBeNull();
	});
});
