import "./Footer.css"
import {Link} from "react-router-dom";

export function Footer() {
  const footerList = [
    {
      id: 1,
      name: "Яндекс.Практикум",
      link: "https://practicum.yandex.ru",
    },
    {
      id: 2,
      name: "Github",
      link: "https://github.com/FreddyMutant",
    },
  ]

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__down">
          <p className="footer__copy">© 2020</p>
          <nav className="footer__nav">
            {footerList.map(item => <Link key={item.id} to={item.link} target="_blank" className="footer__nav-link link-opacity">{item.name}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  )
}