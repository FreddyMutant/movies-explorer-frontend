import "./NavTab.css"

export function NavTab() {
  return (
    <section className="nav-tab">
      <ul className="nav-tab__links list-reset">
        <li>
          <a href="/#about-project" className="nav-tab__link link-opacity">О проекте</a>
        </li>
        <li>
          <a href="/#techs" className="nav-tab__link link-opacity">Технологии</a>
        </li>
        <li>
          <a href="/#student" className="nav-tab__link link-opacity">Студент</a>
        </li>
      </ul>
    </section>
  )
}