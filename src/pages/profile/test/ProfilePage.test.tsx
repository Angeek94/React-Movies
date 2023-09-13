import { PreloadedState } from "@reduxjs/toolkit";
import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { RootState, setupStore } from "../../../store/store";
import { ProfilePage } from "../ProfilePage";
import { Modal } from "antd";

const mockedUseNavigation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigation,
}));

jest.mock("../../../images/profile.jpg");
jest.mock("../../../images/logout.jpg");
jest.mock("../../../images/delete.jpg");

const mockedShowModal = jest.fn();
const mockedHandleOk = jest.fn();
const mockedHandleCancel = jest.fn();

jest.mock("../utils/useModal.tsx", () => ({
  useModal: () => ({
    showModal: mockedShowModal,
    handleOk: () => mockedHandleOk,
    handleCancel: () => mockedHandleCancel,
  }),
}));

const mockedHandleConfirmDeleteUser = jest.fn();

jest.mock("../utils/useDeleteUser.tsx", () => ({
  useDeleteUser: () => jest.fn(),
  handleConfirmDeleteUser: () => mockedHandleConfirmDeleteUser,
}));

const mockedHandleLogOut = jest.fn();

jest.mock("../utils/useLogOut.tsx", () => ({
  useLogOut: () => jest.fn(),
  handleLogOut: () => mockedHandleLogOut,
}));

const mockedDispatch = jest.fn();

jest.mock("../../../store/hooks", () => ({
  ...jest.requireActual("../../../store/hooks"),
  useAppDispatch: () => mockedDispatch,
}));

const renderProfilePageWithProvider = (
  preloadedState?: PreloadedState<RootState>
) =>
  render(
    <Provider store={setupStore(preloadedState)}>
      <ProfilePage />
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

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Modal: () => {
    return (
      <div>
        <button data-testid="cancelButton"></button>
      </div>
    );
  },
}));

describe("ProfilePage", () => {
  test("should appears Modal", () => {
    renderProfilePageWithProvider(preloadedState);
    fireEvent.click(screen.getByTestId("changePassword"));
    expect(mockedShowModal).toHaveBeenCalledTimes(1);
  });
});
