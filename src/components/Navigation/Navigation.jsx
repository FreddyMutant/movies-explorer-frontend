import "./Navigation.css"
import {useContext, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {NavigationAnonymous} from "./NavigationAnonymous/NavigationAnonymous";
import {NavMain} from "./NavMain/NavMain";

export function Navigation() {
  const user = useContext(CurrentUserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`nav${isOpen ? ' nav_open' : ''}`}>
      {user.isLogIn ? <NavMain isOpen={isOpen} setIsOpen={setIsOpen}/> : <NavigationAnonymous/>}
    </nav>
  )
}