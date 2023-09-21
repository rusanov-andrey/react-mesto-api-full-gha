export default class ApiBase {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _get(url, additionalHeaders) {
    return fetch(`${this._baseUrl}${url}`, {
      headers: additionalHeaders ? {...this._headers, ...additionalHeaders} : this._headers
    })
    .then((res) => {
      return this._handleRes(res);
    })
  }

  _post(url, data) {
    return this._send(url, 'POST', data);
  }
  _put(url, data) {
    return this._send(url, 'PUT', data);
  }
  _patch(url, data) {
    return this._send(url, 'PATCH', data);
  }

  _send(url, method, data) {
    return fetch(`${this._baseUrl}${url}`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data || {}),
    })
    .then(res => {
      return this._handleRes(res);
    });
  }

  _delete(url, data) {
    return this._send(url, 'DELETE', data);
  }

  _handleRes(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }

  _handleDel(res) {
    if(res.ok) {
      return true;
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }
}
