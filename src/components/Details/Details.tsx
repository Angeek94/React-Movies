import { Row, Col } from "antd";
import { GenresList } from "../GenresList/GenresList";
import { useAppSelector } from "../../store/hooks";
import { IDetails } from "../../interfaces/IDetails";
import { useSaveFavorites } from "./utils/useSaveFavorites";
import { handleColor } from "./utils/handleColor";

export const Details: React.FC<IDetails> = ({ data }) => {
  const favorites = useAppSelector((state) => state.favorites);

  const handleOnSaveFavorites = useSaveFavorites();

  return (
    <>
      <Row justify={"center"} style={{ fontSize: 40, fontWeight: 700 }}>
        Scheda del film
      </Row>
      {data && (
        <Row justify={"center"} style={{ margin: 40 }} data-testid="details">
          <Col span={4}>
            <img
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid black",
                padding: 10,
              }}
              alt=""
            />
            <button
              data-testid="star"
              style={{
                background: "transparent",
                border: "none",
                fontSize: "4vw",
                position: "absolute",
                top: "75%",
                left: "75%",
                color: handleColor(data, favorites),
                textShadow:
                  "2px 2px 4px rgba(0, 0, 0, 0.75), -2px -2px 4px rgba(0, 0, 0, 0.75)",
              }}
              onClick={() => handleOnSaveFavorites(data, favorites)}
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
              Title: <strong>{data.title}</strong>
            </p>
            <p>
              Average: <strong>{data && Math.round(data.vote_average)}</strong>
            </p>

            <p>{data.overview}</p>
            <GenresList data={data} />
          </Col>
        </Row>
      )}
    </>
  );
};
