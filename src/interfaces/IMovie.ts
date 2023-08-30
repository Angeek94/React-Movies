export interface IMovie {
  results: IMovieDetail[];
  total_pages: number;
}
export interface IMovieDetail {
  id: string;
  overview: string;
  poster_path: string;
  title: string;
}
