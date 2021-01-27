import './index.scss';
import CreditCard from "./components/CreditCard";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">We care about your entertainment. Copyright 2019-2021 felix.com</p>
            <div>
                <CreditCard link="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Visa-icon.png" alt="visa"/>
                <CreditCard link="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png" alt="mastercard"/>
                <CreditCard link="https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/american_express-512.png" alt="amex"/>
                <CreditCard link="https://cdn.iconscout.com/icon/premium/png-512-thumb/discover-20-565056.png" alt="discover"/>
            </div>
        </footer>
    );
}

export default Footer;