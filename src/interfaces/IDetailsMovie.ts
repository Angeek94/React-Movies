import { IGenre } from "./IGenre";

export interface IDetailsMovie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genres: IGenre[];
}
