import { screen, render, fireEvent } from "@testing-library/react";
import { MovieCard } from "../MovieCard";
import { IMovieDetail } from "../../../interfaces/IMovie";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("MovieCard", () => {
  const elementMock: IMovieDetail = {
    id: "615656",
    overview: "",
    poster_path: "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
    title: "Meg 2: The Trench",
  };
  test("should have route to navigate in detail with IDMovie", () => {
    render(<MovieCard element={elementMock} />);
    fireEvent.click(screen.getByText("Meg 2: The Trench"));
    expect(mockedUseNavigate).toHaveBeenCalledWith(
      `/details/${elementMock.id}`
    );
    const titleMovie = screen.getByText(elementMock.title);
    const imageMovie = screen.getByRole("img");

    expect(titleMovie).toBeInTheDocument();
    expect(imageMovie).toBeInTheDocument();
  });
});
