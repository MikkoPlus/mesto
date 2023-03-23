'use strict';
import '../pages/index.css';
import FormValidator from "./components/FormValidator.js";
import Card from './components/Card.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';

import atuhBeachImageLink from '../images/places/Atuh-beach.webp';
import riceFieldsImageLink from '../images/places/Rice-fields.webp';
import kutaBeachImageLink from '../images/places/Kuta-beach.webp';
import nusaPenidaImageLink from '../images/places/Nusa-Penida.webp';
import mountBaturImageLink from '../images/places/Mount-Batur.webp';
import ubudImageLink from '../images/places/Ubud.webp';

window.addEventListener('DOMContentLoaded', () => {

    const popupSection = document.querySelector('.popups'),
          popups = popupSection.querySelectorAll('.popup'),
          editProfilePopupSelector = '#edit-profile-popup',
          addCardPopup = popupSection.querySelector('#add-card-popup'),
          fullscreenImagePopupSelector = '#open-image-popup',
        //   inputName = editProfilePopup.querySelector('.form__input_type_name'),
        //   inputJob = editProfilePopup.querySelector('.form__input_type_job'),
          profileName = document.querySelector('.profile__name'),
          profileJob = document.querySelector('.profile__job'),
          formEditProfile = document.forms['edit-profile'],
          formAddCard = document.forms['add-card'],
          editProfileOpenPopupBtn = document.querySelector('.profile__edit-btn'),
          addCardOpenPopupBtn = document.querySelector('.profile__add-button'),
          inputCardName = addCardPopup.querySelector('.form__input_type_place-name'),
          inputCardUrl = addCardPopup.querySelector('.form__input_type_url'),
          cardTemplateSelector = '#place-card-template',
          placeCardSelector = '.places__list',
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
                imagePath: atuhBeachImageLink
            },
            {
                imageDescription: 'Rice fields',
                imagePath: riceFieldsImageLink
            },
            {
                imageDescription: 'Kuta beach',
                imagePath: kutaBeachImageLink
            },
            {
                imageDescription: 'Nusa-Penida island',
                imagePath: nusaPenidaImageLink
            },
            {
                imageDescription: 'Mount Batur',
                imagePath: mountBaturImageLink
            },
            {
                imageDescription: 'Ubud',
                imagePath: ubudImageLink
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
            // createUserCard(inputCardUrl.value, inputCardName.value);
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

    // const pasteValueToEditFormInputs = () =>{
    //     inputName.value = profileName.textContent;
    //     inputJob.value = profileJob.textContent;
    // };
        
    // const editProfileData = () => {
    //     if (inputName.value !== '' && inputJob.value !== '') {
    //         profileJob.textContent = inputJob.value;
    //         profileName.textContent = inputName.value;
    //     }
    // };

    // add user cards functions

    const openFullScreenImg = (imagePath, imageDescription) => {
        fullscreenImage.src = imagePath;
        fullscreenImage.alt = imageDescription;
        fullscreenDescr.textContent = imageDescription;
        openPopup(fullscreenImagePopupSelector);
    };

    const createUserDataObject = (url, descr) => {
        return {
            imageDescription: descr,
            imagePath: url
        };
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

    // popups.forEach((popup) => {
    //     popup.addEventListener('mousedown', (evt) => {
    //         if (evt.target.classList.contains('popup_active')) {
    //             closePopup(popup);
    //         }
    //         if (evt.target.classList.contains('popup__close')) {
    //           closePopup(popup);
    //         }
    //     });
    // });

    const editPopup = new Popup(editProfilePopupSelector);
    const popupWithImage = new PopupWithImage(fullscreenImagePopupSelector);

    editProfileOpenPopupBtn.addEventListener('click', () => {
        // pasteValueToEditFormInputs();
        editPopup.open();
        // openPopup(editProfilePopup); 
    });
    addCardOpenPopupBtn.addEventListener('click', () =>  {
        openPopup(addCardPopup);
        formValidators['add-card'].resetValidation();

    });

    enableValidation(validateConfig);
    submitAddCardForm(formAddCard);
    submitEditProfileForm(formEditProfile);


    // Создание карточек классом Section

    const initialCardList = new Section({items: initialCards, renderer: (item) => {
        const card = new Card(item, cardTemplateSelector, popupWithImage.handleCardClick),
              cardElement = card.generateCard();
        initialCardList.addItem(cardElement);
    }}, placeCardSelector);

    initialCardList.renderItems();
    
});