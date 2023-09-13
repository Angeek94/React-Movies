import { IGenresList } from "../../interfaces/IGenresList";
import { Genre } from "../Genre/Genre";

export const GenresList: React.FC<IGenresList> = ({ data }) => {
  return (
    <p>
      Genres:&nbsp;
      {data &&
        data.genres.map((element, index) =>
          index === data.genres.length - 1 ? (
            <Genre name={element.name} key={element.id} />
          ) : (
            <Genre name={element.name + " | "} key={element.id} />
          )
        )}
    </p>
  );
};
