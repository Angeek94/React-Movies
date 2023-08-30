import { IDetailsMovie } from "../../interfaces/IDetailsMovie";
import reducer, {
  deleteFavorites,
  retrieveFavorites,
  saveFavorites,
} from "../slices/favoritesSlice";

const mockedDetailsMovie: IDetailsMovie = {
  backdrop_path: "mock",
  genres: [{ name: "mock" }, { name: "mock" }],
  id: "mock",
  overview: "mock",
  poster_path: "",
  title: "",
  vote_average: 0,
};

describe("favoritesSlice", () => {
  test("Should save favorites reducer", () => {
    expect(reducer([], saveFavorites(mockedDetailsMovie))).toEqual([
      mockedDetailsMovie,
    ]);
  });

  test("Should  delete reducer", () => {
    expect(
      reducer([mockedDetailsMovie], deleteFavorites(mockedDetailsMovie))
    ).toEqual([]);
  });

  test("Should retrieve favorites reducer", () => {
    expect(reducer([], retrieveFavorites([mockedDetailsMovie]))).toEqual([
      mockedDetailsMovie,
    ]);
  });
});
