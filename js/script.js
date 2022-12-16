'use strict';

window.addEventListener('DOMContentLoaded',() => {
    const profileName = document.querySelector('.profile__name'),
          profileJob = document.querySelector('.profile__job');

    function sliceString (titles, maxLength) {
    if (titles.length > 1) {
        titles.forEach((title) => {
            if (title.textContent.length > maxLength) {
                title.textContent = title.textContent.slice(0, maxLength) + '...';
            }
        });
    } else {
        if (titles.textContent.length > maxLength) {
            titles.textContent = titles.textContent.slice(0, maxLength) + '...';
        }}
    }

    function sliceStringHandler () {
        const cardTitles = document.querySelectorAll('.place-card__descr');

        if (document.documentElement.offsetWidth > 581 && document.documentElement.offsetWidth < 660 || 
            document.documentElement.offsetWidth > 300 && document.documentElement.offsetWidth < 378) {
            sliceString(profileName, 16);
        } else {
            sliceString(profileName, 21);
        }
        if (document.documentElement.offsetWidth > 300 && document.documentElement.offsetWidth < 420) {
            sliceString(cardTitles, 20);
        } else {
            sliceString(cardTitles, 12);
        }
    }

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
              inputJob = form.querySelector('.form__input_type_job');
    
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
            inputName.value = localStorage.getItem('name');
            inputJob.value = localStorage.getItem('job');
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
                    localStorage.setItem('job', profileJob.textContent);

                    profileName.textContent = inputName.value;
                    localStorage.setItem('name', profileName.textContent);
                    closePopup();
                }
            });
        }

        // Set profile values from local storage

        if (localStorage.getItem('name')) {
            profileName.textContent = localStorage.getItem('name');
        } else {
            localStorage.setItem('name', profileName.textContent);
            profileName.textContent = localStorage.getItem('name');
        }

        if (localStorage.getItem('job')) {
            profileJob.textContent = localStorage.getItem('job');
        } else {
            localStorage.setItem('job', profileJob.textContent);
            profileJob.textContent = localStorage.getItem('job');
        }

        // open popup

        editBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (!popup.classList.contains('popup_active')) {
                const popupClose = popup.querySelector('.popup__close');

                openPopup();
                editProfileData ();
                popupClose.addEventListener('click', closePopup);
                popup.addEventListener('click', (e) => {
                    if (e.target.classList.contains('popup_active')) {
                        closePopup();
                    }
                });
            }
        });
    }
    changeHeartColor();
    popupHandler();
    sliceStringHandler();
});
