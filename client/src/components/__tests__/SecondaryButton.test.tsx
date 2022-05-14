import { render, screen, cleanup } from "@testing-library/react";
import Button from "../Button";

afterEach(cleanup);

test("Secondary button renders", () => {
  render(<Button variant="secondary">Test Button</Button>);

  const button = screen.getByText(/Test Button/);

  expect(button).toBeInTheDocument();
});
