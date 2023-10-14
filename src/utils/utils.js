import {MOVIES_API_URL, SHORT_MOVIE_DURATION} from "./constants";

export function filterMovies(searchPattern, movieList) {
  return movieList.filter((movie) => {
    const result = movie.nameRU.toLowerCase().includes(searchPattern.search.toLowerCase())
    return searchPattern.isShort ? (movie.duration <= SHORT_MOVIE_DURATION && result) : result
  })
}

export class Card {
  constructor(card) {
    this.country = card.country;
    this.director = card.director;
    this.duration = card.duration;
    this.year = card.year;
    this.description = card.description;
    this.image = MOVIES_API_URL + card.image.url;
    this.trailerLink = card.trailerLink;
    this.thumbnail = MOVIES_API_URL + card.image.formats.thumbnail.url;
    this.movieId = card.id;
    this.nameRU = card.nameRU;
    this.nameEN = card.nameEN;
  }
}
