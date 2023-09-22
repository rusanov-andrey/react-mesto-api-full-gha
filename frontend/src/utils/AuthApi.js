import ApiBase from './ApiBase'

class AuthApi extends ApiBase{
  constructor(options) {
    super(options)
  }

  register(email, password) {
    return this._post('/signup', {
      "password": password,
      "email": email 
    })
  }

  login(email, password) {
    return this._post('/signin', {
      "password": password,
      "email": email 
    })
    .then(jsonData => {
      return jsonData.token;
    })
  }

  checkToken(token) {
    return this._get('/users/me', {"Authorization": `Bearer  ${token}`}).then(jsonData => jsonData.data);
  }
}

const auth = new AuthApi({
  baseUrl: 'https://api.mestof.rusanovandrey.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;