import { memo } from "react";
import { IMoviesCardList } from "../../interfaces/IMovieCardList";
import { MovieCard } from "../MovieCard/MovieCard";
import { Row } from "antd";

export const MoviesCardList: React.FC<IMoviesCardList> = memo(({ data }) => (
  <Row justify={"center"} align={"middle"}>
    {data.map((element) => (
      <MovieCard element={element} key={element.id} />
    ))}
  </Row>
));
