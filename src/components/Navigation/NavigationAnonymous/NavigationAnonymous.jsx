import './NavigationAnonymous.css'
import {useNavigate} from "react-router-dom";

export function NavigationAnonymous() {
  const nav = useNavigate();
  return (
    <ul className="nav__anonim list-reset">
      <li className="nav__anonim-li">
        <button className="nav__anonim-btn-reg button-opacity" type="button" onClick={()=> nav("/signup")}>
          Регистрация</button>
      </li>
      <li className="nav__anonim-li">
        <button className="nav__anonim-btn-signin button-opacity" type="button" onClick={()=> nav("/signin")}>
          Войти</button>
      </li>
    </ul>
  )
}