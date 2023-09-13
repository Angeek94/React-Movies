import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { SearchPage } from "../SearchPage";
import { setupStore } from "../../../store/store";
import { Provider } from "react-redux";
import { IMovie } from "../../../interfaces/IMovie";
import { useGetMoviesBySearchQuery } from "../../../store/apiRTK";

const renderSearchPageWithProvider = () =>
  render(
    <Provider store={setupStore()}>
      <SearchPage />
    </Provider>
  );

const elementsMock: IMovie = {
  results: [
    {
      id: "709631",
      overview: "mock",
      poster_path: "mock",
      title: "Cobweb",
    },
  ],
  total_pages: 1,
};

jest.mock("../../../components/MoviesCardList/MoviesCardList", () => ({
  MoviesCardList: () => {
    return <div data-testid="all-films"></div>;
  },
}));

jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Spin: () => {
    return <div data-testid="spin-films"></div>;
  },
  Alert: () => {
    return <div data-testid="alert-error"></div>;
  },
}));

jest.mock("../../../store/apiRTK", () => ({
  ...jest.requireActual("../../../store/apiRTK"),
  useGetMoviesBySearchQuery: jest.fn(),
}));

const mockedUseGetMoviesBySearchQuery = jest.mocked(useGetMoviesBySearchQuery);

const mockReturn = (
  data: IMovie | undefined = undefined,
  isLoading = false,
  isError = false
) => {
  mockedUseGetMoviesBySearchQuery.mockReturnValue({
    refetch: jest.fn(),
    data,
    isLoading,
    isError,
  });
};

describe("Search Page", () => {
  afterEach(() => {
    cleanup();
  });

  test("should be present movies", () => {
    mockReturn(elementsMock, false, false);
    renderSearchPageWithProvider();
    expect(screen.getByTestId("all-films")).toBeInTheDocument();
  });

  test("should have spin", () => {
    mockReturn(undefined, true, false);
    renderSearchPageWithProvider();
    expect(screen.getByTestId("spin-films")).toBeInTheDocument();
  });

  test("should have error", () => {
    mockReturn(undefined, false, true);
    renderSearchPageWithProvider();
    expect(screen.getByTestId("alert-error")).toBeInTheDocument();
  });

  test("should have a input to search movie", () => {
    mockReturn(elementsMock, false, false);
    renderSearchPageWithProvider();
    const valueSearchInput = screen.getByTestId("valueSearch");
    fireEvent.change(valueSearchInput, {
      target: { value: "Rocky" },
    });
    expect(valueSearchInput).toHaveValue("Rocky");
  });
});
