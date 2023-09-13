import { useParams } from "react-router-dom";
import { useGetDetailsMovieByIDQuery } from "../../store/apiRTK";
import { Spin, Alert } from "antd";
import { useMemo } from "react";
import { Details } from "../../components/Details/Details";

export const DetailsMoviePage = () => {
  const { movieID } = useParams() as { movieID: string };
  const { data, isLoading } = useGetDetailsMovieByIDQuery(movieID);

  const renderDetail = useMemo(() => {
    if (isLoading)
      return (
        <Spin style={{ position: "absolute", bottom: "50%", left: "50%" }} />
      );
    if (data) {
      return <Details data={data} />;
    }
    return (
      <Alert
        style={{ margin: 10 }}
        message="Errore dettaglio non trovato"
        type="error"
      />
    );
  }, [data, isLoading]);

  return renderDetail;
};
