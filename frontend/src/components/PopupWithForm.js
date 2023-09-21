import React from "react";
import { useFormAndValidation } from '../hooks/useFormAndValidation'
import { AppContext } from '../contexts/AppContext'


export default function PopupWithForm(props) {
  const popupId = props.name + '-form-popup';
  const subminButtonRef = React.useRef();

  const {dataIsSending} = React.useContext(AppContext);

  function catchEvent(evt) {
    evt.stopPropagation();
  }

  React.useEffect(() =>{
    if(props.isOpened) {
      subminButtonRef.current.disabled = true;
    }
  }, [props.isOpened])

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation('popup__error_visible');

  function handleFormChange(evt) {
    const validStatus = handleChange(evt);
    subminButtonRef.current.disabled = !validStatus;
  }

  function handleFormSubmit(evt) {
    props.onSubmit(evt);
    resetForm();
  }

  return (
    <div id={popupId} className={`popup${props.isOpened ? ' popup_opened' : ''}`} onClick={props.onClose}>
      <div className="popup__container" onClick={catchEvent}>
        <button className="popup__close" type="button" aria-label="Отменить изменения" onClick={props.onClose}></button>
        <form className="popup__form" name={props.name} method="POST" noValidate onSubmit={handleFormSubmit} onChange={handleFormChange}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button ref={subminButtonRef} className="popup__submit" type="submit">{dataIsSending ? 'Сохранение...' : props.buttonName}</button>
        </form>
      </div>
    </div>

  );
}