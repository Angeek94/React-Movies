import { PreloadedState } from "@reduxjs/toolkit";
import { ModalChangePassword } from "../ModalChangePassword";
import { RootState, setupStore } from "../../../store/store";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { FormChangePassword } from "../../FormChangePassword/FormChangePassword";
import { IFormChangePassword } from "../../../interfaces/IFormChangePassword";
const mockedSetIsModalOpen = jest.fn();

const mockedHandleOk = jest.fn();
const mockedHandleCancel = jest.fn();

jest.mock("../../../pages/profile/utils/useModal.tsx", () => ({
  useModal: () => ({
    handleOk: mockedHandleOk,
    handleCancel: mockedHandleCancel,
  }),
}));

jest.mock("../../FormChangePassword/FormChangePassword.tsx", () => ({
  FormChangePassword: (props: IFormChangePassword) => (
    <div data-testid="form" onClick={props.handleOnOk}></div>
  ),
}));

const renderModalChangePasswordWithProvider = (
  preloadedState?: PreloadedState<RootState>
) =>
  render(
    <Provider store={setupStore(preloadedState)}>
      <ModalChangePassword
        isModalOpen={true}
        setIsModalOpen={mockedSetIsModalOpen}
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

describe("ModalChangePassword", () => {
  afterEach(() => {
    cleanup();
  });
  test("should work HandleCancel", () => {
    renderModalChangePasswordWithProvider(preloadedState);
    fireEvent.click(screen.getByRole("button"));
    expect(mockedHandleCancel).toHaveBeenCalled();
  });

  test("should have a method", () => {
    renderModalChangePasswordWithProvider(preloadedState);
    fireEvent.click(screen.getByTestId("form"));
    expect(mockedHandleOk).toHaveBeenCalled();
  });
});
