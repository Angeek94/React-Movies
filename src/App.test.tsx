import { render, cleanup } from "@testing-library/react";
import { App } from "./App";
import { MemoryRouter } from "react-router-dom";
import { IUser } from "./interfaces/IUser";
import { IDetailsMovie } from "./interfaces/IDetailsMovie";

const mockedUseDispatch = jest.fn();

jest.mock("./store/hooks", () => ({
  ...jest.requireActual("./store/hooks"),
  useAppDispatch: () => mockedUseDispatch,
}));

const renderApp = (location: string) =>
  render(
    <MemoryRouter initialEntries={[location]}>
      <App />
    </MemoryRouter>
  );

jest.mock("./components/NavBar/NavBar", () => ({
  NavBar: () => {
    return <div data-testid="navBar"></div>;
  },
}));

const mockedUser: IUser = {
  email: "mock",
  password: "mock",
  username: "mock",
  isLogged: true,
};

const mockedFavorites: IDetailsMovie[] = [
  {
    id: "709636",
    overview: "mock",
    poster_path: "mock",
    title: "Cobweb",
    backdrop_path: "mock",
    vote_average: 10,
    genres: [],
  },
];
const mockGetItemReturn = (isDefined = false) => {
  const storage: { [key: string]: string } = {
    data: JSON.stringify(mockedUser),
    favorites: JSON.stringify([mockedFavorites]),
  };
  const mockedLocalStorageGetItem = jest.fn((key: string) =>
    isDefined ? storage[key] : null
  );
  global.Storage.prototype.getItem = mockedLocalStorageGetItem;
  return mockedLocalStorageGetItem;
};

describe("App", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  afterAll(() => {
    (global.Storage.prototype.getItem as jest.Mock<any, any>).mockRestore();
  });
  test("should not render Navbar", () => {
    mockGetItemReturn();
    renderApp("/");
    expect(mockedUseDispatch).toHaveBeenCalled();
  });
});
