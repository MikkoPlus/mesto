'use strict';
import FormValidator from "./FormValidator.js";
import Card from './Card.js';
window.addEventListener('DOMContentLoaded', () => {

    const popupSection = document.querySelector('.popups'),
          popups = popupSection.querySelectorAll('.popup'),
          editProfilePopup = popupSection.querySelector('#edit-profile-popup'),
          addCardPopup = popupSection.querySelector('#add-card-popup'),
          fullscreenImagePopup = popupSection.querySelector('#open-image-popup'),
          fullscreenImage = fullscreenImagePopup.querySelector('.popup__fullscreen-image'),
          fullscreenDescr = fullscreenImagePopup.querySelector('.popup__descr'),
          inputName = editProfilePopup.querySelector('.form__input_type_name'),
          inputJob = editProfilePopup.querySelector('.form__input_type_job'),
          profileName = document.querySelector('.profile__name'),
          profileJob = document.querySelector('.profile__job'),
          formEditProfile = document.forms['edit-profile'],
          formAddCard = document.forms['add-card'],
          editProfileOpenPopupBtn = document.querySelector('.profile__edit-btn'),
          addCardOpenPopupBtn = document.querySelector('.profile__add-button'),
          inputCardName = addCardPopup.querySelector('.form__input_type_place-name'),
          inputCardUrl = addCardPopup.querySelector('.form__input_type_url'),
          cardTemplateSelector = '#place-card-template',
          placeCardContainer = document.querySelector('.places__list'),
          formValidators = {},
          validateConfig = {
            formSelector: '.form',
            inputSelector: '.form__input',
            submitButtonSelector: '.form__btn',
            inactiveButtonClass: 'form__btn_disabled',
            inputErrorClass: 'form__input_type_error'
          },
          initialCards = [
            {
                imageDescription: 'Atuh Beach',
                imagePath: './images/places/Atuh-beach.webp'
            },
            {
                imageDescription: 'Rice fields',
                imagePath: './images/places/Rice-fields.webp'
            },
            {
                imageDescription: 'Kuta beach',
                imagePath: './images/places/Kuta-beach.webp'
            },
            {
                imageDescription: 'Nusa-Penida island',
                imagePath: './images/places/Nusa-Penida.webp'
            },
            {
                imageDescription: 'Mount Batur',
                imagePath: './images/places/Mount-Batur.webp'
            },
            {
                imageDescription: 'Ubud',
                imagePath: './images/places/Ubud.webp'
            }
          ]; 

    // open and close popup functions

    const closeByEscape = (evt) => {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_active');
            closePopup(openedPopup);
        }
    };

    const openPopup = (popup) => {
        popup.classList.add('popup_active');
        document.addEventListener('keydown', closeByEscape);
    };

    const closePopup = (popup) => {
        popup.classList.remove('popup_active');
        document.removeEventListener('keydown', closeByEscape);
    };
    
    // form submit functions

    const submitAddCardForm = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            createUserCard(inputCardUrl.value, inputCardName.value);
            form.reset();
            closePopup(addCardPopup);
        });
    };

    const submitEditProfileForm = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            editProfileData();
            closePopup(editProfilePopup);
        });
    };

    const pasteValueToEditFormInputs = () =>{
        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;
    };
        
    const editProfileData = () => {
        if (inputName.value !== '' && inputJob.value !== '') {
            profileJob.textContent = inputJob.value;
            profileName.textContent = inputName.value;
        }
    };

    // add user cards functions

    const openFullScreenImg = (imagePath, imageDescription) => {
        fullscreenImage.src = imagePath;
        fullscreenImage.alt = imageDescription;
        fullscreenDescr.textContent = imageDescription;
        openPopup(fullscreenImagePopup);
    };

    const createUserDataObject = (url, descr) => {
        return {
            imageDescription: descr,
            imagePath: url
        };
    };

    const createUserCard = (url, descr) => {
        const userData = createUserDataObject(url, descr);
  
        renderCard(createCard(userData), placeCardContainer);
    };

    // render initial cards

    const renderCard = (cardElement, parentElement) => {
        parentElement.prepend(cardElement);
    };

    const createCard = (obj) => {
        const card = new Card(obj, cardTemplateSelector, openFullScreenImg);
        const cardElement = card.generateCard();

        return cardElement;
    };

    const enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector));
        formList.forEach(formElement => {
            const validator = new FormValidator(config, formElement);
            const formName = formElement.getAttribute('name');

            formValidators[formName] = validator;
            validator.enableValidation();
        });
    };

    initialCards.forEach((item) => {
         renderCard(createCard(item), placeCardContainer);
    });

    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_active')) {
                closePopup(popup);
            }
            if (evt.target.classList.contains('popup__close')) {
              closePopup(popup);
            }
        });
    });

    editProfileOpenPopupBtn.addEventListener('click', () => {
        pasteValueToEditFormInputs();
        openPopup(editProfilePopup); 
    });
    addCardOpenPopupBtn.addEventListener('click', () =>  {
        openPopup(addCardPopup);
        formValidators['add-card'].resetValidation();

    });

    enableValidation(validateConfig);
    submitAddCardForm(formAddCard);
    submitEditProfileForm(formEditProfile);
});