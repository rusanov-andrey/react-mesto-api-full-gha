import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header'
import Main from './Main'
import Footer from './Footer'

import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import { CardData } from '../utils/CardData';

import { ProfileData } from '../utils/ProfileData'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { AppContext } from '../contexts/AppContext'

import defaultProfileImage from '../images/profile_image.jpg'
import api from '../utils/Api';
import auth from '../utils/AuthApi';

import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';

import ProtectedRoute from "./ProtectedRoute";


function App() {
  const emptyCard = new CardData('', '');
  const defaulProfile = new ProfileData('Пользователь', 'Данные загружаются...', defaultProfileImage);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPCardPopupOpen, setAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAuthInfoPopupOpen, setAuthInfoPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(emptyCard);
  const [cardsData, setCardsData] = React.useState([])

  const [currentUser, setCurrentUser] = React.useState(defaulProfile);

  const [successRegistration, setSuccessRegistration] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('jwt'));
  const [authorizationStatusIsDefimite, setAuthorizationStatusIsDefimite] = React.useState(false);

  const [dataIsSending, setDataIsSending] = React.useState(false);


  const navigate = useNavigate();

  function handleCardClick(cardData) {
    setSelectedCard(cardData)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setSelectedCard(emptyCard);
    setAuthInfoPopupOpen(false);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddCardPopupOpen(true);
  }

  function handleCardLike(cardData) {
    const updateCardPromise = cardData.myLike ? api.unlikeCard(cardData._id) : api.likeCard(cardData._id);

    updateCardPromise
    .then((newCardDataJson) => {
      setCardsData(cardsData.map(_cardData => _cardData._id === newCardDataJson._id ? CardData.fromJSON(newCardDataJson, api.profileId) : _cardData))
    })
    .catch(err => console.log(err));
  }

  function handleCardDelete(cardData) {
    api.deleteCard(cardData._id)
    .then((result) => {
      setCardsData(cardsData.filter(data => data._id !== cardData._id));
    })
    .catch(err => console.log(err));
  }

  function handleSubmit(request) {
    setDataIsSending(true);
    request()
    .then(closeAllPopups)
    .catch(console.log)
    .finally(() => setDataIsSending(false));
  }

  function handleUpdateProfile(profileData) {
    handleSubmit(() => api.updateProfileData(profileData.toJSON()).then(updatedProfileJson => setCurrentUser(ProfileData.fromJSON(updatedProfileJson))));
  }

  function handleUpdateAvatar(profileData) {
    handleSubmit(() => api.updateProfileAvatar(profileData.toJSON()).then(updatedProfileJson => setCurrentUser(ProfileData.fromJSON(updatedProfileJson))));
  }

  function handleAddCard(cardData) {
    handleSubmit(() => api.addCard(cardData).then(newCardJson => setCardsData([CardData.fromJSON(newCardJson, api.profileId), ...cardsData])));
  }

  function handleRegister(login, password) {
    auth.register(login, password)
    .then(() => {
      setSuccessRegistration(true)
    })
    .catch(err => {
      setSuccessRegistration(false)
    })
    .finally(() => {
      setAuthInfoPopupOpen(true);
    });
  }

  function setLogInfo(login, token) {
    localStorage.setItem('login', login);
    localStorage.setItem('jwt', token);
    setLoggedIn(true);
    setAuthorizationStatusIsDefimite(true);
    setToken(token);
}
  function clearLogInfo() {
    localStorage.removeItem('login');
    localStorage.removeItem('jwt');
    setAuthorizationStatusIsDefimite(true);
    setLoggedIn(false);
    setToken('');
  }
  
  function handleLogin(login, password) {
    auth.login(login, password)
    .then((token) => {
      setLogInfo(login, token);
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      clearLogInfo();
      setSuccessRegistration(false)
      setAuthInfoPopupOpen(true);
    });
  }

  function handleExit(evt) {
    clearLogInfo();
    navigate('/sign-in');
}

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPCardPopupOpen || selectedCard || isAuthInfoPopupOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen, closeAllPopups]); 

  React.useEffect(() => {
    Promise.all([
       api.getProfile(),
       api.getCards()
    ])    
    .then(([profileJson, initialCards]) => {
      api.setProfileId(profileJson._id);
      const cardsData = initialCards.map(item => {
        return CardData.fromJSON(item, api.profileId);
      })
      setCurrentUser(ProfileData.fromJSON(profileJson))
      setCardsData(cardsData);
      return {initialCards: initialCards, userInfo: profileJson}
    })
    .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    const login = localStorage.getItem('login');

    if( login && token) {
      auth.checkToken(token)
      .then((jsonData) => {
        if(login === jsonData.email) {
          setLoggedIn(true);
          setAuthorizationStatusIsDefimite(true);
          navigate('/')
          return true;
        }
      })
      .catch(err => {
        clearLogInfo();
        navigate('/sign-in')
        return false;
      });

      setAuthorizationStatusIsDefimite(true);
      return;
    }

    setAuthorizationStatusIsDefimite(true);
    navigate('/sign-in');
  }, []);

  if(!authorizationStatusIsDefimite) {
    return (
      <div className="page"></div>
    );
  }

  return (
    <div className="page">
      <AppContext.Provider value={{ dataIsSending, closeAllPopups }}>
      <CurrentUserContext.Provider value={{currentUser, loggedIn}}>

        <Header userName={loggedIn ? localStorage.getItem('login') : ''} onExit={handleExit}/>
        <Routes>
          <Route path="/sign-up" element={<Register onSubmit={handleRegister}/>} />
          <Route path="/sign-in" element={<Login onSubmit={handleLogin}/>} />
          <Route path="/" element={
            <ProtectedRoute 
              component= {Main} 
              loggedIn={loggedIn}
              cardsData={cardsData}
              onEditAvatar={handleEditAvatarClick} 
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          } />
        </Routes>
        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateProfile={handleUpdateProfile}/> 
        <AddPlacePopup isOpen={isAddPCardPopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/> 

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <InfoToolTip isOpen={isAuthInfoPopupOpen} onClose={closeAllPopups} success={successRegistration}/>

      </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>  
  );
}

export default App;
