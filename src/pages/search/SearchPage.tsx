import { Input, Row, Spin } from "antd";
import { useState, useMemo } from "react";
import { MoviesCardList } from "../../components/MoviesCardList/MoviesCardList";
import { useGetMoviesBySearchQuery } from "../../store/apiRTK";
export const SearchPage = () => {
  const [valueSearch, setValueSearch] = useState("");

  const { data, isLoading, error } = useGetMoviesBySearchQuery(valueSearch);
  const renderMoviesList = useMemo(() => {
    if (isLoading)
      return (
        <Spin style={{ position: "absolute", bottom: "50%", left: "50%" }} />
      );
    if (error) alert("Errore film non trovati");
    if (data) return <MoviesCardList data={data.results} />;
  }, [data, error, isLoading]);

  return (
    <>
      <Row className="space" justify={"center"}>
        <Input
          style={{ width: 200, margin: 10 }}
          value={valueSearch}
          onChange={(event) => setValueSearch(event.target.value)}
          placeholder="Movie"
        />
      </Row>
      {renderMoviesList}
    </>
  );
};
