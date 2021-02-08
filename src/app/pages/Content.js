import { useRef } from "react";
import useFetch from "../../hooks/useFetch";
import Movie from "../components/Movie";

function Content({ favorites, toggleFavorite }) {
    const fetchOptions = useRef({
        headers: { authorization: localStorage.getItem("token") }
    });

    const { loading, payload: movies = [] } = useFetch(
        "https://academy-video-api.herokuapp.com/content/items",
        fetchOptions.current
    );

    return (
        <>
            <article className="content">
                <section className="content__wrapper">
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
                </section>
            </article>
        </>

    );
}


export default Content;