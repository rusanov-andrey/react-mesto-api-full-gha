import ApiBase from './ApiBase'

class Api extends ApiBase{
  constructor(options) {
    super(options)
    this._profileId = '';
  }

  getProfile() {
    return this._get('/users/me');
  }
  updateProfileData(data) {
    return this._patch('/users/me', data)
  }
  updateProfileAvatar(data) {
    return this._patch('/users/me/avatar', data)
  }

  setProfileId(id) {
    this._profileId = id;
  }
  get profileId() {
    return this._profileId;
  }

  getCards() {
    return this._get('/cards');
  }
  addCard(data) {
    return this._post('/cards', data)
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      if(res.ok) {
        return true;
      }
  
      return Promise.reject(`Ошибка ${res.status}`);
      });
  }

  likeCard(id) {
    return this._put(`/cards/${id}/likes`)
  }
  unlikeCard(id) {
    return this._delete(`/cards/${id}/likes`)
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    Authorization: 'dad7bd08-9118-4abf-8ed0-6a6d22dfcdd6',
    'Content-Type': 'application/json'
  }
});

export default api;