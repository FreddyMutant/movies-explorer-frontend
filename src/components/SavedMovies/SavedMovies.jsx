import "./SavedMovies.css"
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";
import {useLayout} from "../../hooks/useLayout";
import {useEffect, useState} from "react";
import useInputAndCheckbox from "../../hooks/useInputAndCheckbox";
import {mainApi} from "../../utils/MainApi";
import {
  BLANK_SEARCH_MESSAGE,
  LOCAL_RESULT_ARRAY,
  NETWORK_MESSAGE_ERROR,
  SHORT_MOVIE_DURATION
} from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import {filterMovies} from "../../utils/utils";

export function SavedMovies({savedMovies, setSavedMovies, setSourceMovies, sourceMovies}) {
  const windowMode = useLayout();
  const [resultArray, setResultArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const [isNetFail, setIsNetFail] = useState(false);
  const {searchPattern, handleChange, handleCheckboxChange} = useInputAndCheckbox();

  useEffect(() => {
    if (savedMovies.length === 0) {
      setIsLoading(() => true);
      mainApi.getCards()
        .then((cards) => {
          setResultArray(cards);
          setSavedMovies(cards);
        })
        .catch((error) => {
          console.log(error);
          setIsNetFail(() => true);
        }).finally(() => setIsLoading(false));
    } else {
      setResultArray(savedMovies);
    }
  }, [])

  useEffect(() => {
    // Reset errors if user changes input data
    setIsBlank(false);
    setIsNetFail(false);
  }, [searchPattern])

  function onDelete(movie) {
    setIsNetFail(() => false);
    return mainApi.removeCard(movie["_id"])
      .then(() => {
        const newResultArray = resultArray.filter((card) => (card['_id'] !== movie['_id']));
        setResultArray(newResultArray);
        const newSavedList = savedMovies.filter((card) => (card['_id'] !== movie['_id']));
        setSavedMovies(newSavedList);
        const newSourceMovies = sourceMovies.map((card) => {
          if (card.id === movie.movieId) {
            card.saved = false
            return card
          } else {
            return card
          }
        })
        setSourceMovies(newSourceMovies);
        const localResultArray = JSON.parse(localStorage.getItem(LOCAL_RESULT_ARRAY));
        if (localResultArray) {
          const newLocalResultArray = localResultArray.map((card) => {
            if (card.id === movie.movieId) {
              card.saved = false
              return card
            } else {
              return card
            }
          })
          localStorage.setItem(LOCAL_RESULT_ARRAY, JSON.stringify(newLocalResultArray));
        }

        if (savedMovies.length <= 1) {
          setIsBlank(() => true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsNetFail(() => true);
      });
  }

  async function handleSubmit(searchPattern) {
    const newResultArray = filterMovies(searchPattern, savedMovies)
    if (newResultArray.length === 0) {
      setIsBlank(true);
    }
    setResultArray(newResultArray);
  }

  async function handleCheckbox(e, searchPattern) {
    await handleCheckboxChange(e);
    if (searchPattern.search) {
      const newResultArray = filterMovies({...searchPattern, isShort: e.target.checked}, savedMovies);
      setResultArray(newResultArray);
      setIsBlank(!newResultArray.length);
    } else {
      const newResultArray = savedMovies.filter((movie) => {
        return e.target.checked ? movie.duration <= SHORT_MOVIE_DURATION : movie
      })
      setResultArray(newResultArray);
      setIsBlank(!newResultArray.length);
    }
  }

  return (
    <>
      <Header/>
      <main className="main">
        <SearchForm onSubmit={handleSubmit} searchPattern={searchPattern} onChange={handleChange} onCheckbox={handleCheckbox}/>
        {isBlank && <p className="blank-search">{BLANK_SEARCH_MESSAGE}</p>}
        {isNetFail && <p className="network-error">{NETWORK_MESSAGE_ERROR}</p>}
        {isLoading ? <Preloader/> : resultArray &&  <MoviesCardList moviesList={resultArray.slice(0, windowMode.init)} onDelete={onDelete}/>}
        <div className="button-space"/>
      </main>
      <Footer/>
    </>
  )
}