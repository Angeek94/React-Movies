import reducer, {
  setUser,
  changePassword,
  deleteUser,
  setIsLogged,
} from "../slices/userSlice";
import { IUser } from "../../interfaces/IUser";

const initialUser = ({
  email = "mock@email",
  username = "mock",
  password = "mock",
  isLogged = true,
}: Partial<IUser>): IUser => ({
  email,
  username,
  password,
  isLogged,
});

describe("userSlice", () => {
  test("Should get user reducer", () => {
    const userLocalStorage: IUser = {
      email: "mock@email",
      username: "mock",
      password: "mock",
      isLogged: true,
    };

    expect(
      reducer(
        initialUser({
          username: "",
          email: "",
          password: "",
          isLogged: false,
        }),
        setUser(userLocalStorage)
      )
    ).toEqual(userLocalStorage);
  });

  test("Should change password reducer", () => {
    const userLocalStorage: IUser = {
      email: "mock@email",
      username: "mock",
      password: "mockNew",
      isLogged: true,
    };

    expect(reducer(initialUser({}), changePassword("mockNew"))).toEqual(
      userLocalStorage
    );
  });

  test("Should delete user reducer", () => {
    const userLocalStorage: IUser = {
      email: "mock@email",
      username: "mock",
      password: "mock",
      isLogged: true,
    };

    expect(reducer(userLocalStorage, deleteUser())).toEqual(
      initialUser({
        username: "",
        email: "",
        password: "",
        isLogged: false,
      })
    );
  });

  test("Should setIsLogged reducer", () => {
    const userLocalStorage: IUser = {
      email: "mock@email",
      username: "mock",
      password: "mock",
      isLogged: true,
    };

    expect(
      reducer(initialUser({ isLogged: false }), setIsLogged(true))
    ).toEqual(userLocalStorage);
  });
});
