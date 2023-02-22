'use strict';

import Card from './Card.js';

window.addEventListener('DOMContentLoaded',() => {

    const popupSection = document.querySelector('.popups'),
          editProfilePopup = popupSection.querySelector('#edit-profile-popup'),
          addCardPopup = popupSection.querySelector('#add-card-popup'),
          fullscreenImagePopup = popupSection.querySelector('#open-image-popup'),
          fullscreenImage = fullscreenImagePopup.querySelector('.popup__fullscreen-image'),
          fullscreenDescr = fullscreenImagePopup.querySelector('.popup__descr'),
          popupCloseIcons = popupSection.querySelectorAll('.popup__close'),
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
          placeCardContainer = document.querySelector('.places__list');

    // open and close popup functions

    const closeByEscape = (evt) => {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_active');
            closePopup(openedPopup);
        }
    };

    function openPopup (popup) {
        popup.classList.add('popup_active');
        document.addEventListener('keydown', closeByEscape);
    }

    function closePopup (popup) {
        popup.classList.remove('popup_active');
        document.removeEventListener('keydown', closeByEscape);
    }

    // Функция проверяет была ли нажата и отжата лкм на темном фоне попапа, и если одно из условий не срабатывает, попап не закрывется

    function wasClickOnOverlay (eventElement) {
        return eventElement.classList.contains('popup');
    }

    function closePopupOnOverlayClick () {
        let clickOnOverlay = false;

        popupSection.addEventListener('mousedown', (evt) => {
            clickOnOverlay = wasClickOnOverlay(evt.target);
        });
        popupSection.addEventListener('mouseup', (evt) => {
            if (wasClickOnOverlay(evt.target) && clickOnOverlay) {
                closePopup(evt.target);
            }
        });
    }
    
    // form submit functions

    function submitAddCardForm (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            createUserCard(inputCardUrl.value, inputCardName.value); 
            form.reset();
            closePopup(addCardPopup);
        });
    }

    function submitEditProfileForm (form) {
        pasteValueToEditFormInputs (form);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            editProfileData();
            closePopup(editProfilePopup);
        });
    }

    function pasteValueToEditFormInputs () {
        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;
    }
        
    function editProfileData () {
        if (inputName.value !== '' && inputJob.value !== '') {
            profileJob.textContent = inputJob.value;
            profileName.textContent = inputName.value;
        }
    }

    editProfileOpenPopupBtn.addEventListener('click', (e) => {
        openPopup(editProfilePopup);
    });

    addCardOpenPopupBtn.addEventListener('click', (e) => {
        openPopup(addCardPopup);
    });

    // add user cards functions

    function createUserDataObject (url, descr) {
        return {
            imageDescription: `${descr}`,
            imagePath: `${url}`,
        };
    }

    function createUserCard(url, descr) {
        const userData = createUserDataObject(url, descr),
              card = new Card(userData, cardTemplateSelector),
              cardElement = card.generateCard();

        renderCard(cardElement, placeCardContainer);
    }

    function openFullScreenImg (imagePath, imageDescription) {
        fullscreenImage.src = imagePath;
        fullscreenImage.alt = imageDescription;
        fullscreenDescr.textContent = imageDescription;
        openPopup(fullscreenImagePopup);
    }

    // render initial cards

    function renderCard(cardElement, parentElement) {
        parentElement.prepend(cardElement);
    }

    const initialCards = [
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

    initialCards.forEach((item) => {
        const card = new Card(item, cardTemplateSelector);
        const cardElement = card.generateCard();

        renderCard(cardElement, placeCardContainer);
    });

    submitAddCardForm(formAddCard);
    submitEditProfileForm(formEditProfile);

    popupCloseIcons.forEach(popupCloseButton => {
        popupCloseButton.addEventListener('click', (e) => {
            const currentPopup = e.target.closest('.popup');
            closePopup(currentPopup);
        });
    });

    closePopupOnOverlayClick ();
});