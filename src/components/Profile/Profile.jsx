import {Header} from "../Header/Header";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import "./Profile.css"
import useFormAndValidation from "../../hooks/useFormAndValidation";
import {useNavigate} from "react-router-dom";

export function Profile({setCurrentUser}) {
  const user = useContext(CurrentUserContext)
  const [error, setError] = useState("");
  const {values, handleChange, errors, isValid, setIsValid, setValues} = useFormAndValidation();
  const [isButtonPresent, setIsButtonPresent] = useState(false);
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("При обновлении профиля произошла ошибка.");
    setIsValid(false);
  }

  function handleEdit() {

    setIsButtonPresent(true);
  }

  function signout() {
    setCurrentUser(p => ({...p, isLogIn: false}));
    nav("/", {replace: true})
  }

  useEffect(() => {
    setValues({name: user.name, email: user.email});
  }, [])

  return (
    <>
      <Header/>
      <main className="main-wrapper">
        <section className="account">
          <div className="account__container">
            <h1 className="account__info">Привет, {user.name}!</h1>
            <form className="account__form" noValidate onSubmit={handleSubmit}>
              <div className="account__label account__label_underline">
                <label className="account__input-container">
                  <span className="account__input-label">Имя</span>
                  <input
                    className="account__input"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="30"
                    value={values["name"] || ""}
                    onChange={handleChange}
                    required
                    disabled={!isButtonPresent}
                  />
                </label>
                <span className="account__input-error">{errors["name"]}</span>
              </div>
              <div className="account__label">
                <label className="account__input-container account__input-container_padding-top">
                  <span className="account__input-label">E-mail</span>
                  <input
                    className="account__input"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    minLength="8"
                    maxLength="30"
                    value={values["email"] || ""}
                    onChange={handleChange}
                    required
                    disabled={!isButtonPresent}
                  />
                </label>
                <span className="account__input-error">{errors["email"]}</span>
              </div>
              <div className="account__down">
                <p className="account__error">{error}</p>
                {isButtonPresent
                  ?
                  <button
                    type="submit"
                    className={`account__submit button-opacity${isValid ? "" : " account__submit_disabled"}`}
                    disabled={!isValid}>Сохранить
                  </button>
                  :
                  <>
                    <button type="button" className="account__redact button-opacity"
                            onClick={handleEdit}>Редактировать
                    </button>
                    <button type="button" className="account__signout button-opacity" onClick={signout}>Выйти из
                      аккаунта
                    </button>
                  </>
                }
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}