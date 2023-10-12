import {MAIN_API_URL} from "./constants";

class MainApi {
  constructor() {
    this._headers = {'Content-Type': 'application/json'};
    this._serverURL = MAIN_API_URL;
    this._handlePromiseReturn = (res) => {
      if (res.ok) {
        return res.json().then((data) => data.data || data);
      }
      return Promise.reject({status: res.status, res: res});
    };
  }

  getUserMe() {
    this._headers["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`
    return fetch(`${this._serverURL}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then((res) => this._handlePromiseReturn(res));
  }

  setUserData(userName, email) {
    return fetch(`${this._serverURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        email: email,
      }),
    }).then((res) => this._handlePromiseReturn(res));
  }

  getCards() {
    return fetch(`${this._serverURL}/movies`, {
      method: "GET",
      headers: this._headers
    }).then((res) => this._handlePromiseReturn(res));
  }

  addNewCard(card) {
    return fetch(`${this._serverURL}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then((res) => this._handlePromiseReturn(res));
  }

  removeCard(cardID) {
    return fetch(`${this._serverURL}/movies/${cardID}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._handlePromiseReturn(res));
  }

  register(userName, email, password) {
    return fetch(`${this._serverURL}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({userName, email, password})
    }).then(res => this._handlePromiseReturn(res));
  }

  login(email, password) {
    return fetch(`${this._serverURL}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({email, password})
    }).then(res => this._handlePromiseReturn(res));
  }
}

export const mainApi = new MainApi();