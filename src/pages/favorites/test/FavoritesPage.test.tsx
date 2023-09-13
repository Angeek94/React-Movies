import { PreloadedState } from "@reduxjs/toolkit";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { RootState, setupStore } from "../../../store/store";
import { FavoritesPage } from "../FavoritesPage";

const preloadedState: PreloadedState<RootState> = {
  favorites: [
    {
      backdrop_path: "mock",
      genres: [{ name: "mock" }, { name: "mock" }],
      id: "mock",
      overview: "mock",
      poster_path: "",
      title: "mock",
      vote_average: 0,
    },
  ],
};

jest.mock("../../../components/MoviesCardList/MoviesCardList", () => ({
  MoviesCardList: () => {
    return <div data-testid="all-films"></div>;
  },
}));

const renderFavoritesPageWithProvider = (
  preloadedState?: PreloadedState<RootState>
) =>
  render(
    <Provider store={setupStore(preloadedState)}>
      <FavoritesPage />
    </Provider>
  );

describe("Favorites Page", () => {
  test("Should be void retrieve favorites reducer", () => {
    renderFavoritesPageWithProvider();
    expect(screen.getByText("Nessun preferito")).toBeInTheDocument();
  });

  test("Should be full retrieve favorites reducer", () => {
    renderFavoritesPageWithProvider(preloadedState);
    expect(screen.getByTestId("all-films")).toBeInTheDocument();
  });
});
