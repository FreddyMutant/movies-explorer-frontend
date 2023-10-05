import "./Main.css"
import {Header} from "../Header/Header";
import {Promo} from "./Promo/Promo";
import {NavTab} from "./NavTab/NavTab";
import {AboutProject} from "./AboutProject/AboutProject";
import {Techs} from "./Techs/Techs";
import {Student} from "./Student/Student";
import {Footer} from "../Footer/Footer";

export function Main() {
  return (
    <>
      <Header/>
      <Promo/>
      <NavTab/>
      <AboutProject/>
      <Techs/>
      <Student/>
      <Footer/>
    </>
  )
}