import "./MoviesCard.css"
import {useLocation} from "react-router-dom";
import {MOVIES_API_URL} from "../../utils/constants";

export function MoviesCard({card, onLike, onDelete, onUnlike}) {
  const location = useLocation();

  function convertDuration(duration) {
    const minutes = Math.floor(duration % 60);
    const hours = Math.floor(duration / 60);
    return `${hours > 0 ? hours + 'ч ' : ''}${minutes}м`;
  }

  function handleLike() {
    onLike(card);
  }

  function handleUnlike () {
    onUnlike(card);
  }

  function handleDelete() {
    onDelete(card);
  }

  function handleImageClick() {
    window.open(card.trailerLink, "_blank", "noreferrer")
  }

  return (
    <li className="movie-card">
      <img className="movie-card__image" src={location.pathname === "/saved-movies" ? card.image : `${MOVIES_API_URL}${card.image.url}`}
           alt="Фильм" onClick={handleImageClick}/>
      <div
        className={`movie-card__container${location.pathname === "/saved-movies" ? " movie-card__container_opacity" : ""}`}
        onClick={location.pathname === "/saved-movies" ? handleDelete : null}>
        <h2 className="movie-card__info">{card.nameRU}</h2>
        {location.pathname === "/saved-movies" ?
          <button type="button" className="movie-card__btn movie-card__btn_delete button-opacity"/>
          : card.saved
            ? <button type="button" className="movie-card__btn movie-card__btn_saved button-opacity" onClick={handleUnlike}/>
            : <button type="button" className="movie-card__btn button-opacity" onClick={handleLike}/>}
      </div>
      <p className="movie-card__length">{convertDuration(card.duration)}</p>
    </li>
  )
}