import "./SavedMovies.css"
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {SearchForm} from "../Movies/SearchForm/SearchForm";
import {MoviesCardList} from "../Movies/MoviesCardList/MoviesCardList";
import {CARD_LIST} from "../../utils/constants";
import {UseLayout} from "../../hooks/UseLayout";

export function SavedMovies() {
  const windowMode = UseLayout();

  return (
    <>
      <Header/>
      <main className="main">
        <SearchForm/>
        <MoviesCardList moviesList={CARD_LIST.slice(0, windowMode.savedMovies)}/>
      </main>
      <Footer/>
    </>
  )
}