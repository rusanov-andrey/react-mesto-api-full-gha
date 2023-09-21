import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { ProfileData } from "../utils/ProfileData";


export default function EditProfilePopup(props) {
  const {currentUser} = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [about, setAbout] = React.useState(currentUser.about);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleAboutChange(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const newProfileData = Object.assign(new ProfileData(), currentUser);
    newProfileData.name = name;
    newProfileData.about = about;
    props.onUpdateProfile(newProfileData);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  React.useEffect(() =>{
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [props.isOpen]);

  return (
    <PopupWithForm name='profile' title='Редактировать профиль' buttonName='Сохранить' isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="profile-form-name" className="popup__input" type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required value={name} onChange={handleNameChange}/>
      <span id="profile-form-name-error" className="popup__error"></span>
      <input id="profile-form-about" className="popup__input" type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required value={about} onChange={handleAboutChange}/>
      <span id="profile-form-about-error" className="popup__error"></span>
    </PopupWithForm>

  );
}