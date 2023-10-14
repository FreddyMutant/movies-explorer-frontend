import "./MoviesCardList.css"
import {MoviesCard} from "../MoviesCard/MoviesCard";

export function MoviesCardList({moviesList, onLike, onUnlike, onDelete}) {

  return (
    <section className="movie-card-list">
      <ul className="movie-card-list__list list-reset">
        {moviesList.map(item => <MoviesCard onLike={onLike} onUnlike={onUnlike} onDelete={onDelete} card={item} key={item["id"] || item["movieId"]}/>)}
      </ul>
    </section>
  )
}