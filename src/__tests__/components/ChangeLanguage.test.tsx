import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ChangeLanguage from "@/components/shared/buttons/change-language/ChangeLanguage";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

const mockPush = jest.fn();

beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
    });
    // Simula o pathname no window.location
    Object.defineProperty(window, "location", {
        value: {
            pathname: "/en",
        },
        writable: true,
    });
});

describe("ChangeLanguage Component", () => {
    test("renders correctly", () => {
        render(<ChangeLanguage />);
        expect(screen.getByRole("button")).toBeDefined();
    });

    test("opens and closes dropdown on button click", () => {
        render(<ChangeLanguage />);

        const button = screen.getByRole("button");

        // Initially, dropdown should not be visible
        expect(screen.queryByText("English")).toBeNull();
        expect(screen.queryByText("Português")).toBeNull();

        // Click button to open dropdown
        fireEvent.click(button);
        expect(screen.getByText("English")).toBeDefined();
        expect(screen.getByText("Português")).toBeDefined();

        // Click button again to close dropdown
        fireEvent.click(button);
        expect(screen.queryByText("English")).toBeNull();
        expect(screen.queryByText("Português")).toBeNull();
    });

    test("closes dropdown when clicking outside", () => {
        render(<ChangeLanguage />);

        const button = screen.getByRole("button");
        fireEvent.click(button); // Open dropdown

        expect(screen.getByText("English")).toBeDefined();
        expect(screen.getByText("Português")).toBeDefined();

        // Simulate click outside
        fireEvent.mouseDown(document);
        expect(screen.queryByText("English")).toBeNull();
        expect(screen.queryByText("Português")).toBeNull();
    });

    test("changes language correctly", () => {
        render(<ChangeLanguage />);

        fireEvent.click(screen.getByTestId("change-lang-button")); // Open dropdown

        // Click the English button by ID
        fireEvent.click(screen.getByTestId("lang-en"));
        expect(mockPush).toHaveBeenCalledWith("/en");

        fireEvent.click(screen.getByTestId("change-lang-button"));

        // Click the Portuguese button by ID
        fireEvent.click(screen.getByTestId("lang-pt-br"));
        expect(mockPush).toHaveBeenCalledWith("/pt-br");
    });
});
