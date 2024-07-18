import { render, screen } from "@testing-library/react";
import Tag from "@/components/shared/tag/Tag";

describe("Tag component", () => {
    it("renders the Tag component with children", () => {
        const children = "CSS";
        render(<Tag>{children}</Tag>);

        const tagElement = screen.getByText(children);
        expect(tagElement).toBeInTheDocument();

        expect(tagElement).toHaveClass("tag");
    });
});
