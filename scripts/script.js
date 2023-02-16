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
          formEditProfile = document.forms['edit-profile'],
          formAddCard = document.forms['add-card'],
          editProfileOpenPopupBtn = document.querySelector('.profile__edit-btn'),
          addCardOpenPopupBtn = document.querySelector('.profile__add-button'),
          inputCardName = addCardPopup.querySelector('.form__input_type_place-name'),
          inputCardUrl = addCardPopup.querySelector('.form__input_type_url'),
          cardTemplate = document.querySelector('#place-card-template').content,
          placeCardContainer = document.querySelector('.places__list'),
          popupList = Array.from(popupSection.querySelectorAll('.popup'));

    // open and close popup functions

    const closeByEscape = (evt) => {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_active');
            closePopup(openedPopup);
            console.log(1);
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

    function isSomePopupVisible (popupList) {
        return popupList.some(popup => {
            return popup.classList.contains('popup_active');
        });
    }

    function closeEveryPopup (popupList) {
        popupList.forEach(popup => {
            closePopup(popup);
        });
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
                closeEveryPopup(popupList);
            }
        });
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
        const cardElement= cardTemplate.querySelector('.place-card').cloneNode(true),
              cardImage = cardElement.querySelector('.place-card__image'),
              cardDescr = cardElement.querySelector('.place-card__descr'),
              cardTrashBagIcon = cardElement.querySelector('.place-card__trash-bag'),
              cardHeartIcon = cardElement.querySelector('.place-card__heart');

        cardImage.src = url;
        cardImage.setAttribute('alt', descr);
        cardDescr.textContent = descr;
        addEventListenerToCardElement(cardTrashBagIcon, deleteCard);
        addEventListenerToCardElement(cardHeartIcon, changeHeartColor);
        addEventListenerToCardElement(cardImage, openFullScreenImg);
        return cardElement;
    }

    function renderCard(card) {
        placeCardContainer.prepend(card);
    }

    // Functions of card events

    function addEventListenerToCardElement (cardElement, elementFunction) {
        cardElement.addEventListener('click', elementFunction);
    }

    const deleteCard = (event) => {
        const currentCard = event.target.closest('.place-card'),
              cardList = currentCard.parentElement;
        
        cardList.removeChild(currentCard);
    };

    const changeHeartColor = (event) => {
        const heart = event.target;
        heart.classList.toggle('place-card__heart_like');
    };

    const openFullScreenImg = (event) => {
        const image = event.target,
              imagePath = image.getAttribute('src'),
              imageDescription = image.getAttribute('alt');
        
        fullscreenImage.src = imagePath;
        fullscreenImage.alt = imageDescription;
        fullscreenDescr.textContent = imageDescription;
        openPopup(fullscreenImagePopup);
    };

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

    initialCards.forEach(({name, link}) => {
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
    // Можно получить фидбек по поводу функции закрытия попапа по оверлею? Подскажите как можно улучшить код, пожалуйста :)
    closePopupOnOverlayClick ();
});
