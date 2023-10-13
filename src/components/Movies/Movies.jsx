import "./Movies.css"
import {Header} from "../Header/Header";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";
import {useEffect, useState} from "react";
import {BLANK_SEARCH_MESSAGE, LOCAL_RESULT_ARRAY, NETWORK_MESSAGE_ERROR, SEARCH_PATTERN} from "../../utils/constants";
import {useLayout} from "../../hooks/useLayout";
import Preloader from "../Preloader/Preloader";
import useInputAndCheckbox from "../../hooks/useInputAndCheckbox";
import {Card, filterMovies} from "../../utils/utils";
import {moviesApi} from "../../utils/MoviesApi";
import {mainApi} from "../../utils/MainApi";


export function Movies({sourceMovies, setSourceMovies, savedMovies, setSavedMovies}) {
  const [isButtonPresent, setIsButtonPresent] = useState(false);
  const windowMode = useLayout();
  const [movieAmount,setMovieAmount] = useState(0);
  const [resultArray, setResultArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const [isNetFail, setIsNetFail] = useState(false);
  const {searchPattern, setSearchPattern, handleChange, handleCheckboxChange} = useInputAndCheckbox();

  useEffect(() => {
    // Restore data from local storage
    const searchPattern = JSON.parse(localStorage.getItem(SEARCH_PATTERN));
    const localResultArray = JSON.parse(localStorage.getItem(LOCAL_RESULT_ARRAY));
    if (searchPattern && localResultArray) {
      setSearchPattern(searchPattern);
      handleLocalStorage(searchPattern, localResultArray);
    }
    setMovieAmount(windowMode.init)
  }, [windowMode.init])

  useEffect(() => {
  // Reset errors if user changes input data
    setIsBlank(false);
    setIsNetFail(false);
  }, [searchPattern])

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

  function updateData(movie) {
    const moviesArray = JSON.parse(localStorage.getItem(LOCAL_RESULT_ARRAY));
    if (moviesArray) {
      const newResultArray = moviesArray.map(card => card.id === movie.id ? movie : card);
      setResultArray(newResultArray);
      localStorage.setItem(LOCAL_RESULT_ARRAY, JSON.stringify(newResultArray));
    }
    setSourceMovies(sourceMovies.map(card => card.id === movie.id ? movie : card));
  }

  function onLike(movie) {
    setIsNetFail(() => false);
    return mainApi.addNewCard(new Card(movie))
      .then((card) => {
        movie.saved = true;
        movie.movieId = card["_id"];
        updateData(movie);
        if (savedMovies.length) {
          setSavedMovies([...savedMovies, card]);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsNetFail(() => true);
      });
  }

  function onUnlike(movie) {
    setIsNetFail(() => false);
    return mainApi.removeCard(movie.movieId)
      .then(() => {
        movie.saved = false;
        updateData(movie);
        if (savedMovies.length) {
          setSavedMovies(savedMovies.filter(card => card["_id"] !== movie.movieId));
        }
      })
      .catch((error) => {
        console.log(error);
        setIsNetFail(() => true);
      });
  }

  function handleLocalStorage(searchData, moviesList) {
    localStorage.setItem(SEARCH_PATTERN, JSON.stringify(searchData));
    const localMovies = filterMovies(searchData, moviesList);
    localStorage.setItem(LOCAL_RESULT_ARRAY, JSON.stringify(localMovies));
    setIsBlank(localMovies.length === 0);
    setResultArray(localMovies);
    setIsButtonPresent(localMovies.length > windowMode.init)
  }

  async function loadMovies() {
    setIsLoading(true);
    try {
      const beatMovies = await moviesApi.getCards();
      const savedMovies = await mainApi.getCards();
      const newList = beatMovies.map((movie) => {
        const newMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.id)
        if (newMovie) {
          return {...movie, saved: true, movieId: newMovie['_id']}
        } else {
          return {...movie, saved: false}
        }
      })
      setSourceMovies(newList);
      setSavedMovies(savedMovies);
      handleLocalStorage(searchPattern, newList);
    } catch (error) {
      console.log(error);
      setIsNetFail(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(searchPattern) {
    if (!sourceMovies.length) {
      await loadMovies();
    } else {
      handleLocalStorage(searchPattern, sourceMovies);
    }
  }

  async function handleCheckbox(e, searchPattern) {
    await handleCheckboxChange(e);
    handleLocalStorage({...searchPattern, isShort: e.target.checked}, sourceMovies);
  }

  return (
    <>
      <Header/>
      <main className="main">
        <SearchForm onSubmit={handleSubmit} searchPattern={searchPattern} onChange={handleChange} onCheckbox={handleCheckbox}/>
        {isBlank && <p className="blank-search">{BLANK_SEARCH_MESSAGE}</p>}
        {isNetFail && <p className="network-error">{NETWORK_MESSAGE_ERROR}</p>}
        {isLoading ? <Preloader/> : resultArray && <MoviesCardList onLike={onLike} onUnlike={onUnlike} moviesList={resultArray.slice(0, movieAmount)}/>}
        {isButtonPresent && <button className="main__button button-opacity" type="button" onClick={handleButton}>Ещё</button>}
      </main>
      <Footer/>
    </>
  )
}