import "./SearchForm.css"
import {useEffect, useState} from "react";
import {BLANK_INPUT_MESSAGE} from "../../utils/constants";
import {useLocation} from "react-router-dom";

export function SearchForm({searchPattern, onChange, onSubmit, onCheckbox}) {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset errors if user changes input data
    setIsBlank(false);
  }, [searchPattern])

  function handleSubmit(e) {
    e.preventDefault();
    setIsFormDisabled(() => true)
    searchPattern.search.trim() ? onSubmit(searchPattern) : setIsBlank(true);
    setIsFormDisabled(() => false);
  }

  function handleCheckbox(e) {
    setIsFormDisabled(() => true);
    if (location.pathname === "/movies") {
      searchPattern.search.trim() ? onCheckbox(e, searchPattern) : setIsBlank(true);
    } else {
      onCheckbox(e, searchPattern);
    }
    setIsFormDisabled(() => false);
  }

  return (
    <div className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        <div className="search__container">
          <input
            name="search-input"
            className="search__input"
            placeholder="Фильм"
            type="text"
            required
            value={searchPattern.search || ""}
            onChange={onChange}
            disabled={isFormDisabled}
          />
          <button className="search__button button-opacity" type="submit" disabled={isFormDisabled}/>
        </div>
        {isBlank && <p className="search__blank-message">{BLANK_INPUT_MESSAGE}</p>}
        <label className="search__checkbox-label button-opacity">
          <input
            type="checkbox"
            name="checkbox"
            className="search__checkbox"
            onChange={handleCheckbox}
            checked={searchPattern.isShort}
            disabled={isFormDisabled}
          />
          <span className="search__checkbox-span"/>
          <span className="search__checkbox-text">Короткометражки</span>
        </label>
      </form>
    </div>
  )
}