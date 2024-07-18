import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PrimaryButton from "@/components/shared/buttons/primary-button/primaryButton";

describe("PrimaryButton Component", () => {
    test("renders button correctly", () => {
        const { getByText } = render(<PrimaryButton>Click me</PrimaryButton>);
        const buttonElement = getByText("Click me");
        expect(buttonElement).toBeInTheDocument();
    });

    test("calls onClick function when clicked", () => {
        const onClickMock = jest.fn();
        const { getByText } = render(
            <PrimaryButton onClick={onClickMock}>Click me</PrimaryButton>,
        );
        const buttonElement = getByText("Click me");
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalled();
    });

    test("button is disabled when disabled prop is true", () => {
        const { getByText } = render(
            <PrimaryButton disabled>Click me</PrimaryButton>,
        );
        const buttonElement = getByText("Click me") as HTMLButtonElement;
        expect(buttonElement.disabled).toBe(true);
    });

    test("button has correct styles when disabled", () => {
        const { getByText } = render(
            <PrimaryButton disabled>Click me</PrimaryButton>,
        );
        const buttonElement = getByText("Click me");
        expect(buttonElement).toHaveClass("disabled");
    });
});
