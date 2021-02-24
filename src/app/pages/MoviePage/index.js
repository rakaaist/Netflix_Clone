import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import "./index.scss";

function MoviePage({
    loading,
    movies,
    token,
    onSuccess,
    onFailure,
    onStart,
    favorites,
    toggleFavorite,
    error
}) {
    const { itemId } = useParams();
    const movie = movies.filter(({ id }) => {
        return id === itemId;
    })[0];

    const fetchOptions = useRef({
        headers: { authorization: token },
    });
    console.log(`this is movie ${movie}`);

    useFetch({
        url: `https://academy-video-api.herokuapp.com/content/items/${itemId}`,
        fetchOptions: fetchOptions.current,
        onSuccess,
        onFailure,
        onStart,
        condition: !movie,
    });

    const [modal, toggleModal] = useState(false);

    console.log(movie);

    return (
        <>
            <article className="content">
                <section className="content__wrapper">
                    {error && <p>{error}</p>}
                    {loading && <p>Loading...</p>}
                    {movie &&
                        <>
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
                                    <Button
                                        onClick={() => {
                                            toggleModal(true);
                                        }}
                                    >
                                        Trailer</Button>
                                </div>
                            </div>

                            {modal && (
                                <Modal
                                    toggleModal={toggleModal}
                                    id={movie.id}
                                    video={movie.video}
                                />
                            )}
                        </>
                    }
                </section>
            </article>
        </>
    );
}

function mapStateToProps({ content, auth }) {
    return {
        loading: content.movies.isLoading,
        movies: content.movies.data,
        favorites: content.favorites,
        token: auth.token
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onStart: () => {
            dispatch({ type: "GET_SINGLE_MOVIE" });
        },
        onSuccess: (json) => {
            dispatch({ type: "GET_SINGLE_MOVIE_SUCCESS", payload: json });
        },
        onFailure: (error) => {
            dispatch({ type: "GET_SINGLE_MOVIE_FAILURE" });
        },
        toggleFavorite: (id) => {
            dispatch({ type: "TOGGLE_FAVORITE", payload: id })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);