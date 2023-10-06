import "./Student.css"
import photo from "../../images/photo.png"
import {Link} from "react-router-dom";

export function Student() {
  const portfolioList = [
    {
      id: 1,
      name: "Статичный сайт",
      link: "https://github.com/FreddyMutant/how-to-learn",
    },
    {
      id: 2,
      name: "Адаптивный сайт",
      link: "https://github.com/FreddyMutant/russian-travel",
    },
    {
      id: 3,
      name: "Одностраничное приложение",
      link: "https://github.com/FreddyMutant/react-mesto-api-full-gha",
    }]

  return (
    <section className="student" id="student">
      <div className="student__container">
        <h2 className="student__title">Студент</h2>
        <div className="student__info">
          <div className="student__info-container">
            <h3 className="student__subtitle">Виталий</h3>
            <p className="student__job">Фронтенд-разработчик, 30 лет</p>
            <p className="student__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
              есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
              компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
              ушёл с постоянной работы.</p>
            <Link to="https://github.com/FreddyMutant" className="student__git link-opacity"
                  target="_blank">Github</Link>
          </div>
          <img className="student__img" alt="Фото" src={photo}/>
        </div>
        <p className="student__portfolio">Портфолио</p>
        <ul className="student__list list-reset">
          {portfolioList.map(item => <li key={item.id} className="student__li">
            <Link to={item.link} target="_blank" className="student__link link-opacity">
              {item.name}
              <span className="student__link-span">↗</span>
            </Link>
          </li>)}
        </ul>
      </div>
    </section>
  )
}