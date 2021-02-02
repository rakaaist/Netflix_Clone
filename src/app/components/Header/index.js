import "./index.scss";
import { Switch, Route , Link } from "react-router-dom";
import Button from "../Button";
import logo from "../../../logo.svg";

function Header() {
    return (
        // <header className="header">
        //     <img src={logo} alt=""/>
        //     <Button to="/login" size="large">Sign in</Button>
        // </header>

    <header className="header">
      <nav className="nav">
        <Link to='/'><img className="nav__img" src={logo} alt="logo-felix" /></Link>
        <Switch>
          <Route exact path="/login">
            {null}
          </Route>
          <Route exact path="/">
            <Button to="/login" size="large">
              Sign In
            </Button>
          </Route>
          <Route path="*">
            <Button to="/" size="large" onClick={() => localStorage.clear()}>
              Logout
            </Button>
          </Route>
        </Switch>
      </nav>
    </header>
  );
}

export default Header;