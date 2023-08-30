import { useParams } from "react-router-dom";
import { useGetDetailsMovieByIDQuery } from "../../store/apiRTK";
import { Row, Col, Spin } from "antd";
import { Genre } from "../../components/Genre/Genre";
import { IDetailsMovie } from "../../interfaces/IDetailsMovie";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteFavorites,
  saveFavorites,
} from "../../store/slices/favoritesSlice";
import { useCallback, useMemo } from "react";

export const DetailsMoviePage = () => {
  const { movieID } = useParams() as { movieID: string };
  const { data, isLoading, error } = useGetDetailsMovieByIDQuery(movieID);
  const favorites: IDetailsMovie[] = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();

  const saveFavorite = useCallback(() => {
    if (data) {
      console.log(favorites[0]);
      if (favorites.some((element) => element.title === data?.title)) {
        dispatch(deleteFavorites(data));
      } else {
        dispatch(saveFavorites(data));
      }
    }
  }, [data, dispatch, favorites]);

  const handleColor = useMemo(() => {
    if (favorites.some((element) => element.title === data?.title)) {
      return "yellow";
    } else {
      return "grey";
    }
  }, [data?.title, favorites]);

  const renderDetail = useMemo(() => {
    if (isLoading)
      return (
        <Spin style={{ position: "absolute", bottom: "50%", left: "50%" }} />
      );

    if (error) alert("Errore dettaglio non trovato");
    if (data) {
      return (
        <>
          <Row justify={"center"} style={{ fontSize: 40, fontWeight: 700 }}>
            Scheda del film
          </Row>
          <Row justify={"center"} style={{ margin: 40 }}>
            <Col span={4}>
              <img
                src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                style={{
                  width: "100%",
                  height: "auto",
                  border: "1px solid black",
                  padding: 10,
                }}
                alt=""
              />
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "4vw",
                  position: "absolute",
                  top: "75%",
                  left: "75%",
                  color: handleColor,
                  textShadow:
                    "2px 2px 4px rgba(0, 0, 0, 0.75), -2px -2px 4px rgba(0, 0, 0, 0.75)",
                }}
                onClick={saveFavorite}
              >
                ★
              </button>
            </Col>
            <Col
              span={8}
              style={{
                border: "1px solid black",
                height: "auto",
                marginLeft: 50,
                padding: 20,
              }}
            >
              <p>
                Title: <strong>{data?.title}</strong>
              </p>
              <p>
                Average:{" "}
                <strong>{data && Math.round(data.vote_average)}</strong>
              </p>

              <p>{data?.overview}</p>
              <p>
                Genres:&nbsp;
                {data?.genres.map((element, index) =>
                  index === data.genres.length - 1 ? (
                    <Genre name={element.name} key={index} />
                  ) : (
                    <Genre name={element.name + " | "} key={index} />
                  )
                )}
              </p>
            </Col>
          </Row>
        </>
      );
    }
    return null;
  }, [data, error, handleColor, isLoading, saveFavorite]);

  return renderDetail;
};
