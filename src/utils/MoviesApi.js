import {MOVIES_API_URL} from "./constants";

class MoviesApi {
  constructor() {
    this._headers = {'Content-Type': 'application/json'};
    this._serverURL = MOVIES_API_URL;
    this._handlePromiseReturn = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject({status: res.status, res: res});
    };
  }

  getCards() {
    return fetch(`${this._serverURL}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers
    }).then((res) => this._handlePromiseReturn(res));
  }
}

export const moviesApi = new MoviesApi();