import { memo } from "react";
import { MoviesCardList } from "../../components/MoviesCardList/MoviesCardList";
import { useAppSelector } from "../../store/hooks";

export const FavoritesPage = memo(() => {
  const favorites = useAppSelector((state) => state.favorites);

  return !favorites.length ? (
    <p style={{ textAlign: "center" }}>Nessun preferito</p>
  ) : (
    <MoviesCardList data={favorites} />
  );
});
