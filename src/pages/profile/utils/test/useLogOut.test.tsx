import { renderHook } from "@testing-library/react";
import { useLogOut } from "../useLogOut";

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

describe("useLogOut", () => {
  test("should log-out and navigate to Log-in", () => {
    const { result } = renderHook(useLogOut);
    result.current();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
