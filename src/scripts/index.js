'use strict';
import '../pages/index.css';
import FormValidator from "./components/FormValidator.js";
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';

import UserInfo from './components/UserInfo';
import {
        editProfilePopupSelector,
        editProfileOpenPopupBtn,
        addCardPopupSelector,
        addCardOpenPopupBtn,
        fullscreenImagePopupSelector,
        cardTemplateSelector,
        placeCardSelector,
        initialCards,
        formValidators,
        validateConfig,
        profileDataSelectors
    } from './utils/utils.js';

window.addEventListener('DOMContentLoaded', () => {

    const userInfo = new UserInfo(profileDataSelectors);

    // Создание экземпляров попапа с формами
    
    const editPopup = new PopupWithForm(editProfilePopupSelector, (inputValues) => {
        const keys = Object.values(inputValues);
        userInfo.setUserInfo(keys[0], keys[1]);
    });

    const addCardPopup = new PopupWithForm(addCardPopupSelector, (inputValues) => {

        const keys = Object.values(inputValues);
        const userDataObj = {
            imageDescription: keys[0],
            imagePath: keys[1]
        };

        const card = new Card(userDataObj, cardTemplateSelector, popupWithImage.handleCardClick),
              cardElement = card.generateCard();
        initialCardList.addItem(cardElement);
    });

    // Открытие попапов с формами

    editProfileOpenPopupBtn.addEventListener('click', () => {
        editPopup.setInputValues(userInfo.getUserInfo());
        editPopup.open();
    });

    addCardOpenPopupBtn.addEventListener('click', () =>  {
        addCardPopup.open();
        formValidators['add-card'].resetValidation();

    });



    const popupWithImage = new PopupWithImage(fullscreenImagePopupSelector);

    // Создание карточек классом Section

    const initialCardList = new Section({items: initialCards, renderer: (item) => {
        const card = new Card(item, cardTemplateSelector, popupWithImage.handleCardClick),
              cardElement = card.generateCard();
        initialCardList.addItem(cardElement);
    }}, placeCardSelector);

    initialCardList.renderItems();

    // Валидация форм

    const enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector));
        formList.forEach(formElement => {
            const validator = new FormValidator(config, formElement);
            const formName = formElement.getAttribute('name');

            formValidators[formName] = validator;
            validator.enableValidation();
        });
    };
    enableValidation(validateConfig);
    
});