import { Link } from "react-router-dom";
import "./index.scss";

function Button({ className, type = "button", children, size, onClick, isTransparent, to }) {
    const assignedSize = ['small', 'medium', 'large'].includes(size) ? size : "";
    const transparency = isTransparent ? "transparent" : "";
    const Component = to ? Link : "button";

    return (
        <Component
            type={type}
            onClick={onClick}
            className={`size-${assignedSize} button button-${transparency} ${className}`}
            to={to}
        >
            {children}
        </Component>
    );
}

export default Button;