import { fireEvent, render, screen } from "@testing-library/react-native";
import { SearchInput } from "../search-input";

describe("SearchInput", () => {
	const mockOnChangeText = jest.fn();

	beforeEach(() => {
		mockOnChangeText.mockClear();
	});

	it("renders with empty value", () => {
		render(<SearchInput value="" onChangeText={mockOnChangeText} />);

		const input = screen.getByPlaceholderText("Search...");
		expect(input).toBeTruthy();
		expect(input.props.value).toBe("");
	});

	it("renders with provided value", () => {
		render(<SearchInput value="Brazil" onChangeText={mockOnChangeText} />);

		const input = screen.getByDisplayValue("Brazil");
		expect(input).toBeTruthy();
	});

	it("displays custom placeholder", () => {
		render(
			<SearchInput
				value=""
				onChangeText={mockOnChangeText}
				placeholder="Search countries..."
			/>,
		);

		expect(screen.getByPlaceholderText("Search countries...")).toBeTruthy();
	});

	it("calls onChangeText when user types", () => {
		render(<SearchInput value="" onChangeText={mockOnChangeText} />);

		const input = screen.getByPlaceholderText("Search...");
		fireEvent.changeText(input, "Canada");

		expect(mockOnChangeText).toHaveBeenCalledWith("Canada");
		expect(mockOnChangeText).toHaveBeenCalledTimes(1);
	});

	it("shows search icon", () => {
		render(<SearchInput value="" onChangeText={mockOnChangeText} />);

		expect(screen.getByTestId("search-icon")).toBeTruthy();
	});

	it("shows clear button when value is not empty", () => {
		render(<SearchInput value="France" onChangeText={mockOnChangeText} />);

		expect(screen.getByTestId("icon-close-circle")).toBeTruthy();
	});

	it("does not show clear button when value is empty", () => {
		render(<SearchInput value="" onChangeText={mockOnChangeText} />);

		expect(screen.queryByTestId("icon-close-circle")).toBeNull();
	});

	it("clears text when clear button is pressed", () => {
		render(<SearchInput value="Germany" onChangeText={mockOnChangeText} />);

		const clearButton = screen.getByTestId("icon-close-circle").parent;
		fireEvent.press(clearButton);

		expect(mockOnChangeText).toHaveBeenCalledWith("");
	});

	it("handles multiple text changes", () => {
		const { rerender } = render(
			<SearchInput value="" onChangeText={mockOnChangeText} />,
		);

		const input = screen.getByPlaceholderText("Search...");

		fireEvent.changeText(input, "A");
		expect(mockOnChangeText).toHaveBeenCalledWith("A");

		rerender(<SearchInput value="A" onChangeText={mockOnChangeText} />);

		fireEvent.changeText(input, "Au");
		expect(mockOnChangeText).toHaveBeenCalledWith("Au");

		rerender(<SearchInput value="Au" onChangeText={mockOnChangeText} />);

		fireEvent.changeText(input, "Aus");
		expect(mockOnChangeText).toHaveBeenCalledWith("Aus");

		expect(mockOnChangeText).toHaveBeenCalledTimes(3);
	});

	it("has correct text input props", () => {
		render(<SearchInput value="" onChangeText={mockOnChangeText} />);

		const input = screen.getByPlaceholderText("Search...");

		expect(input.props.autoCapitalize).toBe("none");
		expect(input.props.autoCorrect).toBe(false);
		expect(input.props.returnKeyType).toBe("search");
	});

	it("changes search icon color when focused", () => {
		render(<SearchInput value="" onChangeText={mockOnChangeText} />);

		const input = screen.getByPlaceholderText("Search...");
		const searchIcon = screen.getByTestId("search-icon");

		expect(searchIcon.props.color).toBe("#666");

		fireEvent(input, "focus");

		expect(searchIcon.props.color).toBe("#4f46e5");

		fireEvent(input, "blur");

		expect(searchIcon.props.color).toBe("#666");
	});

	it("applies focused styles to container when input is focused", () => {
		render(<SearchInput value="" onChangeText={mockOnChangeText} />);

		const input = screen.getByPlaceholderText("Search...");
		const container = screen.getByTestId("search-input-container");

		expect(container.props.style).toContainEqual(
			expect.objectContaining({
				borderColor: "#e5e5e5",
			}),
		);

		fireEvent(input, "focus");

		expect(container.props.style).toContainEqual(
			expect.objectContaining({
				borderColor: "#4f46e5",
			}),
		);

		fireEvent(input, "blur");

		expect(container.props.style).toContainEqual(
			expect.objectContaining({
				borderColor: "#e5e5e5",
			}),
		);
	});

	it("handles empty string after having value", () => {
		const { rerender } = render(
			<SearchInput value="Italy" onChangeText={mockOnChangeText} />,
		);

		expect(screen.getByTestId("icon-close-circle")).toBeTruthy();

		rerender(<SearchInput value="" onChangeText={mockOnChangeText} />);

		expect(screen.queryByTestId("icon-close-circle")).toBeNull();
	});
});
