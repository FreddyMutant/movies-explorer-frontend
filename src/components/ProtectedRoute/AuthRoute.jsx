import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export function AuthRoute() {
  const user = useContext(CurrentUserContext);
  return user.isLogIn ? <Navigate to="/" replace/> : <Outlet/>
}