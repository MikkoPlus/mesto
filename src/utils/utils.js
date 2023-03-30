import atuhBeachImageLink from '../images/places/Atuh-beach.webp';
import riceFieldsImageLink from '../images/places/Rice-fields.webp';
import kutaBeachImageLink from '../images/places/Kuta-beach.webp';
import nusaPenidaImageLink from '../images/places/Nusa-Penida.webp';
import mountBaturImageLink from '../images/places/Mount-Batur.webp';
import ubudImageLink from '../images/places/Ubud.webp';

export const editProfilePopupSelector = '#edit-profile-popup',
             addCardPopupSelector = '#add-card-popup',
             fullscreenImagePopupSelector = '#open-image-popup',
             editProfileOpenPopupBtn = document.querySelector('.profile__edit-btn'),
             addCardOpenPopupBtn = document.querySelector('.profile__add-button'),
             cardTemplateSelector = '#place-card-template',
             placeCardSelector = '.places__list',
             formValidators = {},
             profileDataSelectors = {
                 profileNameSelector: '.profile__name',
                 profileJobSelector: '.profile__job',
                 profileAvatarSelector: '.profile__avatar'
             },
             validateConfig = {
                 formSelector: '.form',
                 inputSelector: '.form__input',
                 submitButtonSelector: '.form__btn',
                 inactiveButtonClass: 'form__btn_disabled',
                 inputErrorClass: 'form__input_type_error'
             },
             initialCards = [
             {
                 imageDescription: 'Atuh Beach',
                 imagePath: atuhBeachImageLink
             },
             {
                 imageDescription: 'Rice fields',
                 imagePath: riceFieldsImageLink
             },
             {
                 imageDescription: 'Kuta beach',
                 imagePath: kutaBeachImageLink
             },
             {
                 imageDescription: 'Nusa-Penida island',
                 imagePath: nusaPenidaImageLink
             },
             {
                 imageDescription: 'Mount Batur',
                 imagePath: mountBaturImageLink
             },
             {
                 imageDescription: 'Ubud',
                 imagePath: ubudImageLink
             }
             ];
