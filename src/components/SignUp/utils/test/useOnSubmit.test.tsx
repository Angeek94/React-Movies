import { renderHook } from "@testing-library/react";
import { useOnSubmit } from "../useOnSubmit";

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

describe("useOnSubmit", () => {
  test("App goes into Dashboard and dispatch user", () => {
    const { result } = renderHook(useOnSubmit);
    result.current({
      username: "Angelo",
      email: "Angelo@gmail.com",
      password: "Qwertyuiop123!",
      isLogged: true,
    });
    expect(mockedUseNavigate).toHaveBeenCalledWith("/dashboard");
  });
});
