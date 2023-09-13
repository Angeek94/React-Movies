import { renderHook } from "@testing-library/react";
import { useDeleteUser } from "../useDeleteUser";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

const mockedDispatch = jest.fn();

jest.mock("../../../../store/hooks", () => ({
  ...jest.requireActual("../../../../store/hooks"),
  useAppDispatch: () => mockedDispatch,
}));

describe("useDeleteUser", () => {
  test("should remove user and confirm remove", () => {
    const { result } = renderHook(useDeleteUser);
    result.current();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
