import "./index.scss";

function CreditCard({ link, alt }) {

    return (
       <img className="credit-card" src={link} alt={alt}></img>
    );
}

export default CreditCard;