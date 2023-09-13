import { PreloadedState } from "@reduxjs/toolkit";
import { RootState, setupStore } from "../../../store/store";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { FormChangePassword } from "../FormChangePassword";

const mockedHandleCancel = jest.fn();

const mockedHandleOk = jest.fn();

jest.mock("../utils/useOnSubmitChangePassword.ts", () => ({
  useOnSubmitChangePassword: () => jest.fn(),
}));

const renderFormChangePasswordWithProvider = (
  preloadedState?: PreloadedState<RootState>
) =>
  render(
    <Provider store={setupStore(preloadedState)}>
      <FormChangePassword
        handleOnOk={mockedHandleOk}
        handleOnCancel={mockedHandleCancel}
      />
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

describe("FormChangePassword", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("should works HandleCancel", () => {
    renderFormChangePasswordWithProvider(preloadedState);
    fireEvent.click(screen.getByTestId("cancelButton"));
    expect(mockedHandleCancel).toHaveBeenCalled();
  });

  test("Should render error messagges when input fields are not valid", async () => {
    renderFormChangePasswordWithProvider(preloadedState);
    const oldPasswordInput = screen.getByTestId("oldPassword");
    const newPasswordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");
    const changeButton = screen.getByTestId("changeButton");

    fireEvent.blur(oldPasswordInput);
    fireEvent.blur(newPasswordInput);
    fireEvent.blur(confirmPasswordInput);
    expect(
      await screen.findByText(/Required old password/)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Required password/)).toBeInTheDocument();
    expect(
      await screen.findByText(/Required confirm password/)
    ).toBeInTheDocument();
    expect(changeButton).toBeDisabled();
  });

  test("Should execute submit for change password", () => {
    renderFormChangePasswordWithProvider(preloadedState);
    const oldPasswordInput = screen.getByTestId("oldPassword");
    const newPasswordInput = screen.getByTestId("password");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");
    const changeButton = screen.getByTestId("changeButton");

    fireEvent.change(oldPasswordInput, { target: { value: "Qwertyuiop123!" } });
    fireEvent.change(newPasswordInput, { target: { value: "Asdfghjkl123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Asdfghjkl123!" },
    });
    expect(changeButton).toBeEnabled();
  });
});
