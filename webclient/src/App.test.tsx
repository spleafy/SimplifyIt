import { render, screen } from "@testing-library/react";
import App from "./App";
// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

test("App renders correctly", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
});
