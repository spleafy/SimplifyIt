import { render, screen, cleanup } from "@testing-library/react";
import Button from "../Button";

afterEach(cleanup);

test("Primary button renders", () => {
  render(<Button variant="primary">Test Button</Button>);

  const button = screen.getByText(/Test Button/);

  expect(button).toBeInTheDocument();
});
