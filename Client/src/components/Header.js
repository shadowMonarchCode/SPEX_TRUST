import "../css/styles.css";
import logo from "../assets/BrandLogo.svg";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <div className="Header">
            <div className="Header_BankName">
                <Link to="/"><img src={logo} alt="Logo"/></Link>
            </div>
            <div className="Header_Options">
                <Link to="/"><p>Home</p></Link>
                <Link to="/transfer-money"><p>Transfer Money</p></Link>
            </div>
        </div>
    )
}

export default Header
