import "./MoviesCard.css"
import {useLocation} from "react-router-dom";

export function MoviesCard({card}) {
  const location = useLocation();

  function convertDuration(duration) {
    const minutes = Math.floor(duration % 60);
    const hours = Math.floor(duration / 60);
    return `${hours > 0 ? hours + 'ч ' : ''}${minutes}м`;
  }

  return (
    <li className="movie-card">
      <img className="movie-card__image" src={card.image} alt="Фильм"/>
      <div
        className={`movie-card__container${location.pathname === "/saved-movies" ? " movie-card__container_opacity" : ""}`}>
        <h2 className="movie-card__info">{card.nameRu}</h2>
        {location.pathname === "/saved-movies" ?
          <button type="button" className="movie-card__btn movie-card__btn_delete button-opacity"/>
          : card.saved
            ? <button type="button" className="movie-card__btn movie-card__btn_saved button-opacity"/>
            : <button type="button" className="movie-card__btn button-opacity"/>}
      </div>
      <p className="movie-card__length">{convertDuration(card.duration)}</p>
    </li>
  )
}