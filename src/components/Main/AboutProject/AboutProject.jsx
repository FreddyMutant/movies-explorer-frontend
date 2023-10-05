import "./AboutProject.css"

export function AboutProject() {
  return (
    <section className="project" id="about-project">
      <div className="project__container">
        <h2 className="project__title">О проекте</h2>

        <div className="project__about">
          <div className="project__about-1">
            <h3 className="project__about-title">Дипломный проект включал 5 этапов</h3>
            <p className="project__about-caption">Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.</p>
          </div>
          <div className="project__about-1">
            <h3 className="project__about-title">На выполнение диплома ушло 5 недель</h3>
            <p className="project__about-caption">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.</p>
          </div>

        </div>
        <div className="project__time">
          <div className="project__time-1">
            <div className="project__time-week project__time-week_back">1 неделя</div>
            <div className="project__time-description">Back-end</div>
          </div>
          <div className="project__time-2">
            <div className="project__time-week project__time-week_front">4 недели</div>
            <div className="project__time-description">Front-end</div>
          </div>
        </div>
      </div>
    </section>
  )
}