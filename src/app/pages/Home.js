import Button from "../components/Button";
import Movie from "../components/Movie";
import Hero from "../components/Hero";
import useFetch from "../../hooks/useFetch";

function Home({ favorites, toggleFavorite }) {

  const { loading, payload: movies = [] } = useFetch(
    "https://academy-video-api.herokuapp.com/content/free-items"
  );

  return (
    <>
      <Hero />
      <section className="content">
        <div className="content__movies">
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


export default Home;