import "./NotFound.css"
import {useNavigate} from "react-router-dom";

export function NotFound() {
  const nav = useNavigate();
  return (
    <section className="not-found">
      <h1 className="not-found__text">404</h1>
      <p className="not-found__description">Страница не найдена</p>
      <button type="button" className="not-found__go-back button-opacity" onClick={() => nav(-1)}>Назад</button>
    </section>
  )
}