import React from "react";
import { withRouter } from "react-router-dom";

import "./index.scss";

import Input from "../../components/Input";
import Button from "../../components/Button";


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      username: "",
      error: "",
    };
  }

  onSubmit = (e) => {
    const { password, username } = this.state;
    const { history } = this.props;

    e.preventDefault();

    fetch("https://academy-video-api.herokuapp.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(res.status);
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        // history.replace needed to go to next page
        history.replace("/movies");
      })
      .catch((e) => {
        console.log(e);
        this.setState({ error: "Failure: please check the login details" });
      });
  };

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="content">
        <section className="content__wrapper">
          <form onSubmit={this.onSubmit} className="form">
            <p className="form__label">Username</p>
            <Input
              className="form__input"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e, "username")}
            />
            <p className="form__label">Password</p>
            <Input
              className="form__input"
              type="password"
              placeholder="Password"
              onChange={(e) => this.handleChange(e, "password")}
            />
            {error && <p className="form__error">{error}</p>}
            <Button type="submit" size="large" className={error ? "" : "form__submit--space"}>
              Sign In
            </Button>
          </form>
        </section>
      </div>
    );
  }
}

export default withRouter(Login);