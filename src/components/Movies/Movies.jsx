import "./Movies.css"
import {Header} from "../Header/Header";
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";
import {useEffect, useState} from "react";
import {CARD_LIST} from "../../utils/constants";
import {UseLayout} from "../../hooks/UseLayout";


export function Movies() {
  const [isButtonPresent, setIsButtonPresent] = useState(true);
  const windowMode = UseLayout();
  const arrayCapacity = CARD_LIST.length;
  const [movieAmount,setMovieAmount] = useState(0);

  useEffect(() => {
    if (arrayCapacity > windowMode.init) {
      setIsButtonPresent(true)
    }
    setMovieAmount(windowMode.init)
  }, [arrayCapacity, windowMode.init])

  function handleButton () {
    const currentMovieAmount = movieAmount + windowMode.more;
    setIsButtonPresent(arrayCapacity > movieAmount);
    if (movieAmount < arrayCapacity) {
      if (currentMovieAmount <= arrayCapacity) {
        setMovieAmount(currentMovieAmount);
      } else {
        setMovieAmount(arrayCapacity);
        setIsButtonPresent(false);
      }
    }
  }

  return (
    <>
      <Header/>
      <main className="main">
        <SearchForm/>
        <MoviesCardList moviesList={CARD_LIST.slice(0, movieAmount)}/>
        {isButtonPresent && <button className="main__button button-opacity" type="button" onClick={handleButton}>Ещё</button>}
      </main>
      <Footer/>
    </>
  )
}