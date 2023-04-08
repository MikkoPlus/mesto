'use strict';
import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDeletionСonfirm from '../components/PopupWithDeletionСonfirm.js';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo';

import {
        popupWithEditProfileFormSelector,
        buttonEditProfileOpenPopup,
        popupWithAddCardFormSelector,
        buttonAddCardOpenPopup,
        popupWithFullscreenImageSelector,
        popupWithDeleteConfirmButtonSelector,
        popupWithRefreshAvatarFormSelector,
        cardTemplateSelector,
        placeCardSelector,
        formValidators,
        validateConfig,
        profileDataSelectors,
        avatarElement,
        apiConfig,
        loadingMessages,
        generateCard,
        generateMyCard,
    } from '../utils/utils.js';

window.addEventListener('DOMContentLoaded', () => {

    function handleLikeButton(card) {

        if (!card.isLiked()) {
            api.postLike(card.getCardId())
            .then(data => {
                const {likes} = data;
                card.updateLikes(likes);

                console.log('Лайк поставлен');
             })
            .catch(error => console.log(error));
        } else {
            api.deleteLike(card.getCardId())
            .then(data => {
                const {likes} = data;
                card.updateLikes(likes);

                console.log('Лайк убран');
            })
            .catch(error => console.log(error));
        }
    }

    // Создание класса UserInfo

    const userInfo = new UserInfo(profileDataSelectors);

    // Создание класса Api 

    const api = new Api(apiConfig);

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

    // Открытие попапов с формами

    buttonEditProfileOpenPopup.addEventListener('click', () => {
        popupWithEditForm.setInputValues(userInfo.getUserInfo());
        formValidators['edit-profile'].resetValidation();
        popupWithEditForm.open();
    });

    buttonAddCardOpenPopup.addEventListener('click', () =>  {
        popupWithAddCardForm.open();
        formValidators['add-card'].resetValidation();
    });

    avatarElement.addEventListener('click', () => {
        popupWithRefreshAvatorForm.open();
        formValidators['refresh-avatar'].resetValidation();
    });


    // Создание карточек классом Section

    const cardsSection = new Section({renderer: (item) => {
        const {name, link, likes, _id} = item;
        const userId = userInfo.getUserId();
  
        if (userId === item.owner._id) {
            const cardElement = generateMyCard(
                {name, link, likes, _id},
                userId,
                cardTemplateSelector,
                popupWithImage.handleCardClick,
                handleLikeButton,
                popupWithDeletionСonfirm.handleTrashBagClick
            );

            cardsSection.addItem(cardElement);
        } else {
            const cardElement = generateCard(
                {name, link, likes, _id},
                userId,
                cardTemplateSelector,
                popupWithImage.handleCardClick,
                handleLikeButton
            );


            cardsSection.addItem(cardElement);
        }
        
    }}, placeCardSelector);

    // Создание класса попапа с изображением

    const popupWithImage = new PopupWithImage(popupWithFullscreenImageSelector);

    popupWithImage.setClickCloseEventListeners();

    // Загрузка информации о пользователе и карточек с сервера 

    const getProfileData = api.getProfileData();

    const getCardsData = api.getCards();

    Promise.all([getProfileData, getCardsData])
        .then(values => {
            const profileData = values[0];
            const cardsData = values[1];

            const {name, about, avatar, _id} = profileData;
            userInfo.setAvatar(avatar);
            userInfo.setUserInfo(name, about);
            userInfo.setUserId(_id);
            
            cardsData.reverse();
            cardsSection.renderItems(cardsData);

            console.log('Загрузка данных с сервера прошла успешно');
        })
        .catch(error => console.log(error));

    // Создание экземпляров классов попапа с формой

    // Редактирование и отправка данных профиля на сервер

    const popupWithEditForm = new PopupWithForm(popupWithEditProfileFormSelector, (inputValues) => {
        popupWithEditForm.setCustomButtonText(loadingMessages.save);

        const postBodyData = api.transformDataToJSON(inputValues);
        
        api.postProfileData(postBodyData)
        .then(data => {
            const {name, about} = data;
            userInfo.setUserInfo(name, about);
            popupWithEditForm.close();

            console.log('Загрузка данных на сервер прошла успешно');
        })
        .catch(error => console.log(error))
        .finally(() => {
            popupWithEditForm.setDefaultButtonText();
        });
    });
    popupWithEditForm.setClickCloseEventListeners();

    // Создание новой карточки и отправка данных на сервер

    const popupWithAddCardForm = new PopupWithForm(popupWithAddCardFormSelector, (inputValues) => {

        popupWithAddCardForm.setCustomButtonText(loadingMessages.save);

        const postBodyData = api.transformDataToJSON(inputValues);

        api.postNewCard(postBodyData)
            .then(data => {
                const {name, link, likes, _id} = data,
                      userId = userInfo.getUserId();

                const cardElement = generateMyCard(
                    {name, link, likes, _id},
                    userId,
                    cardTemplateSelector,
                    popupWithImage.handleCardClick,
                    handleLikeButton,
                    popupWithDeletionСonfirm.handleTrashBagClick
                    );

                cardsSection.addItem(cardElement);
                popupWithAddCardForm.close();

                console.log('Загрузка данных на сервер прошла успешно');
            })
            .catch(error => console.log(error))
            .finally(() => {
                popupWithAddCardForm.setDefaultButtonText();
            });
        });
    
    popupWithAddCardForm.setClickCloseEventListeners();

    // Создание класса обновления аватара

    const popupWithRefreshAvatorForm = new PopupWithForm(popupWithRefreshAvatarFormSelector, (inputValues) => {
        popupWithRefreshAvatorForm.setCustomButtonText(loadingMessages.refresh);

        const postBodyData = api.transformDataToJSON(inputValues);

        api.postAvatar(postBodyData)
            .then(data => {
                userInfo.setAvatar(data.avatar);
                popupWithRefreshAvatorForm.close();

                console.log('Загрузка данных на сервер прошла успешно');
            })
            .catch(error => console.log(error))
            .finally(() => {
                popupWithRefreshAvatorForm.setDefaultButtonText();
            });
    });

    popupWithRefreshAvatorForm.setClickCloseEventListeners();

    // Создание экземпляра класса подтверждения удаления

    const popupWithDeletionСonfirm = new PopupWithDeletionСonfirm(popupWithDeleteConfirmButtonSelector);
    
    popupWithDeletionСonfirm.setClickCloseEventListeners();

    popupWithDeletionСonfirm.setCallback(() => {
        const {card, cardId} = popupWithDeletionСonfirm.getCardData();

        api.deleteCard(cardId)
            .then(() => {
                card.deleteCard();
                popupWithDeletionСonfirm.close();
                
                console.log('Удаление карточки прошло успешно');
            })
            .catch(error => console.log(error))
            .finally(() => {
                popupWithDeletionСonfirm.setDefaultButtonText();
            });
    });
});