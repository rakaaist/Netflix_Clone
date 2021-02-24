import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import content from "../../content";

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

const enhance = connect(
  (state) => ({
    movies: content.selectors.getMovies(state),
    favorites: content.selectors.getFavorites(state),
    loading: content.selectors.isLoading(state),
    token: state.auth.token,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        onStart: content.actions.getMovies,
        onSuccess: content.actions.getMoviesSuccess,
        onFailure: content.actions.getMoviesFailure,
        toggleFavorite: content.actions.toggleFavorite,
      },
      dispatch
    )
);

export default enhance(Home);