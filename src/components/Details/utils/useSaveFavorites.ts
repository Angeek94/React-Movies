import { useCallback } from "react";
import { IDetailsMovie } from "../../../interfaces/IDetailsMovie";
import { useAppDispatch } from "../../../store/hooks";
import {
  deleteFavorites,
  saveFavorites,
} from "../../../store/slices/favoritesSlice";

export const useSaveFavorites = () => {
  const dispatch = useAppDispatch();

  const handleOnSaveFavorites = useCallback(
    (data: IDetailsMovie, favorites: IDetailsMovie[]) => {
      if (data) {
        if (favorites.some((element) => element.id === data.id)) {
          dispatch(deleteFavorites(data));
        } else {
          dispatch(saveFavorites(data));
        }
      }
    },
    [dispatch]
  );
  return handleOnSaveFavorites;
};
