import "./App.css"
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Main} from "../Main/Main";
import {Movies} from "../Movies/Movies";
import {SavedMovies} from "../SavedMovies/SavedMovies";
import {Register} from "../Register/Register";
import {Login} from "../Login/Login";
import {Profile} from "../Profile/Profile";
import {NotFound} from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {AuthRoute} from "../ProtectedRoute/AuthRoute";
import {mainApi} from "../../utils/MainApi";

export function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    isLogIn: !!localStorage.getItem("jwt")
  });
  const [sourceMovies, setSourceMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.getUserMe()
        .then(({name, email}) => {
          setCurrentUser((prev) => ({name: name, email: email, isLogIn: true}))
        })
        .catch(error => console.log(error))
    }
  }, [])

  function login(email, password) {
    return mainApi.login(email, password)
      .then(({token}) => {
        localStorage.setItem("jwt", token);
        return mainApi.getUserMe()
      })
      .then(({name, email}) => {
        setCurrentUser((prev) => ({name: name, email: email, isLogIn: true}))
        nav("/movies", {replace: true});
        return true
      })
  }

  function register(name, email, password) {
    return mainApi.register(name, email, password).then(() => login(email, password))
  }

  function logout() {
    setCurrentUser(() => ({name: "", email: "", isLogIn: false}));
    setSavedMovies([]);
    setSourceMovies([]);
    localStorage.clear();
    nav("/", {replace: true});
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/saved-movies" element={<SavedMovies/>}/>
            <Route path="/profile" element={<Profile setCurrentUser={setCurrentUser} onLogout={logout}/>}/>
          </Route>
          <Route element={<AuthRoute/>}>
            <Route path="/signup" element={<Register onRegister={register}/>}/>
            <Route path="/signin" element={<Login onLogin={login}/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}