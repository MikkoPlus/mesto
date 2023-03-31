'use strict';
import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDeletionСonfirm from '../components/PopupWithDeletionСonfirm.js';
import Card from '../components/Card.js';
import MyCard from '../components/MyCard';

import UserInfo from '../components/UserInfo';
import {
        editProfilePopupSelector,
        editProfileOpenPopupBtn,
        addCardPopupSelector,
        addCardOpenPopupBtn,
        fullscreenImagePopupSelector,
        deleteCardPopupSelector,
        cardTemplateSelector,
        placeCardSelector,
        formValidators,
        validateConfig,
        profileDataSelectors,
    } from '../utils/utils.js';

window.addEventListener('DOMContentLoaded', () => {

    function generateCard (...args) {
        const card = new Card(...args),
              cardElement = card.generateCard();
    
        return cardElement;
    }

    function generateMyCard (...args) {
        const card = new MyCard(...args),
              cardElement = card.generateCard();
    
        return cardElement;
    }

    const userInfo = new UserInfo(profileDataSelectors);

    // Создание экземпляра класса подтверждения удаления
    const popupWithDeletionСonfirm = new PopupWithDeletionСonfirm(deleteCardPopupSelector, (currentCard, id) => {
        fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '21d67130-4b88-41b2-a64a-c76e797b432e'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            currentCard.deleteCard();
        });
    });

    // Открытие попапов с формами

    editProfileOpenPopupBtn.addEventListener('click', () => {
        editPopup.setInputValues(userInfo.getUserInfo());
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
        const {name, link, likes, _id} = item;
        
         const cardElement = userInfo.getUserId() === item.owner._id  
        ? generateMyCard(
            {name, link, likes, _id},
            cardTemplateSelector,
            popupWithImage.handleCardClick,
            popupWithDeletionСonfirm.handleTrashBagClick)
        : generateCard(
            {name, link, likes},
            cardTemplateSelector,
            popupWithImage.handleCardClick);


        initialCardList.addItem(cardElement);
    }}, placeCardSelector);


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

    //Загрузка информации о пользователе с сервера 

    fetch('https://nomoreparties.co/v1/cohort-62/users/me', {
        headers: {
            authorization: '21d67130-4b88-41b2-a64a-c76e797b432e'
        }
    })
    .then(response => response.json())
    .then(data => {
        const {name, about, avatar, _id} = data;
        userInfo.setUserInfo(name, about);
        userInfo.setAvatar(avatar);
        userInfo.setUserId(_id);
    });
    

    // Загрузка карточек с сервера 

    fetch('https://nomoreparties.co/v1/cohort-62/cards', {
        headers: {
            authorization: '21d67130-4b88-41b2-a64a-c76e797b432e'
        }
    })
    .then(response => response.json())
    .then(data => {
        initialCardList.renderItems(data);
    });


    // Создание экземпляров класса попапа с формой

    // Редактирование и отправка данных профиля на сервер
    const editPopup = new PopupWithForm(editProfilePopupSelector, (inputValues) => {

        fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '21d67130-4b88-41b2-a64a-c76e797b432e',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputValues['profile-name'],
                about: inputValues['profile-job']
    
            })
        })
        .then(response => response.json())
        .then(data => {
            const {name, about} = data;
            userInfo.setUserInfo(name, about);
        });
    });

    // Создание новой карточки и отправка данных на сервер
    const addCardPopup = new PopupWithForm(addCardPopupSelector, (inputValues) => {


        fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
            method: 'POST',
            headers: {
                authorization: '21d67130-4b88-41b2-a64a-c76e797b432e',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputValues['card-name'],
                link: inputValues['card-url']
    
            })
        })
        .then(response => response.json())
        .then(data => {
            const cardElement = generateCard(
                data,
                cardTemplateSelector, 
                popupWithImage.handleCardClick, 
                popupWithDeletionСonfirm.handleTrashBagClick
            );
            initialCardList.addItem(cardElement);
        });
    });
});