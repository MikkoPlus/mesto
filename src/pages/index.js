'use strict';
import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';

import UserInfo from '../components/UserInfo';
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
        profileDataSelectors,
    } from '../utils/utils.js';

window.addEventListener('DOMContentLoaded', () => {

    function generateCard (data, cardTemplateSelector, cardClickFunction) {
        const card = new Card(data, cardTemplateSelector, cardClickFunction),
              cardElement = card.generateCard();
    
        return cardElement;
    }

    const userInfo = new UserInfo(profileDataSelectors);

    // Создание экземпляров попапа с формами
    
    const editPopup = new PopupWithForm(editProfilePopupSelector, (inputValues) => {
        userInfo.setUserInfo(inputValues['profile-name'], inputValues['profile-job']);
    });

    const addCardPopup = new PopupWithForm(addCardPopupSelector, (inputValues) => {

        const userDataObj = {
            imageDescription: inputValues['card-name'],
            imagePath: inputValues['card-url']
        };

        const cardElement = generateCard(userDataObj, cardTemplateSelector, popupWithImage.handleCardClick);

        initialCardList.addItem(cardElement);
    });

    // Открытие попапов с формами

    editProfileOpenPopupBtn.addEventListener('click', () => {
        editPopup.setInputValues(userInfo.getUserInfo());
        console.log(userInfo.getUserInfo());
        formValidators['edit-profile'].resetValidation();
        editPopup.open();
    });

    addCardOpenPopupBtn.addEventListener('click', () =>  {
        addCardPopup.open();
        formValidators['add-card'].resetValidation();
    });

    const popupWithImage = new PopupWithImage(fullscreenImagePopupSelector);

    // Создание карточек классом Section

    const initialCardList = new Section({renderer: (item) => {
        const cardElement = generateCard(item, cardTemplateSelector, popupWithImage.handleCardClick);

        initialCardList.addItem(cardElement);
    }}, placeCardSelector);

    initialCardList.renderItems(initialCards);

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