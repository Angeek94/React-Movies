import { renderHook } from "@testing-library/react";
import { useOnPaginationPrev } from "../useOnPaginationPrev";
import { IMovie, IMovieDetail } from "../../../../interfaces/IMovie";

const mockedSetPageSelected = jest.fn();

jest.mock("../../DashboardPage", () => ({
  DashboardPage: () => mockedSetPageSelected,
}));

const elementMock: IMovieDetail = {
  id: "709631",
  overview: "mock",
  poster_path: "mock",
  title: "Cobweb",
};
const movies: IMovie = { results: [elementMock], total_pages: 9 };
describe("useOnPaginationPrev", () => {
  test("should not decrement page when pageSelected is equal to 1", () => {
    const { result } = renderHook(useOnPaginationPrev);
    result.current(movies, 1, mockedSetPageSelected);
    expect(mockedSetPageSelected).not.toHaveBeenCalled();
  });

  test("should decrement page when pageSelected is more than 1", () => {
    const { result } = renderHook(useOnPaginationPrev);
    result.current(movies, 2, mockedSetPageSelected);
    expect(mockedSetPageSelected).toHaveBeenCalledWith(1);
  });
});
