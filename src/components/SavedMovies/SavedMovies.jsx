import "./SavedMovies.css"
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";
import {CARD_LIST} from "../../utils/constants";
import {UseLayout} from "../../hooks/UseLayout";

export function SavedMovies() {
  const windowMode = UseLayout();

  function onDelete() {

  }

  return (
    <>
      <Header/>
      <main className="main">
        <SearchForm/>
        <MoviesCardList moviesList={CARD_LIST.slice(0, windowMode.savedMovies)} onDelete={onDelete}/>
        <div className="button-space"/>
      </main>
      <Footer/>
    </>
  )
}