import { fireEvent, render, screen } from "@testing-library/react-native";
import { EmptyState } from "../empty-state";

describe("EmptyState", () => {
	const mockOnSelectSuggestion = jest.fn();

	beforeEach(() => {
		mockOnSelectSuggestion.mockClear();
	});

	it("displays all required UI elements", () => {
		render(<EmptyState onSelectSuggestion={mockOnSelectSuggestion} />);

		expect(screen.getByText("No countries found")).toBeTruthy();
		expect(
			screen.getByText("Try searching with a different term"),
		).toBeTruthy();

		expect(screen.getByTestId("icon-search")).toBeTruthy();
		expect(screen.getByTestId("icon-location")).toBeTruthy();
		expect(screen.getByTestId("icon-compass")).toBeTruthy();

		expect(screen.getByText("Suggestions:")).toBeTruthy();
		expect(screen.getByText("France")).toBeTruthy();
		expect(screen.getByText("Germany")).toBeTruthy();
		expect(screen.getByText("Italy")).toBeTruthy();
		expect(screen.getByText("Spain")).toBeTruthy();
	});

	it("calls onSelectSuggestion when Italy is pressed", () => {
		render(<EmptyState onSelectSuggestion={mockOnSelectSuggestion} />);

		const italyButton = screen.getByText("Italy");
		fireEvent.press(italyButton);

		expect(mockOnSelectSuggestion).toHaveBeenCalledTimes(1);
		expect(mockOnSelectSuggestion).toHaveBeenCalledWith("Italy");
	});

	it("all suggestion cards are pressable", () => {
		render(<EmptyState onSelectSuggestion={mockOnSelectSuggestion} />);

		const countries = ["France", "Germany", "Italy", "Spain"];

		countries.forEach((country) => {
			const button = screen.getByText(country);
			fireEvent.press(button);
		});

		expect(mockOnSelectSuggestion).toHaveBeenCalledTimes(4);
	});
});
