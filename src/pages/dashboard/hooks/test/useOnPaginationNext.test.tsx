import { renderHook } from "@testing-library/react";
import { useOnPaginationNext } from "../useOnPaginationNext";
import { IMovie, IMovieDetail } from "../../../../interfaces/IMovie";

const mockedSetPageSelected = jest.fn();

const elementMock: IMovieDetail = {
  id: "709631",
  overview: "mock",
  poster_path: "mock",
  title: "Cobweb",
};
const movies: IMovie = { results: [elementMock], total_pages: 9 };
describe("useOnPaginationNext callback", () => {
  test("should not increment page when pageSelected is equal to total_pages", () => {
    const { result } = renderHook(useOnPaginationNext);
    result.current(movies, 9, mockedSetPageSelected);
    expect(mockedSetPageSelected).not.toHaveBeenCalled();
  });

  test("should increment page when pageSelected is less than total_pages", () => {
    const { result } = renderHook(useOnPaginationNext);
    result.current(movies, 1, mockedSetPageSelected);
    expect(mockedSetPageSelected).toHaveBeenCalledWith(2);
  });
});
