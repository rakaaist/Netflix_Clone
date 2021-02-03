import React from "react";
import { withRouter } from "react-router-dom";


import Movie from "../components/Movie";

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    const { history } = this.props;

    fetch("https://academy-video-api.herokuapp.com/content/items", {
      headers: { authorization: localStorage.getItem("token") },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((data) => {
        this.setState({ movies: data });
        console.log({movies: data})
      })
      .catch((e) => {
        history.replace("/login");
      });
  }

  render() {
    const { movies } = this.state;
    const { favorites, toggleFavorite } = this.props;
    return (
      <>
        <article className="content">
          <section className="content__wrapper">
            <div className="content__movies">
              {movies.map((movie) => {
                if (movies.length < 0) {
                  return <p>Loading...</p>;
                }

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
          </section>
        </article>
      </>
    );
  }
}

export default withRouter(Content);