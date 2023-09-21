import React from "react";

import authOkImg from '../images/auth_ok.svg'
import authErrorImg from '../images/auth_error.svg'

export default function InfoToolTip({onClose, isOpen, success}) {
  function catchEvent(evt) {
    evt.stopPropagation();
  }

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__info-container" onClick={catchEvent}>
        <div className="popup__close" onClick={onClose}></div>
        <div className="popup__image" style={{backgroundImage: success ? `url(${authOkImg})` : `url(${authErrorImg})`}}/>
        <p className="popup__info">{success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  );
}