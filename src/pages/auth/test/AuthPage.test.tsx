import { screen, render, cleanup } from "@testing-library/react";
import { RootState, setupStore } from "../../../store/store";
import { Provider } from "react-redux";
import { PreloadedState } from "@reduxjs/toolkit";
import { AuthPage } from "../AuthPage";

jest.mock("../../../components/Login/Login", () => ({
  Login: () => {
    return <div data-testid="login" />;
  },
}));

jest.mock("../../../components/SignUp/SignUp", () => ({
  SignUp: () => {
    return <div data-testid="signup" />;
  },
}));

const mockedUseNavigation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigation,
}));

const mockedDispatch = jest.fn();

jest.mock("../../../store/hooks", () => ({
  ...jest.requireActual("../../../store/hooks"),
  useAppDispatch: () => mockedDispatch,
}));

const renderAuthPageWithProvider = (
  preloadedState?: PreloadedState<RootState>
) =>
  render(
    <Provider store={setupStore(preloadedState)}>
      <AuthPage />
    </Provider>
  );

const preloadedState = (label: string) => {
  switch (label) {
    case "signup": {
      return {
        email: "",
        username: "",
        password: "",
        isLogged: false,
      };
    }
    case "login": {
      return {
        email: "mock@email",
        username: "mockUsername",
        password: "mockPassword",
        isLogged: false,
      };
    }
    case "navigate": {
      return {
        email: "mock@email",
        username: "mockUsername",
        password: "mockPassword",
        isLogged: true,
      };
    }
  }
};

describe("AuthPage", () => {
  afterEach(() => cleanup());

  test("should render Login", () => {
    renderAuthPageWithProvider({ user: preloadedState("login") });
    expect(screen.getByTestId("login")).toBeInTheDocument();
  });

  test("should be render SignUp", () => {
    renderAuthPageWithProvider({ user: preloadedState("signup") });
    expect(screen.getByTestId("signup")).toBeInTheDocument();
  });

  test("should be render", () => {
    renderAuthPageWithProvider({ user: preloadedState("navigate") });
    expect(mockedUseNavigation).toHaveBeenCalledWith("/dashboard");
  });
});
