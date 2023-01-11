'use strict';

window.addEventListener('DOMContentLoaded',() => {

    const page = document.querySelector('.page'),
          popup = document.querySelector('.popup');

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
        if (targetPopup.classList.contains('popup__window_type_form')) {
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

    function popupHandler () {
        const eventBtns = document.querySelectorAll('.event-btn');

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
        
        eventBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
    
                const currentPopupId = e.target.getAttribute('data-popup'),
                      currentPopup = popup.querySelector(`#${currentPopupId}`),
                      popupOverlay = currentPopup.parentElement,
                      currentForm = currentPopup.querySelector('form');
    
                currentPopup.classList.add('popup__window_active');

                if (!popup.classList.contains('popup_active')) {
                    openPopup(popupOverlay);
                    submitForm(currentForm);

                    closePopupOnClickIcon(currentPopup);
                }
            });
        });
    }

            // add card to places section 
        function createUserCard(form) {

            const inputCardName = form.querySelector('.form__input_type_place-name'),
                  inputCardUrl = form.querySelector('.form__input_type_url'),
                  newCard = createNewCard(inputCardUrl, inputCardName),
                  currentPopup = form.closest('.popup__window');

            renderCard(newCard);
            closePopup(currentPopup);
        }

        function createNewCard(url, descr) {
            const cardTemplate = document.querySelector('#place-card-template').content,
                  placeCardElement= cardTemplate.querySelector('.place-card').cloneNode(true),
                  placeCardImage = placeCardElement.querySelector('.place-card__image'),
                  placeCardDescr = placeCardElement.querySelector('.place-card__descr');

            placeCardImage.src = url.value;
            placeCardImage.setAttribute('alt', descr.value);
            placeCardDescr.textContent = descr.value;
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
                        cardParent.remove(targetClickEl.closest('.place-card')); 

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




    popupHandler();
});
