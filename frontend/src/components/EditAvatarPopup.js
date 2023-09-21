import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { ProfileData } from "../utils/ProfileData";


export default function EditAvatarPopup(props) {
  const {currentUser} = React.useContext(CurrentUserContext);

  const avatarLinkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    const newProfileData = Object.assign(new ProfileData(), currentUser)
    newProfileData.avatarLink = avatarLinkRef.current.value;
    props.onUpdateAvatar(newProfileData);
  }

  React.useEffect(() => {
    avatarLinkRef.current.value = currentUser.avatarLink;
  }, [currentUser]);

  React.useEffect(() =>{
    if(!props.isOpen) {
      avatarLinkRef.current.value = currentUser.avatarLink;
    }
  }, [props.isOpen])

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' buttonName='Сохранить' isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="avatar-form-link" ref={avatarLinkRef} className="popup__input" type="url" name="avatar" placeholder="Ссылка на картинку" required/>
      <span id="avatar-form-link-error" className="popup__error"></span>
    </PopupWithForm> 
  );
}