import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import favoritesSlice from "./slices/favoritesSlice";
import { moviesApi } from "./apiRTK";

const rootReducer = combineReducers({
  user: userSlice,
  favorites: favoritesSlice,
  [moviesApi.reducerPath]: moviesApi.reducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([moviesApi.middleware]),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
