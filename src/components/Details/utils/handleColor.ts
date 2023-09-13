import { IDetailsMovie } from "../../../interfaces/IDetailsMovie";

export const handleColor = (
  data: IDetailsMovie,
  favorites: IDetailsMovie[]
) => {
  if (data && favorites.some((element) => element.id === data.id)) {
    return "yellow";
  } else {
    return "grey";
  }
};
