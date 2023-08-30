import { fireEvent, screen, render, cleanup } from "@testing-library/react";
import { SignUp } from "../SignUp";

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

describe("SignUp", () => {
  afterEach(() => {
    cleanup();
  });
  test("should be values into SignUp", () => {
    render(<SignUp />);
    const emailInput = screen.getByTestId("email");
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "Angelo@gmail.com" } });
    expect(emailInput).toHaveValue("Angelo@gmail.com");
  });

  test("Should render error messagges when input fields are not valid", async () => {
    render(<SignUp />);
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const usernameInput = screen.getByTestId("username");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");

    fireEvent.blur(emailInput);
    fireEvent.blur(confirmPasswordInput);
    fireEvent.blur(usernameInput);
    fireEvent.blur(passwordInput);

    expect(await screen.findByText(/Required e-mail/)).toBeInTheDocument();
    expect(await screen.findByText(/Required password/)).toBeInTheDocument();
    expect(await screen.findByText(/Required username/)).toBeInTheDocument();
    expect(
      await screen.findByText(/Required confirm password/)
    ).toBeInTheDocument();
  });
});
