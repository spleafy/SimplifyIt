import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Form from "../form/Form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface TestComponentProps {
  submit: SubmitHandler<FieldValues>;
}

const TestComponent = ({ submit }: TestComponentProps) => {
  const { handleSubmit } = useForm();

  return (
    <Form submit={handleSubmit(submit)}>
      <input type="text" placeholder="input" />
      <button type="submit">Submit</button>
    </Form>
  );
};

afterEach(cleanup);

describe("Form Tests", () => {
  test("Form has rendered", async () => {
    render(<TestComponent submit={() => {}} />);

    const form = screen.getByTestId("form");

    expect(form).toBeInTheDocument();
  });

  test("Form has children rendered", () => {
    render(<TestComponent submit={() => {}} />);

    const input = screen.getByPlaceholderText(/input/i);

    expect(input).toBeInTheDocument();
  });

  test("Form Submits", async () => {
    const submitMock = jest.fn();

    render(<TestComponent submit={submitMock} />);

    const button = screen.getByText("Submit");

    fireEvent.click(button);

    await waitFor(() => expect(submitMock).toBeCalledTimes(1));
  });
});
