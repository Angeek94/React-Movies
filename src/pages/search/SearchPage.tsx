import { Alert, Input, Row, Spin } from "antd";
import { useState, useMemo } from "react";
import { MoviesCardList } from "../../components/MoviesCardList/MoviesCardList";
import { useGetMoviesBySearchQuery } from "../../store/apiRTK";
export const SearchPage = () => {
  const [valueSearch, setValueSearch] = useState("");

  const { data, isLoading, isError } = useGetMoviesBySearchQuery(valueSearch);
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
      <Row className="space" justify={"center"}>
        <Input
          style={{ width: 200, margin: 10 }}
          value={valueSearch}
          data-testid="valueSearch"
          onChange={(event) => setValueSearch(event.target.value)}
          placeholder="Movie"
        />
      </Row>
      {renderMoviesList}
    </>
  );
};
