import {Link, NavLink, useLocation} from "react-router-dom";
import "./NavMain.css"

export function NavMain({isOpen, setIsOpen}) {
  const location = useLocation();

  return (
    <>
      <ul className={`nav__links list-reset${isOpen ? ' nav__links_active' : ''}`}>
        {isOpen && <li className="nav__link-top-container">
          <NavLink
            to="/"
            className={({isActive}) => `nav__link link-opacity${isActive ? ' nav__link_active' : ''}`}>
            Главная</NavLink>
        </li>}
        <li>
          <NavLink
            to="/movies"
            className={({isActive}) => `nav__link link-opacity${isActive ? ' nav__link_active' : ''}`}>
            Фильмы</NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className={({isActive}) => `nav__link link-opacity${isActive ? ' nav__link_active' : ''}`}>
            Сохранённые фильмы</NavLink>
        </li>
        <li className="nav__link-container">
          <Link
            to="/profile"
            className="nav__link-profile">
            Аккаунт
            <div className={`nav__link-profile-image ${location.pathname === '/' ? '' : ' nav__link-profile-image_theme_main'}`}/>
            </Link>
        </li>
      </ul>
      <button type="button" className={`nav__btn-burger button-opacity${isOpen ? ' nav__btn-burger_close' : ''}`}
              onClick={() => setIsOpen(p => !p)}/>
    </>
  )
}