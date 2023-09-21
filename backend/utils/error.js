/* eslint-disable max-classes-per-file */

class MestoError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

class NotFoundError extends MestoError {
  constructor(message = 'Ресурсс не найден') {
    super(404, message);
  }
}

class BadRequestError extends MestoError {
  constructor(message = 'Переданы некорректные данные') {
    super(400, message);
  }
}

class NotAuthorizedError extends MestoError {
  constructor(message = 'Неправильные почта или пароль') {
    super(401, message);
  }
}

class ForbidenError extends MestoError {
  constructor(message = 'Нет прав') {
    super(403, message);
  }
}

class ConflictError extends MestoError {
  constructor(message = 'Нарушена уникальность') {
    super(409, message);
  }
}

class CommonError extends MestoError {
  constructor(message = 'Ошибка сервера') {
    super(500, message);
  }
}

module.exports = {
  MestoError,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
  ForbidenError,
  ConflictError,
  CommonError,
};
