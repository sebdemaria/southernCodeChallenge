import "@testing-library/jest-dom";
import { Button } from "@/components/UI";
import { render, fireEvent, screen } from "@testing-library/react";

describe("Button", () => {
    it("should be disabled", () => {
        render(<Button disabled>Test</Button>);

        //select the elements you want to interact with
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should have class paginatorBtn", () => {
        render(<Button customClass={"paginatorBtn"}>Test</Button>);

        //select the elements you want to interact with
        expect(screen.getByRole("button")).toHaveClass("paginatorBtn");
    });

    it("should have type given", () => {
        render(<Button type="submit">Test</Button>);

        //select the elements you want to interact with
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("should execute OnClick", () => {
        const handleBool = jest.fn();

        render(<Button onClick={handleBool}>Test</Button>);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        //select the elements you want to interact with
        expect(handleBool).toHaveBeenCalledTimes(1);
    });

    it("should render children", () => {
        render(<Button>Prueba</Button>);

        const children = screen.getByText("Prueba");

        //select the elements you want to interact with
        expect(children).toBeDefined();
    });
});
