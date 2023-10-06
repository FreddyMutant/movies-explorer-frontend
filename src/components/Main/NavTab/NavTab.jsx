import "./NavTab.css"

export function NavTab() {
  return (
    <section className="anchors">
      <ul className="anchors__links list-reset">
        <li>
          <a href="/#about-project" className="anchors__link link-opacity">О проекте</a>
        </li>
        <li>
          <a href="/#techs" className="anchors__link link-opacity">Технологии</a>
        </li>
        <li>
          <a href="/#student" className="anchors__link link-opacity">Студент</a>
        </li>
      </ul>
    </section>
  )
}