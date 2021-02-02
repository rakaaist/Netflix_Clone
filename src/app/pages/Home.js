import { Component } from "react";

import Button from "../components/Button";
import Movie from "../components/Movie";
import Hero from "../components/Hero";

class Home extends Component {
    constructor() {
      super();
      this.state = {
        movies: [],
      };
    }
  
    componentDidMount() {
      fetch("https://academy-video-api.herokuapp.com/content/free-items")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ movies: data });
        });
    }
  
    render() {
      const { movies } = this.state;
      const { favorites, toggleFavorite } = this.props;
      return (
        <>
          <Hero />
          <section className="content">
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
              <Button size="large">Get More Content</Button>
          </section>
        </>
      );
    }
  }
  
  export default Home;