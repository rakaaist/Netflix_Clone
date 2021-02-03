import "./index.scss";
import Button from "../Button";
import { Link } from "react-router-dom";

function Movie({ title, description, image, id, toggleFavorite, favorites }) {
    return (
        <div className="movie-box">
            <Link to={`/movies/${id}`}><img className="movie-image" src={image} alt={title} /></Link>
            <div className="movie-info">
                <div>
                    <Link to={`/movies/${id}`} className="movie__link"><h4 className="movie-title">{title}</h4></Link>
                    <Link to={`/movies/${id}`} className="movie__link"><p className="movie-description">{description}</p></Link>
                </div>
                <Button size="small"
                    onClick={() => {
                        toggleFavorite(id);
                    }}
                    isTransparent={favorites.includes(id) ? true : false}
                >
                    {favorites.includes(id) ? "Remove" : "Favorite"}
                </Button>
            </div>
        </div>
    );
}

export default Movie;