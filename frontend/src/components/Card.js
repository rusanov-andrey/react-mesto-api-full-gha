import React from "react";

export default function Card(props) {

  function handleClick(evt) {
    props.onCardClick(props.cardData);
  }

  function handleLike(evt) {
    props.onCardLike(props.cardData);
  }

  function handleCardDelete(evt) {
    props.onCardDelete(props.cardData);
  }

  return (
    <li className="elements__item">
      <img className="elements__image" src={props.cardData.link} alt={props.cardData.name} onClick={handleClick}/>
      <div className="elements__title-content">
        <h2 className="elements__title">{props.cardData.name}</h2>
        <div className="elements__heart-container">
          <button className={`elements__heart ${props.cardData.myLike ? 'elements__heart_checked' : ''}`} type="button" aria-label="Отметить фотографию" onClick={handleLike}></button>
          <p className="elements__heart-count">{props.cardData.likeCount}</p>
        </div>
      </div>
      {props.cardData.isOwner() && <button className="elements__trash" type="button" onClick={handleCardDelete}></button>}
    </li>  
  );
}