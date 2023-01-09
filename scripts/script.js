'use strict';

window.addEventListener('DOMContentLoaded',() => {
    function popupHandler () {
        const eventBtns = document.querySelectorAll('.event-btn'),
              page = document.querySelector('.page'),
              popup = document.querySelector('.popup'),
              popupWindow = popup.querySelectorAll('.popup__window'),
              profileName = document.querySelector('.profile__name'),
              profileJob = document.querySelector('.profile__job'),
              placesList = document.querySelector('.places__list');

        // change color of heart, remove el from cards list and open fullscreen image

        function placeCardsEvents () {
            placesList.addEventListener('click', (event) => {
                if (event.target.tagName === 'IMG' && event.target.classList.contains('place-card__trash-bag')) {
                    const currentCard = event.target.parentElement;
                    placesList.removeChild(currentCard);
                } else if (event.target.tagName === 'IMG' && event.target.classList.contains('place-card__heart')) {
                    if (event.target.getAttribute('src') == './images/icons/heart.svg') {
                        event.target.setAttribute('src', './images/icons/heart_black.svg');
                    } else {
                        event.target.setAttribute('src', './images/icons/heart.svg');
                    }
                } else if (event.target.tagName === 'IMG' && event.target.classList.contains('place-card__image')) {
                    openPopup();
                    popup.classList.add('popup_fullscreen-img');
                    openFullscreenImg(event.target);
                }
            });
        }
        function openFullscreenImg (targetImg) {
            const targetImage = targetImg,
            imageSrc = targetImage.getAttribute('src'),
            imageAlt = targetImage.getAttribute('alt'),
            imageDescr = targetImage.parentElement.querySelector('.place-card__descr').textContent,
            targetPopupId = targetImage.getAttribute('data-popup'),
            targetPopup = popup.querySelector(`#${targetPopupId}`);

            targetPopup.querySelector('.popup__descr').textContent = imageDescr;
            targetPopup.querySelector('.popup__fullscreen-image').setAttribute('src', imageSrc);
            targetPopup.querySelector('.popup__fullscreen-image').setAttribute('alt', imageAlt);
            targetPopup.classList.add('popup__window_active');

            closePopupOnClickIcon(targetPopup);
          }
        // open popup + add padding right to body

        function bodyLock () {
            let bodyWidth = document.documentElement.clientWidth;
            page.classList.add('page_lock');
            let openPopupBodyWidth = document.documentElement.clientWidth;
            let paddingRight = openPopupBodyWidth - bodyWidth + 'px';
            page.style.paddingRight = `${paddingRight}`;
        }

        function bodyUnlock () {
            page.classList.remove('page_lock');
            page.style.paddingRight = 0;
        }


        //functions

        function openPopup () {
            popup.classList.add('popup_active');
            bodyLock();
        }

        function closePopup () {
            popupWindow.forEach(item => {
                item.classList.remove('popup__window_active');
                if (item.classList.contains('popup__window_type_fullscreen-img')) {
                    popup.classList.remove('popup_fullscreen-img');
                }
            });
            popup.classList.remove('popup_active');
            setTimeout(() => bodyUnlock(), 300);
        }

        function editProfileData () {

            const form = popup.querySelector('#edit-profile'),
                  inputName = form.querySelector('.form__input_type_name'),
                  inputJob = form.querySelector('.form__input_type_job');

                  inputName.value = profileName.textContent;
                  inputJob.value = profileJob.textContent;

            form.addEventListener('submit', (event) =>{
                event.preventDefault();
                if (inputName.value !== '' && inputJob.value !== '') {
                    profileJob.textContent = inputJob.value;

                    profileName.textContent = inputName.value;
                    closePopup();
                }
            });
        }

        function closePopupOnClickIcon(targetPopup) {
            const popupCloses = targetPopup.querySelector('.popup__close');

                popupCloses.addEventListener('click', closePopup);
        }

        // open popup
        
        eventBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
    
                const currentPopupId = e.target.getAttribute('data-popup'),
                      currentPopup = popup.querySelector(`#${currentPopupId}`);
    
                currentPopup.classList.add('popup__window_active');

    
                if (!popup.classList.contains('popup_active')) {
                    openPopup();
                    if (currentPopupId === 'edit-profile') {
                        editProfileData ();
                    } else if (currentPopupId === 'add-card') {
                        addCard();
                    }

                    closePopupOnClickIcon(currentPopup);
                }
            });
        });

            // add card to places section 
        function addCard() {
            const cardTemplate = document.querySelector('#place-card-template').content,
                placeCardElement= cardTemplate.querySelector('.place-card').cloneNode(true),
                placeCardImage = placeCardElement.querySelector('.place-card__image'),
                placeCardDescr = placeCardElement.querySelector('.place-card__descr'),
                placeCardContainer = document.querySelector('.places__list'),
                form = document.querySelector('#add-card'),
                inputCardName = form.querySelector('.form__input_type_place-name'),
                inputCardUrl = form.querySelector('.form__input_type_url');

                form.addEventListener('submit', (event) =>{
                    event.preventDefault();

                    placeCardImage.src = inputCardUrl.value;
                    placeCardImage.setAttribute('alt', inputCardName.value);

                    placeCardDescr.textContent = inputCardName.value;

                    placeCardContainer.prepend(placeCardElement);


                    closePopup();
                });
            }
            placeCardsEvents();
        }
    popupHandler();
});
