'use strict';

window.addEventListener('DOMContentLoaded',() => {

    const popup = document.querySelector('.popup'),
          inputName = popup.querySelector('.form__input_type_name'),
          inputJob = popup.querySelector('.form__input_type_job'),
          profileName = document.querySelector('.profile__name'),
          profileJob = document.querySelector('.profile__job'),
          editForm = popup.querySelector('#edit-profile-form'),
          addCardForm = popup.querySelector('#add-card-form'),
          editProfileOpenPopupBtn = document.querySelector('.profile__edit-btn'),
          addCardOpenPopupBtn = document.querySelector('.profile__add-button'),
          inputCardName = popup.querySelector('.form__input_type_place-name'),
          inputCardUrl = popup.querySelector('.form__input_type_url'),
          cardTemplate = document.querySelector('#place-card-template').content,
          placeCardContainer = document.querySelector('.places__list'),
          imagePopupWindow = popup.querySelector('.popup__window_type_fullscreen-img'),
          imagePopup = imagePopupWindow.querySelector('.popup__fullscreen-image'),
          imageDescr = imagePopupWindow.querySelector('.popup__descr');

    // open and close popup functions

    function openFullscrenImgPopup (popup) {
        openPopup(popup);
        popup.classList.add('popup_fullscreen-img');
    }

    function openPopup (popup) {
        popup.classList.add('popup_active');
    }

    function closePopup (popup) {
        popup.classList.remove('popup__window_active');
        popup.parentElement.className = 'popup';
    }

    function closePopupOnClickIcon(targetPopup) {
        const buttonPopupClose = targetPopup.querySelector('.popup__close');

        buttonPopupClose.addEventListener('click', () => closePopup(targetPopup));
    }

    function submitAddCardForm (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            createUserCard(); 
            form.reset();
            closePopup(form.closest('.popup__window'));
        });
    }

    function submitEditProfileForm (form) {
        pasteValueToEditFormInputs (form);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            editProfileData();
            closePopup(form.closest('.popup__window'));
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

    function openCurrentPopup (event) {
        event.preventDefault();
    
        const currentPopupId = event.target.getAttribute('data-popup'),
              currentPopup = popup.querySelector(`#${currentPopupId}`),
              popupOverlay = currentPopup.parentElement;

        closePopupOnClickIcon(currentPopup);
        currentPopup.classList.add('popup__window_active');
        if (!popup.classList.contains('popup_active')) {
            openPopup(popupOverlay);
        }
    }

    editProfileOpenPopupBtn.addEventListener('click', (e) => {
        openCurrentPopup(e);
    });

    addCardOpenPopupBtn.addEventListener('click', (e) => {
        openCurrentPopup(e);
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
                openCurrentPopup(event);
            }
        });
    }

    function openFullscreenImg (cardName, cardLink) {
        imagePopup.src = cardLink;
        imagePopup.alt = cardName;
        imageDescr.textContent = cardName;
        openFullscrenImgPopup(popup);
        
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

    submitAddCardForm(addCardForm);
    submitEditProfileForm(editForm);

});
