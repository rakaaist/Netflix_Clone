import "./index.scss";

function Button({ children, size, onClick, isTransparent }) {
    const assignedSize = ['small', 'medium', 'large'].includes(size) ? size : "";
    const transparency = isTransparent ? "transparent" : "";

    return (
        <button className={`size-${assignedSize} button button-${transparency}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;