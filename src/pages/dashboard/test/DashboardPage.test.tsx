import { render, screen } from "@testing-library/react";
import { DashboardPage } from "../DashboardPage";
import { RootState, setupStore } from "../../../store/store";
import { Provider } from "react-redux";
import { PreloadedState } from "@reduxjs/toolkit";
import { MoviesCardList } from "../../../components/MoviesCardList/MoviesCardList";
import { IMovieDetail } from "../../../interfaces/IMovie";
import { useGetMoviesByPageQuery } from "../../../store/apiRTK";

jest.mock("../../../store/apiRTK", () => ({
  ...jest.requireActual("../../../store/apiRTK"),
  moviesApi: jest.fn(),
}));
const mockedUseGetMoviesByPageQuery = jest.mocked(useGetMoviesByPageQuery);

const renderDashboardPageWithProvider = () =>
  render(
    <Provider store={setupStore()}>
      <DashboardPage />
    </Provider>
  );

const mockReturn = (props: {
  isLoading: boolean;
  error: unknown;
  data: IMovieDetail[];
}) => {
  mockedUseGetMoviesByPageQuery.mockReturnValueOnce({ ...props } as any);
};

const elementsMock: IMovieDetail[] = [
  {
    id: "709631",
    overview: "mock",
    poster_path: "mock",
    title: "Cobweb",
  },
];

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

describe("Dashboard Component", () => {
  test("blabla", async () => {
    mockReturn({ isLoading: false, error: undefined, data: elementsMock });
    renderDashboardPageWithProvider();
    expect(await screen.findByTestId("all-films")).toBeInTheDocument();
  });
});
