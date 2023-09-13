import { renderHook } from "@testing-library/react";
import { useSaveFavorites } from "../useSaveFavorites";

const mockedDispatch = jest.fn();

jest.mock("../../../../store/hooks", () => ({
  ...jest.requireActual("../../../../store/hooks"),
  useAppDispatch: () => mockedDispatch,
}));
describe("useSaveFavorites", () => {
  test("should call dispatch to delete movie", () => {
    const { result } = renderHook(useSaveFavorites);
    result.current(
      {
        id: "709631",
        overview: "mock",
        poster_path: "mock",
        title: "Cobweb",
        backdrop_path: "mock",
        vote_average: 10,
        genres: [],
      },
      [
        {
          id: "709631",
          overview: "mock",
          poster_path: "mock",
          title: "Cobweb",
          backdrop_path: "mock",
          vote_average: 10,
          genres: [],
        },
      ]
    );
    expect(mockedDispatch).toHaveBeenCalled();
  });
  test("should call dispatch to save movie", () => {
    const { result } = renderHook(useSaveFavorites);
    result.current(
      {
        id: "123456",
        overview: "mock",
        poster_path: "mock",
        title: "Mock",
        backdrop_path: "mock",
        vote_average: 10,
        genres: [],
      },
      [
        {
          id: "709631",
          overview: "mock",
          poster_path: "mock",
          title: "Cobweb",
          backdrop_path: "mock",
          vote_average: 10,
          genres: [],
        },
      ]
    );
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
