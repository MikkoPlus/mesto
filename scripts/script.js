'use strict';

window.addEventListener('DOMContentLoaded',() => {

    const page = document.querySelector('.page'),
          popup = document.querySelector('.popup'),
          forms = popup.querySelectorAll('form');

    // body functions

    function bodyLock () {
        page.classList.add('page_lock');
    }

    function bodyUnlock () {
        page.classList.remove('page_lock');
    }

    // open and close popup functions

    function openPopup (popupOverlay) {
        popupOverlay.classList.add('popup_active');
        bodyLock();
    }

    function closePopup (targetPopup) {
        if (targetPopup.id === 'add-card') {
            targetPopup.querySelectorAll('input').forEach(item => {
                item.value = '';
            });
        }
        targetPopup.classList.remove('popup__window_active');
        targetPopup.parentElement.className = 'popup';
        setTimeout(() => bodyUnlock(), 300);
    }

    function closePopupOnClickIcon(targetPopup) {
        const popupClose = targetPopup.querySelector('.popup__close');

            popupClose.addEventListener('click', () => closePopup(targetPopup));
    }

    function submitForm (form) {
        const formId = form.id;

        if (formId === 'edit-profile-form') {
            pasteValueToEditFormInputs (form);
        }
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formId === 'edit-profile-form') {
                editProfileData (form);
            } else if (formId === 'add-card-form') {
                createUserCard(form); 
            }
        });
    }

    function pasteValueToEditFormInputs (form) {

        const inputName = form.querySelector('.form__input_type_name'),
              inputJob = form.querySelector('.form__input_type_job'),
              profileName = document.querySelector('.profile__name'),
              profileJob = document.querySelector('.profile__job');

        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;
    }
        
    function editProfileData (form) {

        const inputName = form.querySelector('.form__input_type_name'),
              inputJob = form.querySelector('.form__input_type_job'),
              profileName = document.querySelector('.profile__name'),
              profileJob = document.querySelector('.profile__job'),
              currentPopup = form.closest('.popup__window');

        if (inputName.value !== '' && inputJob.value !== '') {
            profileJob.textContent = inputJob.value;
            profileName.textContent = inputName.value;
            closePopup(currentPopup);
        }
    }

    function popupHandler () {
        const eventBtns = document.querySelectorAll('.event-btn');

        eventBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
    
                const currentPopupId = e.target.getAttribute('data-popup'),
                      currentPopup = popup.querySelector(`#${currentPopupId}`),
                      popupOverlay = currentPopup.parentElement;
    
                currentPopup.classList.add('popup__window_active');
                if (!popup.classList.contains('popup_active')) {
                    openPopup(popupOverlay);
                    closePopupOnClickIcon(currentPopup);
                }
                
            });
        });
    }

    // add user cards functions
    function createUserCard(form) {

        const inputCardName = form.querySelector('.form__input_type_place-name'),
                inputCardUrl = form.querySelector('.form__input_type_url'),
                newCard = createNewCard(inputCardUrl.value, inputCardName.value),
                currentPopup = form.closest('.popup__window');

        renderCard(newCard);
        closePopup(currentPopup);
    }

    function createNewCard(url, descr) {
        const cardTemplate = document.querySelector('#place-card-template').content,
                placeCardElement= cardTemplate.querySelector('.place-card').cloneNode(true),
                placeCardImage = placeCardElement.querySelector('.place-card__image'),
                placeCardDescr = placeCardElement.querySelector('.place-card__descr');

        placeCardImage.src = url;
        placeCardImage.setAttribute('alt', descr);
        placeCardDescr.textContent = descr;
        return placeCardElement;
    }

    function renderCard(card) {
        const placeCardContainer = document.querySelector('.places__list');
        addEventListenerToCard(card);
        placeCardContainer.prepend(card);
    }

    function addEventListenerToCard (card) {
        card.addEventListener('click', (event) => {
            event.preventDefault();

            const targetClickEl = event.target,
                    cardParent = card.parentElement;
                    

            if(targetClickEl.tagName === 'IMG') {
                if (targetClickEl.classList.contains('place-card__trash-bag')) {
                    cardParent.removeChild(targetClickEl.closest('.place-card')); 

                } else if (targetClickEl.classList.contains('place-card__heart')) {
                    changeHeartColor(targetClickEl);

                } else if (targetClickEl.classList.contains('place-card__image')) {
                    openPopup(popup);
                    openFullscreenImg(targetClickEl);
                }
            }
        });
    }

    function openFullscreenImg (targetImg) {
        const imageSrc = targetImg.getAttribute('src'),
                imageAlt = targetImg.getAttribute('alt'),
                imageDescr = targetImg.parentElement.querySelector('.place-card__descr').textContent,
                targetPopupId = targetImg.getAttribute('data-popup'),
                targetPopup = popup.querySelector(`#${targetPopupId}`);

        setDataToFullscreenImgPopup(targetPopup, imageDescr, imageSrc, imageAlt);
        openPopup(targetPopup.parentElement);
        targetPopup.classList.add('popup__window_active');
        targetPopup.parentElement.classList.add('popup_fullscreen-img');
        closePopupOnClickIcon(targetPopup);
    }

    function setDataToFullscreenImgPopup(currentPopup, descr, src, alt) {
        currentPopup.querySelector('.popup__descr').textContent = descr;
        currentPopup.querySelector('.popup__fullscreen-image').setAttribute('src', src);
        currentPopup.querySelector('.popup__fullscreen-image').setAttribute('alt', alt);
    }

    function changeHeartColor(heart) {
        if (heart.getAttribute('src') == './images/icons/heart.svg') {
            heart.setAttribute('src', './images/icons/heart_black.svg');
        } else {
            heart.setAttribute('src', './images/icons/heart.svg');
        }
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


    forms.forEach(form => submitForm(form));

    popupHandler();
});
