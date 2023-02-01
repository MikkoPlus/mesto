'use strict';

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
          formEditProfile = editProfilePopup.querySelector('#edit-profile-form'),
          formAddCard = popupSection.querySelector('#add-card-form'),
          editProfileOpenPopupBtn = document.querySelector('.profile__edit-btn'),
          addCardOpenPopupBtn = document.querySelector('.profile__add-button'),
          inputCardName = addCardPopup.querySelector('.form__input_type_place-name'),
          inputCardUrl = addCardPopup.querySelector('.form__input_type_url'),
          cardTemplate = document.querySelector('#place-card-template').content,
          placeCardContainer = document.querySelector('.places__list');

    // open and close popup functions

    function openPopup (popup) {
        popup.classList.add('popup_active');
    }

    function closePopup (popup) {
        popup.classList.remove('popup_active');
    }

    // form submit functions

    function submitAddCardForm (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            createUserCard(); 
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

    function createUserCard() {
        const newCard = createNewCard(inputCardUrl.value, inputCardName.value);

        renderCard(newCard);
    }

    function createNewCard(url, descr) {
        const placeCardElement= cardTemplate.querySelector('.place-card').cloneNode(true),
              placeCardImage = placeCardElement.querySelector('.place-card__image'),
              placeCardDescr = placeCardElement.querySelector('.place-card__descr');

        placeCardImage.src = url;
        placeCardImage.setAttribute('alt', descr);
        placeCardDescr.textContent = descr;
        addEventListenerToCard(placeCardElement);
        return placeCardElement;
    }

    function renderCard(card) {
        placeCardContainer.prepend(card);
    }

    function addEventListenerToCard (card) {
        card.addEventListener('click', (event) => {
            event.preventDefault();

            const targetClickEl = event.target,
                    cardParent = card.parentElement;
                    

            if (targetClickEl.classList.contains('place-card__trash-bag')) {
                cardParent.removeChild(targetClickEl.closest('.place-card')); 

            } else if (targetClickEl.classList.contains('place-card__heart')) {
                changeHeartColor(targetClickEl);

            } else if (targetClickEl.classList.contains('place-card__image')) {
                const cardName = card.querySelector('.place-card__descr').textContent,
                      cardLink = targetClickEl.getAttribute('src');
                openFullscreenImg(cardName, cardLink);
            }
        });
    }

    function openFullscreenImg (cardName, cardLink) {
        fullscreenImage.src = cardLink;
        fullscreenImage.alt = cardName;
        fullscreenDescr.textContent = cardName;
        openPopup(fullscreenImagePopup);
    }

    function changeHeartColor(heart) {
        heart.classList.toggle('place-card__heart_like');
    }

    // render initial cards

    const initialCards = [
        {
            name: 'Atuh Beach',
            link: './images/places/Atuh-beach.webp'
        },
        {
            name: 'Rice fields',
            link: './images/places/Rice-fields.webp'
        },
        {
            name: 'Kuta beach',
            link: './images/places/Kuta-beach.webp'
        },
        {
            name: 'Nusa-Penida island',
            link: './images/places/Nusa-Penida.webp'
        },
        {
            name: 'Mount Batur',
            link: './images/places/Mount-Batur.webp'
        },
        {
            name: 'Ubud',
            link: './images/places/Ubud.webp'
        }
        ]; 

    initialCards.forEach(card => {
        const {name, link} = card;
        renderCard(createNewCard(link, name));
    });

    submitAddCardForm(formAddCard);
    submitEditProfileForm(formEditProfile);

    popupCloseIcons.forEach(popupCloseButton => {
        popupCloseButton.addEventListener('click', (e) => {
            const currentPopup = e.target.closest('.popup');
            closePopup(currentPopup);
        });
    });

});
