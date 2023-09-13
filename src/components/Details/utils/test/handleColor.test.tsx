import { cleanup } from "@testing-library/react";
import { handleColor } from "../handleColor";

const mockDataYellow = {
  id: "709631",
  overview: "mock",
  poster_path: "mock",
  title: "Cobweb",
  backdrop_path: "mock",
  vote_average: 10,
  genres: [],
};
const mockDataGrey = {
  id: "709636",
  overview: "mock",
  poster_path: "mock",
  title: "Cobweb",
  backdrop_path: "mock",
  vote_average: 10,
  genres: [],
};

describe("useOnColor", () => {
  test("should render yellow star", () => {
    expect(handleColor(mockDataYellow, [mockDataYellow])).toBe("yellow");
  });

  test("should render grey star", () => {
    expect(handleColor(mockDataYellow, [mockDataGrey])).toBe("grey");
  });
});
