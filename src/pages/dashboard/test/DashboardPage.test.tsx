import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { DashboardPage } from "../DashboardPage";
import { setupStore } from "../../../store/store";
import { Provider } from "react-redux";
import { IMovie } from "../../../interfaces/IMovie";
import { useGetMoviesByPageQuery } from "../../../store/apiRTK";

const mockedUseGetMoviesByPageQuery = jest.mocked(useGetMoviesByPageQuery);

const renderDashboardPageWithProvider = () =>
  render(
    <Provider store={setupStore()}>
      <DashboardPage />
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
const mockedHandlePaginationPrev = jest.fn();

jest.mock("../hooks/useOnPaginationPrev.ts", () => ({
  useOnPaginationPrev: () => mockedHandlePaginationPrev,
}));
const mockedHandlePaginationNext = jest.fn();

jest.mock("../hooks/useOnPaginationNext.ts", () => ({
  useOnPaginationNext: () => mockedHandlePaginationNext,
}));

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
  useGetMoviesByPageQuery: jest.fn(),
}));

const mockReturn = (
  data: IMovie | undefined = undefined,
  isLoading = false,
  isError = false
) => {
  mockedUseGetMoviesByPageQuery.mockReturnValueOnce({
    refetch: jest.fn(),
    data,
    isLoading,
    isError,
  });
};

describe("Dashboard Component", () => {
  afterEach(() => {
    cleanup();
  });
  test("should be present movies", () => {
    mockReturn(elementsMock);
    renderDashboardPageWithProvider();
    expect(screen.getByTestId("all-films")).toBeInTheDocument();
  });

  test("should be click prev", () => {
    mockReturn(elementsMock);
    renderDashboardPageWithProvider();
    fireEvent.click(screen.getByTestId("prev"));
    expect(mockedHandlePaginationPrev).toHaveBeenCalled();
  });

  test("should be click next", () => {
    mockReturn(elementsMock);
    renderDashboardPageWithProvider();
    fireEvent.click(screen.getByTestId("next"));
    expect(mockedHandlePaginationNext).toHaveBeenCalled();
  });

  test("should have spin", () => {
    mockReturn(undefined, true);
    renderDashboardPageWithProvider();
    expect(screen.getByTestId("spin-films")).toBeInTheDocument();
  });

  test("should have error", () => {
    mockReturn(undefined, false, true);
    renderDashboardPageWithProvider();
    expect(screen.getByTestId("alert-error")).toBeInTheDocument();
  });
});
