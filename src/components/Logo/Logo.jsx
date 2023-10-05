import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import "./Logo.css"

export function Logo() {
  return (
    <Link to="/" className="logo link-opacity">
      <img src={logo} alt="Лого"/>
    </Link>
  )
}