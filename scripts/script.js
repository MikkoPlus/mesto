'use strict';

window.addEventListener('DOMContentLoaded',() => {
    function changeHeartColor () {
        const hearts = document.querySelectorAll('.place-card__heart');
    
        hearts.forEach((heart) =>{
            heart.addEventListener('click', () => {
                if (heart.getAttribute('src') == './images/icons/heart.svg') {
                    heart.setAttribute('src', './images/icons/heart_black.svg');
                } else {
                    heart.setAttribute('src', './images/icons/heart.svg');
                }
            });
        });
    }

    function popupHandler () {
        const editBtn = document.querySelector('.profile__edit-btn'),
              popup = document.querySelector('.popup'),
              page = document.querySelector('.page'),
              form = popup.querySelector('.form'),
              inputName = form.querySelector('.form__input_type_name'),
              inputJob = form.querySelector('.form__input_type_job'),
              profileName = document.querySelector('.profile__name'),
              profileJob = document.querySelector('.profile__job');
    
        // open popup + add padding right to body

        function bodyLock () {
            let bodyWidth = document.documentElement.clientWidth;
            page.classList.add('page_lock');
            let openPopupBodyWidth = document.documentElement.clientWidth;
            let paddingRight = openPopupBodyWidth - bodyWidth + 'px';
            page.style.paddingRight = `${paddingRight}`;
        }

        //functions

        function openPopup () {
            popup.classList.add('popup_active');
            bodyLock();
            pasteValueToInput();
        }

        function pasteValueToInput() {
            inputName.value = profileName.textContent;
            inputJob.value = profileJob.textContent;
        }

        function closePopup () {
            popup.classList.remove('popup_active');
            page.classList.remove('page_lock');
            page.style.paddingRight = '0';
        }

        function editProfileData () {
            form.addEventListener('submit', (event) =>{
                event.preventDefault();
                if (inputName.value !== '' && inputJob.value !== '') {
                    profileJob.textContent = inputJob.value;

                    profileName.textContent = inputName.value;
                    closePopup();
                }
            });
        }

        // open popup

        editBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (!popup.classList.contains('popup_active')) {
                const popupClose = popup.querySelector('.popup__close');

                openPopup();
                editProfileData ();
                popupClose.addEventListener('click', closePopup);
            }
        });
    }
    changeHeartColor();
    popupHandler();
});
