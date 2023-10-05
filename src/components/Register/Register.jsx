import "./Register.css"
import {Logo} from "../Logo/Logo";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import {Link} from "react-router-dom";
import {useState} from "react";

export function Register() {
  const [error, setError] = useState("");
  const {values, handleChange, errors, isValid} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    setError("При регистрации пользователя произошла ошибка.");
  }

  return (
    <section className="reg">
      <div className="reg__container">
        <Logo/>
        <h1 className="reg__info">Добро пожаловать!</h1>
        <form className="reg__form" onSubmit={handleSubmit} noValidate>
          <label className="reg__label">
            <span className="reg__input-label">Имя</span>
            <input
              className="reg__input"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              value={values["name"] || ""}
              onChange={handleChange}
              required
            />
            <span className="reg__input-error">{errors["name"]}</span>
          </label>
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
              disabled={!isValid}>Зарегистрироваться
            </button>
            <p className="reg__caption">
              Уже зарегистрированы?
              <Link to="/signin" className="reg__link link-opacity">Войти</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}