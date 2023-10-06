import "./MoviesCardList.css"
import {MoviesCard} from "../MoviesCard/MoviesCard";

export function MoviesCardList({moviesList}) {

  return (
    <section className="movie-card-list">
      <ul className="movie-card-list__list list-reset">
        {moviesList.map(item => <MoviesCard card={item} key={item['id']}/>)}
      </ul>
    </section>
  )
}