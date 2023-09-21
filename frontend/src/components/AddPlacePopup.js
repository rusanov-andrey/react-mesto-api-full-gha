import React from "react";
import PopupWithForm from './PopupWithForm';
import { CardData } from "../utils/CardData";


export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const newCardData = new CardData(name, link, true);
    props.onAddCard(newCardData);
    setTimeout(() => {
      setName('');
      setLink('');
    }, 1000);
  }

  function handleClose(evt) {
    props.onClose(evt);
    setTimeout(() => {
      setName('');
      setLink('');
    }, 1000);
  }

  React.useEffect(() =>{
    if(!props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen])

  return (
    <PopupWithForm name='photo' title='Новое место' buttonName='Создать' isOpened={props.isOpen} onClose={handleClose} onSubmit={handleSubmit}>
      <input id="photo-form-name" className="popup__input" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required value={name} onChange={handleNameChange}/>
      <span id="photo-form-name-error" className="popup__error"></span>
      <input id="photo-form-link" className="popup__input" type="url" name="link" placeholder="Ссылка на картинку" required value={link} onChange={handleLinkChange}/>
      <span id="photo-form-link-error" className="popup__error"></span>
    </PopupWithForm> 
  );
}