import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDetailsMovie } from "../../interfaces/IDetailsMovie";

// Define the initial state using that type
const IInitialFavoritesState: IDetailsMovie[] = [];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: IInitialFavoritesState,

  reducers: {
    saveFavorites: (
      state: IDetailsMovie[],
      action: PayloadAction<IDetailsMovie>
    ) => {
      const updatedFavoritesList = [...state, action.payload];
      localStorage.setItem(
        "favorites",
        JSON.stringify([...state, action.payload])
      );
      return updatedFavoritesList;
    },
    retrieveFavorites: (_, action: PayloadAction<IDetailsMovie[]>) => {
      return [...action.payload];
    },
    deleteFavorites: (
      state: IDetailsMovie[],
      action: PayloadAction<IDetailsMovie>
    ) => {
      const index = state.findIndex(
        (element) => element.id === action.payload.id
      );
      let stateCopy = [...state];
      stateCopy.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(stateCopy));
      return [...stateCopy];
    },
  },
});

export const { saveFavorites, retrieveFavorites, deleteFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
