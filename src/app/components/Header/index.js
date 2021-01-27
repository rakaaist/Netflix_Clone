import "./index.scss";
import Button from "../Button";
import logo from "../../../logo.svg";

function Header() {
    return (
        <header className="header">
            <img src={logo} alt=""/>
            <Button size="large">Sign in</Button>
        </header>
    );
}

export default Header;