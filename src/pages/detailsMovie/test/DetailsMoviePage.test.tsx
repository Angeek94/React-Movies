import { render, screen, cleanup } from "@testing-library/react";
import { DetailsMoviePage } from "../DetailsMoviePage";
import { RootState, setupStore } from "../../../store/store";
import { Provider } from "react-redux";
import { useGetDetailsMovieByIDQuery } from "../../../store/apiRTK";
import { IDetailsMovie } from "../../../interfaces/IDetailsMovie";
import { PreloadedState } from "@reduxjs/toolkit";

const mockedUseGetDetailsMovieByIDQuery = jest.mocked(
  useGetDetailsMovieByIDQuery
);

const renderDetailsMoviePageWithProvider = (
  preloadedState?: PreloadedState<RootState>
) =>
  render(
    <Provider store={setupStore(preloadedState)}>
      <DetailsMoviePage />
    </Provider>
  );
const mockElement = {
  id: "709631",
  overview: "mock",
  poster_path: "mock",
  title: "Cobweb",
  backdrop_path: "mock",
  vote_average: 10,
  genres: [],
};
const preloadedState: PreloadedState<RootState> = {
  favorites: [
    {
      id: "709631",
      overview: "mock",
      poster_path: "mock",
      title: "Cobweb",
      backdrop_path: "mock",
      vote_average: 10,
      genres: [],
    },
  ],
};

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Spin: () => {
    return <div data-testid="spin"></div>;
  },
  Alert: () => {
    return <div data-testid="alert-error"></div>;
  },
}));

jest.mock("../../../store/apiRTK", () => ({
  ...jest.requireActual("../../../store/apiRTK"),
  useGetDetailsMovieByIDQuery: jest.fn(),
}));

const mockReturn = (data: IDetailsMovie | undefined, isLoading = false) => {
  mockedUseGetDetailsMovieByIDQuery.mockReturnValueOnce({
    refetch: jest.fn(),
    data,
    isLoading,
    isError: data ? false : true,
  });
};

describe("DetailsMoviePage", () => {
  afterEach(() => {
    cleanup();
  });

  test("should be present movies", () => {
    mockReturn(mockElement);
    renderDetailsMoviePageWithProvider(preloadedState);
    expect(screen.getByTestId("details")).toBeInTheDocument();
  });

  test("should have spin", () => {
    mockReturn(undefined, true);
    renderDetailsMoviePageWithProvider(preloadedState);
    expect(screen.getByTestId("spin")).toBeInTheDocument();
  });

  test("should have error", () => {
    mockReturn(undefined, false);
    renderDetailsMoviePageWithProvider(preloadedState);
    expect(screen.getByTestId("alert-error")).toBeInTheDocument();
  });
});
