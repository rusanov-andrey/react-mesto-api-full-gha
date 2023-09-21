import React from 'react';
import { Link } from 'react-router-dom';

import { useFormAndValidation } from '../hooks/useFormAndValidation'

function Login({onSubmit}) {
  const defaultValues = {login: '', password: ''};
  const subminButtonRef = React.useRef();
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation('auth__error_visible', defaultValues);

  React.useEffect(() => {
    resetForm(defaultValues);
  }, []);
  
  function handleFormChange(evt) {
    const validStatus = handleChange(evt);
    subminButtonRef.current.disabled = !validStatus;
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onSubmit(values.login, values.password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" name="login" method="POST" noValidate onSubmit={handleFormSubmit} >
        <input className="auth__input" name="login" placeholder="Email" type="email" value={values.login} onChange={handleFormChange} minLength="2" maxLength="128" required />
        <span className="auth__error"></span>
        <input className="auth__input" name="password" placeholder="Пароль" type="password" value={values.password} onChange={handleFormChange} minLength="2" maxLength="64"  required />
        <span className="auth__error"></span>
        <button className="auth__submit" ref={subminButtonRef} type="submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;