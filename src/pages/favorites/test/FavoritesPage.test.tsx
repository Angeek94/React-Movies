import { PreloadedState } from "@reduxjs/toolkit";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { RootState, setupStore } from "../../store/store";
import { MoviesCardList } from "../../components/MoviesCardList/MoviesCardList";
import { IMovieDetail } from "../../interfaces/IMovie";
const elementsMock: IMovieDetail[] = [
  {
    id: "709631",
    overview: "mock",
    poster_path: "mock",
    title: "Cobweb",
  },
];

const mockedUseNavigation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigation,
}));

const renderfavoritesPageWithProvider = (
  preloadedState?: PreloadedState<RootState>
) =>
  render(
    <Provider store={setupStore(preloadedState)}>
      <MoviesCardList data={elementsMock} />
    </Provider>
  );

describe("Favorites Page", () => {
  test("correct 1", () => {
    renderfavoritesPageWithProvider();
  });
});
