import {Header} from "../Header/Header";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import "./Profile.css"
import useAuthFormAndValidation from "../../hooks/useAuthFormAndValidation";
import {mainApi} from "../../utils/MainApi";
import authErrorHandler from "../../utils/AuthErrorHandler";
import {PROFILE_UPDATE_ERROR, PROFILE_UPDATE_SUCCESS} from "../../utils/constants";
import {profileScheme} from "../../utils/validationSchemes";

export function Profile({setCurrentUser, onLogout}) {
  const user = useContext(CurrentUserContext)
  const [messageData, setMessageData] = useState({severity: "", message: ""});
  const {values, handleChange, errors, isValid, setIsValid, setValues} = useAuthFormAndValidation(profileScheme);
  const [isButtonPresent, setIsButtonPresent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsValid(false);
    mainApi.setUserData(values.name, values.email)
      .then(({name, email}) => {
        setCurrentUser((prev) => ({...prev, name: name, email: email}))
        setIsButtonPresent(false);
        setMessageData({severity: "info", message: PROFILE_UPDATE_SUCCESS});
      })
      .catch((error) => {
        const message = authErrorHandler(error.status, PROFILE_UPDATE_ERROR);
        setMessageData({severity: "error", message: message});
      })
  }

  function handleEdit() {
    setIsButtonPresent(true);
    setMessageData({severity: "info", message: ""})
  }

  useEffect(() => {
    setValues({name: user.name, email: user.email});
  }, [user.email, user.name])

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
                <p
                  className={`account__message ${messageData.severity === "error" ? "account__message_type_error" : "account__message_type_info"}`}>{messageData.message}</p>
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
                    <button type="button" className="account__signout button-opacity" onClick={onLogout}>Выйти из
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