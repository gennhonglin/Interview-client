import "./Header.scss";
import Logo from "../../assets/logo/White_Mealtime_Header.svg";

export default function Header() {
    return (
        <div className="header">
            <img src={Logo} alt="Logo" className="header__logo" />
        </div>
    );
}