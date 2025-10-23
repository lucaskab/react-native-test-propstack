import { render, screen } from "@testing-library/react-native";
import { LoadingState } from "../loading-state";

describe("LoadingState", () => {
	it("renders with default messages", () => {
		render(<LoadingState />);

		expect(screen.getByText("Loading Countries")).toBeTruthy();
		expect(
			screen.getByText("Fetching data from around the world"),
		).toBeTruthy();
	});

	it("renders with custom message", () => {
		render(<LoadingState message="Loading Data" />);

		expect(screen.getByText("Loading Data")).toBeTruthy();
		expect(
			screen.getByText("Fetching data from around the world"),
		).toBeTruthy();
	});

	it("renders with custom submessage", () => {
		render(<LoadingState submessage="Please wait while we get the data" />);

		expect(screen.getByText("Loading Countries")).toBeTruthy();
		expect(screen.getByText("Please wait while we get the data")).toBeTruthy();
	});

	it("renders with both custom message and submessage", () => {
		render(
			<LoadingState
				message="Fetching Countries"
				submessage="This may take a moment"
			/>,
		);

		expect(screen.getByText("Fetching Countries")).toBeTruthy();
		expect(screen.getByText("This may take a moment")).toBeTruthy();
	});

	it("renders globe icon", () => {
		render(<LoadingState />);

		expect(screen.getByTestId("icon-globe-outline")).toBeTruthy();
	});

	it("renders skeleton cards", () => {
		render(<LoadingState />);

		// The component renders exactly 4 skeleton cards to show loading state
		const skeletonCards = screen.getAllByTestId("skeleton-card");
		expect(skeletonCards).toHaveLength(4);

		// Verify the overall loading state structure
		expect(screen.getByText("Loading Countries")).toBeTruthy();
		expect(screen.getByTestId("icon-globe-outline")).toBeTruthy();
	});

	it("renders animated dots text", () => {
		render(<LoadingState />);

		expect(screen.getByText("...")).toBeTruthy();
	});

	it("handles re-render with different props", () => {
		const { rerender } = render(<LoadingState message="Loading..." />);

		expect(screen.getByText("Loading...")).toBeTruthy();

		rerender(<LoadingState message="Still loading..." />);

		expect(screen.getByText("Still loading...")).toBeTruthy();
		expect(screen.queryByText("Loading...")).toBeNull();
	});

	it("maintains structure after multiple renders", () => {
		const { rerender } = render(<LoadingState />);

		// First render
		expect(screen.getByText("Loading Countries")).toBeTruthy();
		expect(screen.getByTestId("icon-globe-outline")).toBeTruthy();
		expect(screen.getAllByTestId("skeleton-card")).toHaveLength(4);

		// Re-render with same props
		rerender(<LoadingState />);

		expect(screen.getByText("Loading Countries")).toBeTruthy();
		expect(screen.getByTestId("icon-globe-outline")).toBeTruthy();
		expect(screen.getAllByTestId("skeleton-card")).toHaveLength(4);
	});

	it("displays all required UI elements", () => {
		render(<LoadingState />);

		// Title and subtitle
		expect(screen.getByText("Loading Countries")).toBeTruthy();
		expect(
			screen.getByText("Fetching data from around the world"),
		).toBeTruthy();

		// Animated dots
		expect(screen.getByText("...")).toBeTruthy();

		// Globe icon
		expect(screen.getByTestId("icon-globe-outline")).toBeTruthy();

		// Skeleton cards
		expect(screen.getAllByTestId("skeleton-card")).toHaveLength(4);
	});
});
