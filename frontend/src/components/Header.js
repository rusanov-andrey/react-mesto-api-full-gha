import React from "react";
import { Link, useLocation } from 'react-router-dom';

import logoImage from '../images/mesto.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function printUserInfo(path, userNameuserName, onExit) {
  switch(path) {
    case '/sign-in':
      return <Link className="header__link" to="/sign-up">Регистрация</Link>;
    case '/sign-up':
      return <Link className="header__link" to="/sign-in">Вход</Link>;
  }

  return (<> <p className="header__user-info">{userNameuserName}</p>  <Link className="header__link" to="/sign-in" onClick={onExit}>Выйти</Link></>);
}

export default function Header({userName, onExit}) {
  const location = useLocation();
  const {loggedIn} = React.useContext(CurrentUserContext);

  const [menuIsOpened, setMenuIsOpened] = React.useState(false);

  function openUserInfo(evt) {
    setMenuIsOpened(true);
  }

  function closeUserInfo(evt) {
    setMenuIsOpened(false);
  }

  function handleExit(evt) {
    setMenuIsOpened(false);
    onExit(evt)
  }

  return (
    <header className="header">
      <div className="header__user-info-narrow-container" style={{display: menuIsOpened ? 'flex' : 'none'}}>
        {printUserInfo(location.pathname, userName, handleExit)}
      </div>
      <div className="header__line"  style={menuIsOpened ? {borderTop: '1px solid rgba(84, 84, 84, 0.7)'} : {}}>
        <img className="header__logo" src={logoImage} alt="Эмблема Место"/>
        <div className="header__info">{printUserInfo(location.pathname, userName, handleExit)}</div>
        {!loggedIn && <div className="header__info header__info_narrow">{printUserInfo(location.pathname, userName, handleExit)}</div>}
        {loggedIn && <div className="header__menu" style={{visibility: menuIsOpened ? 'hidden' : 'visible'}} onClick={openUserInfo}>&#9776;</div>}
        {loggedIn && <div className="header__menu-close" style={!menuIsOpened ? {} : {display: 'block'}} onClick={closeUserInfo}></div>}
      </div>
    </header>
  );
}