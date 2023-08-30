import { useCallback } from "react";
import { IMovie } from "../../../interfaces/IMovie";

export const useOnPaginationNext = () => {
  const handlePaginationNext = useCallback(
    (
      data: IMovie,
      pageSelected: number,
      setPageSelected: React.Dispatch<React.SetStateAction<number>>
    ) => {
      if (pageSelected < data.total_pages) setPageSelected(pageSelected + 1);
    },
    []
  );
  return handlePaginationNext;
};
