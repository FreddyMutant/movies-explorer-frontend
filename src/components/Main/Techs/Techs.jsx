import "./Techs.css"

export function Techs() {
  const techsList = [
    {id: 1, item: "HTML"},
    {id: 2, item: "CSS"},
    {id: 3, item: "JS"},
    {id: 4, item: "React"},
    {id: 5, item: "Git"},
    {id: 6, item: "Express.js"},
    {id: 7, item: "mongoDB"}
  ]
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__about">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
          проекте.</p>
        <ul className="techs__list list-reset">
          {techsList.map(item => <li key={item.id} className="techs__li">{item.item}</li>)}
        </ul>
      </div>
    </section>
  )
}