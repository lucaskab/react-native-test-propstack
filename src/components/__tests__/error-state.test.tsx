import { fireEvent, render, screen } from "@testing-library/react-native";
import { ErrorState } from "../error-state";

describe("ErrorState", () => {
	const mockOnRetry = jest.fn();

	beforeEach(() => {
		mockOnRetry.mockClear();
	});

	it("renders with default messages", () => {
		render(<ErrorState onRetry={mockOnRetry} />);

		expect(screen.getByText("Oops! Something went wrong")).toBeTruthy();
		expect(screen.getByText("Failed to load countries")).toBeTruthy();
		expect(
			screen.getByText("Please check your connection and try again"),
		).toBeTruthy();
	});

	it("renders with custom props", () => {
		render(
			<ErrorState
				onRetry={mockOnRetry}
				message="Custom error message"
				submessage="Unable to fetch data"
			/>,
		);

		expect(screen.getByText("Custom error message")).toBeTruthy();
		expect(screen.getByText("Unable to fetch data")).toBeTruthy();
	});

	it("renders with both custom message and submessage", () => {
		render(
			<ErrorState
				onRetry={mockOnRetry}
				message="Network Error"
				submessage="Connection timeout"
			/>,
		);

		expect(screen.getByText("Network Error")).toBeTruthy();
		expect(screen.getByText("Connection timeout")).toBeTruthy();
	});

	it("calls onRetry when retry button is pressed", () => {
		render(<ErrorState onRetry={mockOnRetry} />);

		const retryButton = screen.getByText("Try Again").parent;
		fireEvent.press(retryButton);

		expect(mockOnRetry).toHaveBeenCalledTimes(1);
	});

	it("calls onRetry multiple times when pressed multiple times", () => {
		render(<ErrorState onRetry={mockOnRetry} />);

		const retryButton = screen.getByText("Try Again").parent;

		fireEvent.press(retryButton);
		fireEvent.press(retryButton);
		fireEvent.press(retryButton);

		expect(mockOnRetry).toHaveBeenCalledTimes(3);
	});

	it("renders retry button text", () => {
		render(<ErrorState onRetry={mockOnRetry} />);

		expect(screen.getByText("Try Again")).toBeTruthy();
	});

	it("renders wifi icon", () => {
		render(<ErrorState onRetry={mockOnRetry} />);

		expect(screen.getByTestId("icon-wifi-outline")).toBeTruthy();
	});

	it("renders alert icon", () => {
		render(<ErrorState onRetry={mockOnRetry} />);

		expect(screen.getByTestId("icon-alert-circle")).toBeTruthy();
	});

	it("renders refresh icon in button", () => {
		render(<ErrorState onRetry={mockOnRetry} />);

		expect(screen.getByTestId("icon-refresh")).toBeTruthy();
	});

	it("renders static description text", () => {
		render(<ErrorState onRetry={mockOnRetry} />);

		expect(
			screen.getByText("Please check your connection and try again"),
		).toBeTruthy();
	});

	it("maintains functionality after re-render", () => {
		const { rerender } = render(<ErrorState onRetry={mockOnRetry} />);

		rerender(
			<ErrorState onRetry={mockOnRetry} message="Updated error message" />,
		);

		expect(screen.getByText("Updated error message")).toBeTruthy();

		const retryButton = screen.getByText("Try Again").parent;
		fireEvent.press(retryButton);

		expect(mockOnRetry).toHaveBeenCalledTimes(1);
	});
});
