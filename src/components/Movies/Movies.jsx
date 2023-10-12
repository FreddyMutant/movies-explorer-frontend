import "./Movies.css"
import {Header} from "../Header/Header";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";
import {useEffect, useState} from "react";
import {CARD_LIST, LOCAL_RESULT_ARRAY, SEARCH_PATTERN} from "../../utils/constants";
import {UseLayout} from "../../hooks/UseLayout";
import Preloader from "../Preloader/Preloader";


export function Movies() {
  const [isButtonPresent, setIsButtonPresent] = useState(true);
  const windowMode = UseLayout();
  const [movieAmount,setMovieAmount] = useState(0);
  const [resultArray, setResultArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchPattern = JSON.parse(localStorage.getItem(SEARCH_PATTERN));
    const localResultArray = JSON.parse(localStorage.getItem(LOCAL_RESULT_ARRAY));
    if (searchPattern && localResultArray) {
      console.log()
    }
    setMovieAmount(windowMode.init)
  }, [windowMode.init])

  function handleButton () {
    const newMovieAmount = movieAmount + windowMode.more;
    if (newMovieAmount < resultArray.length) {
      setMovieAmount(newMovieAmount);
      setIsButtonPresent(true);
    } else if (movieAmount < resultArray.length) {
      setMovieAmount(newMovieAmount);
      setIsButtonPresent(false);
    } else {
      setIsButtonPresent(false);
    }
  }

  function onLike(movie) {

  }

  function onUnlike(movie) {

  }

  return (
    <>
      <Header/>
      <main className="main">
        <SearchForm/>
        {isLoading ? <Preloader/> : resultArray && <MoviesCardList onLike={onLike} onUnlike={onUnlike} moviesList={resultArray.slice(0, movieAmount)}/>}
        {isButtonPresent && <button className="main__button button-opacity" type="button" onClick={handleButton}>Ещё</button>}
      </main>
      <Footer/>
    </>
  )
}