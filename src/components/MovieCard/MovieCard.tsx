import { Card, Row } from "antd";
import { IMovieCard } from "../../interfaces/IMovieCard";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const MovieCard: React.FC<IMovieCard> = ({ element }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="card"
      onClick={() => {
        navigate(`/details/${element.id}`);
      }}
    >
      <Row justify={"center"} align={"middle"}>
        <img
          src={`https://image.tmdb.org/t/p/w300/${element.poster_path}`}
          alt=""
        />
        <p className="title">{element.title}</p>
      </Row>
    </Card>
  );
};
