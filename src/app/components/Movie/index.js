import "./index.scss";
import Button from "../Button";

function Movie({ title, description, image, id, toggleFavorite, favorites }) {
    return (
        <div className="movie-box">
            <img className="movie-image" src={image} alt={title} />
            <div className="movie-info">
                <div>
                    <h4 className="movie-title">
                        {title}
                    </h4>
                    <p className="movie-description">
                        {description}
                    </p>
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