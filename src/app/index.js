import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./index.scss";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login/index";
import Content from "./pages/Content";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import MoviePage from "./pages/MoviePage";


function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favorite) => favorite !== id));
    } else {
      setFavorites(favorites.concat(id));
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <PublicRoute exact path="/">
              <Home
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </PublicRoute>
            <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/movies">
              <Content/>
            </PrivateRoute>
            <PrivateRoute exact path="/movies/:itemId">
              <MoviePage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </PrivateRoute>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}


export default App;