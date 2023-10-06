import "./Header.css"
import {Logo} from "../Logo/Logo";
import {Navigation} from "../Navigation/Navigation";
import {useLocation} from "react-router-dom";

export function Header() {
  const location = useLocation();

  return (
    <header className={`header ${location.pathname === "/" ? 'header_theme_landing' : 'header_theme_main'}`}>
      <Logo/>
      <Navigation/>
    </header>
  )
}