import { IGenre } from "../../interfaces/IGenre";

export const Genre: React.FC<IGenre> = ({ name }) => <strong>{name}</strong>;
