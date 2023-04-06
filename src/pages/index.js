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

    function handleLikeButton(cardId, isLiked, updateLikes) {

        if (!isLiked()) {
            api.postLike(cardId())
            .then(data => {
                const {likes} = data;
                updateLikes(likes);
             })
            .catch(error => console.log(error))
            .finally(() => console.log('Лайк поставлен'));
        } else {
            api.deleteLike(cardId())
            .then(data => {
                const {likes} = data;
                updateLikes(likes);
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Лайк убран'));
        }
    }

    // Создание класса UserInfo

    const userInfo = new UserInfo(profileDataSelectors);

    //Создание класса Api 

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
        editPopup.setInputValues(userInfo.getUserInfo());
        formValidators['edit-profile'].resetValidation();
        editPopup.open();
    });

    buttonAddCardOpenPopup.addEventListener('click', () =>  {
        addCardPopup.open();
        formValidators['add-card'].resetValidation();
    });

    avatarElement.addEventListener('click', () => {
        refreshAvatarPopup.open();
        formValidators['refresh-avatar'].resetValidation();
    });


    // Создание карточек классом Section

    const cardsSection = new Section({renderer: (item) => {
        const {name, link, likes, _id} = item;
        const userId = userInfo.getUserId();

        let isLiked = false;

        if(likes.length > 0) {
            likes.forEach(like => {
                if(like._id === userId) {
                    isLiked = true;
                    return isLiked;
                }
            });
        }

        
        if (userId === item.owner._id) {
            const cardElement = generateMyCard(
                {name, link, likes, _id},
                isLiked,
                cardTemplateSelector,
                popupWithImage.handleCardClick,
                handleLikeButton,
                popupWithDeletionСonfirm.handleTrashBagClick
            );

            cardsSection.addItem(cardElement);
        } else {
            const cardElement = generateCard(
                {name, link, likes, _id},
                isLiked,
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

    //Загрузка информации о пользователе и карточек с сервера 

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
        // Не представляю что можно в блоке finally сделать при получении данных с сервера
        // .finally(() => console.log());


    // Создание экземпляров классов попапа с формой

    // Редактирование и отправка данных профиля на сервер
    const editPopup = new PopupWithForm(popupWithEditProfileFormSelector, (postBodyData) => {
        editPopup.setCustomButtonText(loadingMessages.save);
        
        api.postProfileData(postBodyData)
        .then(data => {
            const {name, about} = data;
            userInfo.setUserInfo(name, about);

            console.log('Загрузка данных на сервер прошла успешно');
        })
        .catch(error => console.log(error))
        .finally(() => {
            editPopup.setDefaultButtonText();
            editPopup.close();
        });
    });
    editPopup.setClickCloseEventListeners();

    // Создание новой карточки и отправка данных на сервер
    const addCardPopup = new PopupWithForm(popupWithAddCardFormSelector, (postBodyData) => {

        addCardPopup.setCustomButtonText(loadingMessages.save);
        api.postNewCard(postBodyData)
            .then(data => {
                const {name, link, likes, _id} = data;
                const isLiked = false;
                const cardElement = generateMyCard(
                    {name, link, likes, _id},
                    isLiked,
                    cardTemplateSelector,
                    popupWithImage.handleCardClick,
                    handleLikeButton,
                    popupWithDeletionСonfirm.handleTrashBagClick);

                cardsSection.addItem(cardElement);

                console.log('Загрузка данных на сервер прошла успешно');
            })
            .catch(error => console.log(error))
            .finally(() => {
                addCardPopup.setDefaultButtonText();
                addCardPopup.close();
            });
        });
    
    addCardPopup.setClickCloseEventListeners();

    // Создание класса обновления аватара
    const refreshAvatarPopup = new PopupWithForm(popupWithRefreshAvatarFormSelector, (postBodyData) => {
        refreshAvatarPopup.setCustomButtonText(loadingMessages.refresh);

        api.postAvatar(postBodyData)
            .then(data => {
                userInfo.setAvatar(data.avatar);
                console.log('Загрузка данных на сервер прошла успешно');
            })
            .catch(error => console.log(error))
            .finally(() => {
                refreshAvatarPopup.setDefaultButtonText();
                refreshAvatarPopup.close();
            });
    });

    refreshAvatarPopup.setClickCloseEventListeners();

    // Создание экземпляра класса подтверждения удаления
    const popupWithDeletionСonfirm = new PopupWithDeletionСonfirm(popupWithDeleteConfirmButtonSelector);

    const handleDeleteCard = () => {
        const {card, cardId} = popupWithDeletionСonfirm.getCardData();

        api.deleteCard(cardId)
            .then(data => {
                console.log(data);
                card.deleteCard();
                console.log('Удаление карточки прошло успешно');
            })
            .catch(error => console.log(error))
            .finally(() => {
                popupWithDeletionСonfirm.setDefaultButtonText();
                popupWithDeletionСonfirm.close();
            });
    };
    popupWithDeletionСonfirm.setClickCloseEventListeners();

    popupWithDeletionСonfirm.setCallback(handleDeleteCard);
});