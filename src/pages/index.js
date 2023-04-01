'use strict';
import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDeletionСonfirm from '../components/PopupWithDeletionСonfirm.js';
import Card from '../components/Card.js';
import MyCard from '../components/MyCard';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo';

import {
        editProfilePopupSelector,
        editProfileOpenPopupBtn,
        addCardPopupSelector,
        addCardOpenPopupBtn,
        fullscreenImagePopupSelector,
        deleteCardPopupSelector,
        refreshAvatarPopupSelector,
        cardTemplateSelector,
        placeCardSelector,
        formValidators,
        validateConfig,
        profileDataSelectors,
        avatarElement,
        apiConfig,
        loadingMessages
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

    function likeHandler(currentCard, heart, likeCounter, cardId) {

        !heart.classList.contains('place-card__heart_like')
        ? api.postLike(cardId)
        .then(data => {
            const {likes} = data;
            likeCounter.textContent = likes.length;
            currentCard.setLike();
            currentCard.changeLikeCounterVisability();
        })
        .catch(error => console.log(error))
        .finally(() => console.log('Лайк поставлен'))
        : api.deleteLike(cardId)
        .then(data => {
            const {likes} = data;
            likeCounter.textContent = likes.length;
            currentCard.removeLike();
            currentCard.changeLikeCounterVisability();
        })
        .catch(error => console.log(error))
        .finally(() => console.log('Лайк убран'));
    }

    const userInfo = new UserInfo(profileDataSelectors);

    // Создание экземпляра класса подтверждения удаления
    const popupWithDeletionСonfirm = new PopupWithDeletionСonfirm(deleteCardPopupSelector, (currentCard, id, btn, btnText) => {
        api.changeButtonText(btn, loadingMessages.delete);
        api.cardDelition(id)
        .then(data => {
            currentCard.deleteCard();
        })
        .catch(error => console.log(error))
        .finally(() => {
            api.changeButtonText(btn, btnText);
            console.log('Удаление карточки прошло успешно');
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

    avatarElement.addEventListener('click', () => {
        refreshAvatarPopup.open();
        formValidators['refresh-avatar'].resetValidation();
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
            likeHandler,
            popupWithDeletionСonfirm.handleTrashBagClick)
        : generateCard(
            {name, link, likes, _id},
            cardTemplateSelector,
            popupWithImage.handleCardClick,
            likeHandler);


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

    //Создание класса Api 

    const api = new Api(apiConfig);

    //Загрузка информации о пользователе с сервера 

    api.getProfileData()
        .then(data => {
            const {name, about, avatar, _id} = data;
            userInfo.setUserInfo(name, about);
            userInfo.setAvatar(avatar);
            userInfo.setUserId(_id);
        })
        .catch(error => console.log(error))
        .finally(() => console.log('Загрузка данных с сервера прошла успешно'));

    // Загрузка карточек с сервера 

    api.getCards()
    .then(data => {
        initialCardList.renderItems(data);
    })
    .catch(error => console.log(error))
    .finally(() => console.log('Загрузка данных с сервера прошла успешно'));


    // Создание экземпляров класса попапа с формой

    // Редактирование и отправка данных профиля на сервер
    const editPopup = new PopupWithForm(editProfilePopupSelector, (inputValues, btn, btnText) => {
        api.changeButtonText(btn, loadingMessages.save);
        api.postProfileData(inputValues)
        .then(data => {
            const {name, about} = data;
            userInfo.setUserInfo(name, about);
        })
        .catch(error => console.log(error))
        .finally(() => {
            api.changeButtonText(btn, btnText);
            console.log('Загрузка данных на сервера прошла успешно');
        });
    });

    // Создание новой карточки и отправка данных на сервер
    const addCardPopup = new PopupWithForm(addCardPopupSelector, (inputValues, btn, btnText) => {

        api.changeButtonText(btn, loadingMessages.save);
        api.postNewCard(inputValues)
        .then(data => {
            const {name, link, likes, _id} = data;
            const cardElement = generateMyCard(
                {name, link, likes, _id},
                cardTemplateSelector,
                popupWithImage.handleCardClick,
                likeHandler,
                popupWithDeletionСonfirm.handleTrashBagClick);

            initialCardList.addItem(cardElement);
        })
        .catch(error => console.log(error))
        .finally(() => {
            api.changeButtonText(btn, btnText);
            console.log('Загрузка данных на сервер прошла успешно');
        });
    });


    //Попап изменения аватара и отправка данных на сервер

    const refreshAvatarPopup = new PopupWithForm(refreshAvatarPopupSelector, (inputValues, btn, btnText) => {


        api.changeButtonText(btn, loadingMessages.refresh);
        api.postAvatar(inputValues)
        .then(data => {
            userInfo.setAvatar(data.avatar);
        })
        .catch(error => console.log(error))
        .finally(() => {
            api.changeButtonText(btn, btnText);
            console.log('Загрузка данных на сервера прошла успешно');
        });
        
    });
});