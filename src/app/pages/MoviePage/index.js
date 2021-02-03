import React from "react";
import { withRouter } from "react-router-dom";

import Button from "../../components/Button";
import "./index.scss";

class MoviePage extends React.Component {
    constructor() {
        super();
        this.state = {
            movie: [],
        };
    }

    componentDidMount() {
        const { itemId } = this.props.match.params;

        fetch(`https://academy-video-api.herokuapp.com/content/items/${itemId}`, {
            headers: { authorization: localStorage.getItem("token") },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((data) => {
                this.setState({ movie: data });
                console.log({ movie: data })
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { movie } = this.state;
        const { favorites, toggleFavorite } = this.props;

        console.log(movie);

        return (
            <>
                <article className="content">
                    <section className="content__wrapper">
                        <div className="content__movies">
                            <img
                                className="movie__image"
                                src={movie.image}
                                alt={`${movie.title}_image`}
                            />

                            <div className="movie">
                                <h1 className="movie__title">{movie.title}</h1>
                                <p className="movie__description">{movie.description}</p>
                                <Button
                                    onClick={() => {
                                        toggleFavorite(movie.id);
                                    }}
                                    isTransparent={favorites.includes(movie.id) ? true : false}
                                >
                                    {favorites.includes(movie.id) ? "Remove" : "Favorite"}
                                </Button>
                                <Button>Trailer</Button>
                            </div>

                        </div>
                    </section>
                </article>
            </>
        );
    }
}

export default withRouter(MoviePage);