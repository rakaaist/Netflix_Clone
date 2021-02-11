import { connect } from "react-redux";

import useFetch from "../../hooks/useFetch";
import Hero from "../components/Hero";
import Movie from "../components/Movie";
import Button from "../components/Button";

function Home({
  loading,
  movies,
  onSuccess,
  onFailure,
  onStart,
  favorites,
  toggleFavorite,
  error,
}) {
  useFetch({
    url: "https://academy-video-api.herokuapp.com/content/free-items",
    onSuccess,
    onFailure,
    onStart
  });

  return (
    <>
      <Hero />
      <section className="content">
        <div className="content__movies">
          {error && <p>{error}</p>}
          {loading && <p>Loading...</p>}

          {movies.map((movie) => {
            return (
              <Movie
                key={movie.id}
                image={movie.image}
                title={movie.title}
                description={movie.description}
                id={movie.id}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            );
          })}

        </div>
        <Button size="large">Get More Content</Button>
      </section>
    </>
  );
}

function mapStateToProps({ content }) {
  return {
    loading: content.movies.isLoading,
    favorites: content.favorites,
    movies: content.movies.data,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStart: () => {
      dispatch({ type: "GET_MOVIES" })
    },
    onSuccess: (json) => {
      dispatch({ type: "GET_MOVIES_SUCCESS", payload: json })
    },
    onFailure: (error) => {
      dispatch({ type: "GET_MOVIES_FAILURE", payload: error })
    },
    toggleFavorite: (id) => {
      dispatch({ type: "TOGGLE_FAVORITE", payload: id })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);