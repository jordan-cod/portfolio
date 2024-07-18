// components/ScrollToTopButton.test.tsx

import { render, fireEvent } from "@testing-library/react";
import ScrollToTopButton from "@/components/shared/buttons/scroll-to-top-button/scrollToTopButton";

describe("ScrollToTopButton", () => {
    it("should render without errors", () => {
        render(<ScrollToTopButton />);
    });

    it("should call scrollToTop function when button is clicked", () => {
        const { getByLabelText } = render(<ScrollToTopButton />);
        const button = getByLabelText("Scroll to top");
        const scrollToSpy = jest.spyOn(window, "scrollTo");

        fireEvent.click(button);

        expect(scrollToSpy).toHaveBeenCalledWith({
            top: 0,
            behavior: "smooth",
        });
    });

    it("should show button when scrolled down and hide when scrolled up", () => {
        const { getByLabelText, container } = render(<ScrollToTopButton />);
        const button = getByLabelText("Scroll to top");

        // Mock window scroll position
        Object.defineProperty(window, "scrollY", { value: 350 });

        fireEvent.scroll(window);

        expect(container.firstChild).toHaveClass("visible");

        // Mock window scroll position back to top
        Object.defineProperty(window, "scrollY", { value: 250 });

        fireEvent.scroll(window);

        expect(container.firstChild).not.toHaveClass("visible");
    });
});
