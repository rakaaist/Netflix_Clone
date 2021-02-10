import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import "./index.scss";

import Input from "../../components/Input";
import Button from "../../components/Button";


function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");

  const onSubmit = (e) => {
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
        onLogin(data.token);
        history.replace("/movies");
      })
      .catch((e) => {
        console.log(e);
        setError("Failure: please check the login details");
      });
  };

  return (
    <div className="content">
      <section className="content__wrapper">
        <form onSubmit={onSubmit} className="form">
          <p className="form__label">Username</p>
          <Input
            className="form__input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="form__label">Password</p>
          <Input
            className="form__input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="form__error">{error}</p>}
          <Button
            type="submit"
            size="large"
            className={error ? "" : "form__submit--space"}
          >
            Sign In
            </Button>
        </form>
      </section>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (token) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(Login);