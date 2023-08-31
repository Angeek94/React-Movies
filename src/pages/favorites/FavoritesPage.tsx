import { MoviesCardList } from "../../components/MoviesCardList/MoviesCardList";
import { IMovieDetail } from "../../interfaces/IMovie";
import { useAppSelector } from "../../store/hooks";

export const FavoritesPage = () => {
  const favorites: IMovieDetail[] = useAppSelector((state) => state.favorites);

  return (
    <>
      {favorites.length === 0 ? (
        <p style={{ textAlign: "center" }}>Nessun preferito</p>
      ) : (
        favorites && <MoviesCardList data={favorites} />
      )}
    </>
  );
};
