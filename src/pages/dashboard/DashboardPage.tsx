import { Alert, Row, Spin } from "antd";
import { useGetMoviesByPageQuery } from "../../store/apiRTK";
import { MoviesCardList } from "../../components/MoviesCardList/MoviesCardList";
import { useMemo, useState } from "react";
import "./style.css";
import { useOnPaginationNext } from "./hooks/useOnPaginationNext";
import { useOnPaginationPrev } from "./hooks/useOnPaginationPrev";

export const DashboardPage = () => {
  const [pageSelected, setPageSelected] = useState(1);
  const handlePaginationNext = useOnPaginationNext();
  const handlePaginationPrev = useOnPaginationPrev();

  const { data, isLoading, isError } = useGetMoviesByPageQuery(
    pageSelected.toString()
  );

  const renderMoviesList = useMemo(() => {
    if (isLoading)
      return (
        <Spin style={{ position: "absolute", bottom: "50%", left: "50%" }} />
      );
    if (isError)
      return (
        <Alert
          style={{ margin: 10 }}
          message="Errore film non trovati"
          type="error"
        />
      );
    if (data) return <MoviesCardList data={data.results} />;
  }, [data, isError, isLoading]);

  return (
    <>
      {renderMoviesList}
      {data && (
        <Row justify={"center"} style={{ marginBottom: 20 }}>
          <button
            style={{ background: "white", border: 0 }}
            data-testid="prev"
            onClick={() =>
              handlePaginationPrev(data, pageSelected, setPageSelected)
            }
          >
            &#60;
          </button>
          <span className={"index"}>{pageSelected}</span>
          <button
            style={{ background: "white", border: 0 }}
            data-testid="next"
            onClick={() =>
              handlePaginationNext(data, pageSelected, setPageSelected)
            }
          >
            &#62;
          </button>
        </Row>
      )}
    </>
  );
};
