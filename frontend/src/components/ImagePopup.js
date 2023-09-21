import React from "react";

export default function ImagePopup(props) {
  function catchEvent(evt) {
    evt.stopPropagation();
  }

  return (
    <div id="photo-view-popup" className={`popup popup_dark-background${props.card.link ? ' popup_opened' : ''}`} onClick={props.onClose}>
      <div className="popup__photo-container" onClick={catchEvent}>
        <img className="popup__photo-image" src={props.card.link} alt={props.card.name}/>
        <div className="popup__close" onClick={props.onClose}></div>
        <h2 className="popup__photo-title">{props.card.name}</h2>
      </div>
    </div>
  );
}