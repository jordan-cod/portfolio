import { render, screen } from "@testing-library/react";
import LanguageInfo from "@/components/shared/language-info/LanguageInfo";

describe("LanguageInfo component", () => {
    const props = {
        image: "/brasil-flag.png",
        alt: "Portuguese",
        language: "Portuguese",
        level: "Native",
    };

    it("renders the LanguageInfo component with props", () => {
        render(<LanguageInfo {...props} />);

        // Verifica se a imagem está presente no documento
        const imgElement = screen.getByAltText(props.alt);
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute(
            "src",
            expect.stringContaining(props.image),
        );

        // Verifica se a linguagem está presente no documento
        const languageElement = screen.getByText(props.language);
        expect(languageElement).toBeInTheDocument();

        // Verifica se o nível está presente no documento
        const levelElement = screen.getByText(props.level);
        expect(levelElement).toBeInTheDocument();
    });

    it("applies the correct CSS class", () => {
        render(<LanguageInfo {...props} />);
        const containerElement = screen
            .getByText(props.language)
            .closest("span");
        expect(containerElement).toHaveClass("language");
    });
});
