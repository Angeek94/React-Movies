import { useCallback } from "react";
import { IMovie } from "../../../interfaces/IMovie";

export const useOnPaginationPrev = () => {
  const handlePaginationPrev = useCallback(
    (
      data: IMovie,
      pageSelected: number,
      setPageSelected: React.Dispatch<React.SetStateAction<number>>
    ) => {
      if (pageSelected > 1) setPageSelected(pageSelected - 1);
    },
    []
  );
  return handlePaginationPrev;
};
