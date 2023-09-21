import React from 'react';
import defaultProfileImage from '../images/profile_image.jpg'
import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'


export default function Main(props) {
  const {currentUser} = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" src={currentUser.avatarLink} alt="Аватар профиля" onClick={props.onEditAvatar}/>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-photo" type="button" aria-label="Добавить фото" onClick={props.onAddCard}></button>
      </section>

      <section className="galary">
        <ul className="elements">
          {props.cardsData.map(cardData => (
            <Card key={cardData._id} cardData={cardData} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}