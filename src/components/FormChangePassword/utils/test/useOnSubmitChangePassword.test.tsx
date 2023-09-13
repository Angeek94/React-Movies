import { useOnSubmitChangePassword } from "../useOnSubmitChangePassword";
import { renderHook } from "@testing-library/react";

const mockedDispatch = jest.fn();

jest.mock("../../../../store/hooks", () => ({
  ...jest.requireActual("../../../../store/hooks"),
  useAppDispatch: () => mockedDispatch,
}));

const mockedHandleOk: () => void = jest.fn();

describe("useOnSubmitChangePassword", () => {
  test("should change password", () => {
    const { result } = renderHook(() =>
      useOnSubmitChangePassword(mockedHandleOk)
    );
    result.current({ password: "new" });

    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedHandleOk).toHaveBeenCalledTimes(1);
  });
});
