import { screen, render } from "@testing-library/react";
import { MoviesCardList } from "../MoviesCardList";
import { IMovieDetail } from "../../../interfaces/IMovie";

const elementsMock: IMovieDetail[] = [
  {
    id: "709631",
    overview: "mock",
    poster_path: "mock",
    title: "Cobweb",
  },
];

jest.mock("../../MovieCard/MovieCard", () => ({
  MovieCard: () => {
    return <div>{elementsMock[0].title}</div>;
  },
}));

describe("MoviesCardList", () => {
  test("should render list of movies from props", () => {
    render(<MoviesCardList data={elementsMock} />);
    expect(screen.getByText(/Cobweb/)).toBeInTheDocument();
  });
});
