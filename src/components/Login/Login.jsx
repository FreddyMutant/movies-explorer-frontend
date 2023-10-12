import {useState} from "react";
import {Logo} from "../Logo/Logo";
import {Link} from "react-router-dom";
import useAuthFormAndValidation from "../../hooks/useAuthFormAndValidation";
import authErrorHandler from "../../utils/AuthErrorHandler";
import {LOGIN_MESSAGE_ERROR} from "../../utils/constants";
import {loginScheme} from "../../utils/validationSchemes";

export function Login({onLogin}) {
  const [error, setError] = useState("");
  const {values, handleChange, errors, isValid, setIsValid} = useAuthFormAndValidation(loginScheme);

  function handleSubmit(e) {
    e.preventDefault();
    setIsValid(false);
    onLogin(values.email, values.password).catch(error => setError(authErrorHandler(error.status, LOGIN_MESSAGE_ERROR)))
  }

  return (
    <main className="main-wrapper">
      <section className="reg">
        <div className="reg__container">
          <Logo/>
          <h1 className="reg__info">Рады видеть!</h1>
          <form className="reg__form" onSubmit={handleSubmit} noValidate>
            <label className="reg__label">
              <span className="reg__input-label">E-mail</span>
              <input
                className="reg__input"
                type="email"
                name="email"
                placeholder="Email"
                minLength="8"
                maxLength="30"
                value={values["email"] || ""}
                onChange={handleChange}
                required
              />
              <span className="reg__input-error">{errors["email"]}</span>
            </label>
            <label className="reg__label">
              <span className="reg__input-label">Пароль</span>
              <input
                className="reg__input"
                type="password"
                name="password"
                placeholder="Пароль"
                minLength="8"
                maxLength="30"
                value={values["password"] || ""}
                onChange={handleChange}
                required
              />
              <span className="reg__input-error">{errors["password"]}</span>
            </label>
            <div className="reg__down">
              <p className="reg__error">{error}</p>
              <button
                type="submit"
                className={`reg__submit button-opacity${isValid ? "" : " reg__submit_disabled"}`}
                disabled={!isValid}>
                Войти
              </button>
              <p className="reg__caption">
                Ещё не зарегистрированы?
                <Link to="/signup" className="reg__link link-opacity">Регистрация</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}