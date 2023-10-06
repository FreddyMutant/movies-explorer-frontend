import "./SearchForm.css"

export function SearchForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            required
          />
          <button className="search__button button-opacity" type="submit"/>
        </div>
        <label className="search__checkbox-label button-opacity">
          <input type="checkbox" className="search__checkbox"/>
          <span className="search__checkbox-span"/>
          <span className="search__checkbox-text">Короткометражки</span>
        </label>
      </form>
    </div>
  )
}