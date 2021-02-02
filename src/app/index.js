import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.scss";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login/index";
import Content from "./pages/Content";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
    };
  }

  toggleFavorite = (id) => {
    const { favorites } = this.state;
    if (favorites.includes(id)) {
      this.setState({
        favorites: favorites.filter((favorite) => favorite !== id),
      });
    } else {
      this.setState({ favorites: favorites.concat(id) });
    }
  };

  render() {
    const { favorites } = this.state;
    return (
      <Router>
        <Layout>
          <Switch>
          <PublicRoute exact path="/">
              <Home
                favorites={favorites}
                toggleFavorite={this.toggleFavorite}
              />
            </PublicRoute>
            <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/movies">
              <Content
                favorites={favorites}
                toggleFavorite={this.toggleFavorite}
              />
            </PrivateRoute>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;