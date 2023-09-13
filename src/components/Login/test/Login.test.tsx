import { fireEvent, screen, render, cleanup } from "@testing-library/react";
import { Login } from "../Login";
import { RootState, setupStore } from "../../../store/store";
import { Provider } from "react-redux";
import { PreloadedState } from "@reduxjs/toolkit";

const mockedUseNavigation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigation,
}));

jest.mock("../utils/useOnSubmit.ts", () => ({
  useOnSubmit: () => jest.fn(),
}));

const renderLoginWithProvider = (preloadedState?: PreloadedState<RootState>) =>
  render(
    <Provider store={setupStore(preloadedState)}>
      <Login />
    </Provider>
  );

const preloadedState: PreloadedState<RootState> = {
  user: {
    email: "mock@email",
    username: "mockUsername",
    password: "mockPassword",
    isLogged: false,
  },
};
describe("Login Component", () => {
  afterEach(() => {
    cleanup();
  });
  test("should be values insert into expect", () => {
    renderLoginWithProvider(preloadedState);
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");

    fireEvent.change(emailInput, { target: { value: "Angelo@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "Qwertyuiop123!" } });
    expect(screen.getByRole("button")).toBeEnabled();
  });

  test("Should render error messagges when input fields are not valid", async () => {
    renderLoginWithProvider(preloadedState);
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const loginButton = screen.queryByTestId("login-button");

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    expect(await screen.findByText(/Required e-mail/)).toBeInTheDocument();
    expect(await screen.findByText(/Required password/)).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
});
