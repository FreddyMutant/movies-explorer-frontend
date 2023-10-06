import "./App.css"
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Main} from "../Main/Main";
import {Movies} from "../Movies/Movies";
import {SavedMovies} from "../SavedMovies/SavedMovies";
import {Register} from "../Register/Register";
import {Login} from "../Login/Login";
import {Profile} from "../Profile/Profile";
import {NotFound} from "../NotFound/NotFound";

export function App() {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "Виталий",
    email: "pochta@yandex.ru",
    isLogIn: false
  });


  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/saved-movies" element={<SavedMovies/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/signin" element={<Login setCurrentUser={setCurrentUser}/>}/>
            <Route path="/profile" element={<Profile setCurrentUser={setCurrentUser}/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </CurrentUserContext.Provider>
    </div>
  )
}