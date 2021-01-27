import "./index.scss";
import { Component } from "react";

import Button from "../Button";
import Movie from "./Movie";

class Main extends Component {
    state = {
        isLoading: false,
        error: null,
        movies: [],
        favorites: [],
    };

    toggleFavorites = (id) => {
        const {favorites} = this.state;

        if (favorites.includes(id)) {
            const newFavorites = favorites.filter((favorite) => favorite !== id);
            this.setState({ favorites: newFavorites })
        } else {
            this.setState({ favorites: favorites.concat(id)});
        }
    }

    async componentDidMount() {
        try {
            this.setState({ isLoading: true });

            const response = await fetch("https://academy-video-api.herokuapp.com/content/free-items");

            const json = await response.json();

            console.log(json);

            if (!response.ok) {
                const error =
                    { 404: "The thing you're looking for is not there 🤷‍♂️" }[
                    response.status
                    ] || "Something went wrong! 😭";

                throw new Error(error);
            }

            this.setState({ movies: json });
        } catch (e) {
            this.setState({ error: e.message });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { isLoading, error, movies, favorites} = this.state;

        return (
            <main>
                <section className="hero">
                    <h2 className="hero-title">Wanna more content?</h2>
                    <Button size="large">Get Access</Button>
                </section>
                <section className="movies-container">
                    <div className="movies-list">
                        {isLoading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {movies.map(({ title, description, image, id }) => (
                            <Movie 
                            toggleFavorites={this.toggleFavorites}
                            favorites={favorites}
                            key={id} 
                            id={id}
                            title={title} 
                            description={description} 
                            image={image} 
                            />
                        ))}
                    </div>
                    <Button size="large">Get More Content</Button>
                </section>
            </main>
        )
    };
}

export default Main;