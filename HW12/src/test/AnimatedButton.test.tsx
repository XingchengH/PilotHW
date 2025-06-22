// AnimatedButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import AnimateButton from "../components/Button";
import { vi } from "vitest";

describe("AnimatedButton", () => {
  it("renders children correctly", () => {
    render(<AnimateButton>Click Me</AnimateButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  // it() focus on behavior-based tests
  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<AnimateButton onClick={onClick}>Click Me</AnimateButton>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies active animation class when isActive is true", () => {
    render(<AnimateButton isActive>Active Button</AnimateButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn");
  });
});
