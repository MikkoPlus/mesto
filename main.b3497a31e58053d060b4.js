(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._submitButton=this._formElement.querySelector(this._submitButtonSelector)}var n,r;return n=t,(r=[{key:"enableValidation",value:function(){var t=this;this._formElement.addEventListener("submit",(function(e){e.preventDefault(),t._disableSubmitButton()})),this._toggleButtonState(),this._setEventListenersToFormInputs()}},{key:"resetValidation",value:function(){var t=this;this._disableSubmitButton(),this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_disableSubmitButton",value:function(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}},{key:"_enableSubmitButton",value:function(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1}},{key:"_toggleButtonState",value:function(){this._isFormInputsValid(this._inputList)?this._enableSubmitButton():this._disableSubmitButton()}},{key:"_isFormInputsValid",value:function(){return this._inputList.every((function(t){return t.validity.valid}))}},{key:"_showInputError",value:function(t){var e=this._formElement.querySelector("#".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),e.textContent=t.validationMessage}},{key:"_hideInputError",value:function(t){var e=this._formElement.querySelector("#".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),e.textContent=""}},{key:"_setEventListenersToFormInputs",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"_clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(t){var e=this;this._clear(),t.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(t){this._container.prepend(t)}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}var c=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popupElement=document.querySelector(e),this._closeByEsc=this._handleEscClose.bind(this),this._closeByOverlayClick=this._handleOverlayClose.bind(this),this._closeByCloseIconClick=this._handleCloseIcon.bind(this)}var e,n;return e=t,(n=[{key:"_handleOverlayClose",value:function(t){t.target.classList.contains("popup_active")&&this.close()}},{key:"_handleCloseIcon",value:function(t){t.target.classList.contains("popup__close")&&this.close()}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_removeEventListeners",value:function(){document.removeEventListener("keydown",this._closeByEsc),this._popupElement.removeEventListener("mousedown",this._closeByOverlayClick),this._popupElement.removeEventListener("click",this._closeByCloseIconClick)}},{key:"open",value:function(){this._popupElement.classList.add("popup_active"),this.setEventListeners()}},{key:"close",value:function(){this._popupElement.classList.remove("popup_active"),this._removeEventListeners()}},{key:"setEventListeners",value:function(){document.addEventListener("keydown",this._closeByEsc),this._popupElement.addEventListener("mousedown",this._closeByOverlayClick),this._popupElement.addEventListener("click",this._closeByCloseIconClick)}}])&&a(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==l(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===l(o)?o:String(o)),r)}var o}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=y(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},f.apply(this,arguments)}function p(t,e){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},p(t,e)}function h(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function y(t){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},y(t)}var v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&p(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=y(r);if(o){var n=y(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===l(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return h(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._formSubmitFunction=e,n._popupForm=n._popupElement.querySelector(".form"),n._inputList=Array.from(n._popupForm.querySelectorAll(".form__input")),n.handlerFormSubmit=n._handlerFormSubmit.bind(h(n)),n._popupButton=n._popupForm.querySelector(".popup__button"),n._popupButtonText=n._popupButton.textContent,n}return e=u,(n=[{key:"_getInputValues",value:function(){var t=this;return this._inputValues={},this._inputList.forEach((function(e){t._inputValues[e.name]=e.value})),this._inputValues}},{key:"setInputValues",value:function(t){this._inputList.forEach((function(e){e.value=t[e.name]}))}},{key:"_handlerFormSubmit",value:function(t){t.preventDefault(),this._formSubmitFunction(this._getInputValues(),this._popupButton,this._popupButtonText),this.close()}},{key:"setEventListeners",value:function(){f(y(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",this.handlerFormSubmit)}},{key:"_removeEventListeners",value:function(){f(y(u.prototype),"_removeEventListeners",this).call(this),this._popupForm.removeEventListener("submit",this.handlerFormSubmit)}},{key:"close",value:function(){f(y(u.prototype),"close",this).call(this),this._popupForm.reset()}}])&&s(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(c);function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function _(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==d(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===d(o)?o:String(o)),r)}var o}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=k(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},m.apply(this,arguments)}function b(t,e){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},b(t,e)}function g(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function k(t){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},k(t)}var S=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&b(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=k(r);if(o){var n=k(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===d(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return g(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._popupImage=e._popupElement.querySelector(".popup__fullscreen-image"),e._popupDescr=e._popupElement.querySelector(".popup__descr"),e.setImageDataInPopup=e._setImageData.bind(g(e)),e.handleCardClick=e.open.bind(g(e)),e}return e=u,(n=[{key:"open",value:function(t,e){m(k(u.prototype),"open",this).call(this),this.setImageDataInPopup(t,e)}},{key:"_setImageData",value:function(t,e){this._popupImage.src=t,this._popupImage.alt=e,this._popupDescr.textContent=e}}])&&_(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(c);function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function w(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==E(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==E(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===E(o)?o:String(o)),r)}var o}function C(){return C="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=j(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},C.apply(this,arguments)}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function P(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}var B=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=j(r);if(o){var n=j(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===E(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return P(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._deleteCardFunction=e,n._popupBtn=n._popupElement.querySelector(".popup__button"),n._popupBtnText=n._popupBtn.textContent,n.handleTrashBagClick=n.open.bind(P(n)),n.handlerCardDelition=n._handlerCardDelition.bind(P(n)),n}return e=u,(n=[{key:"open",value:function(t,e){C(j(u.prototype),"open",this).call(this),this._currentId=e,this._currentCard=t}},{key:"_handlerCardDelition",value:function(){this._deleteCardFunction(this._currentCard,this._currentId,this._popupBtn,this._popupBtnText),this.close()}},{key:"setEventListeners",value:function(){C(j(u.prototype),"setEventListeners",this).call(this),this._popupBtn.addEventListener("click",this.handlerCardDelition)}},{key:"_removeEventListeners",value:function(){C(j(u.prototype),"_removeEventListeners",this).call(this),this._popupBtn.removeEventListener("click",this.handlerCardDelition)}}])&&w(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(c);function L(t){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},L(t)}function T(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==L(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==L(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===L(o)?o:String(o)),r)}var o}var I=function(){function t(e,n,r,o){var i=e.name,u=e.link,a=e.likes,c=e._id;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._imagePath=u,this._imageDescription=i,this._likes=a,this._id=c,this._trashBagSelector=".place-card__trash-bag",this._heartElementSelector=".place-card__heart",this._imageSelector=".place-card__image",this._cardDescriptionSelector=".place-card__descr",this._likesCounterSelector=".place-card__counter",this._handleCardClick=r,this._handleLikeClick=o,this._templateSelector=n}var e,n;return e=t,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".place-card").cloneNode(!0)}},{key:"_setEventListenersToCard",value:function(){var t=this;this._heartElement.addEventListener("click",(function(){t._handleLikeClick(t,t._heartElement,t._likesCounter,t._id)})),this._cardImage.addEventListener("click",(function(){t._handleCardClick(t._imagePath,t._imageDescription)}))}},{key:"setLike",value:function(){this._heartElement.classList.add("place-card__heart_like")}},{key:"removeLike",value:function(){this._heartElement.classList.remove("place-card__heart_like")}},{key:"changeLikeCounterVisability",value:function(){0==+this._likesCounter.textContent?this._likesCounter.classList.add("place-card__counter_hidden"):this._likesCounter.classList.remove("place-card__counter_hidden")}},{key:"_searchCardComponents",value:function(){this._cardImage=this._element.querySelector(this._imageSelector),this._cardDescription=this._element.querySelector(this._cardDescriptionSelector),this._likesCounter=this._element.querySelector(this._likesCounterSelector),this._heartElement=this._element.querySelector(this._heartElementSelector),this._trashBagIcon=this._element.querySelector(this._trashBagSelector)}},{key:"_toggleTrashBagVisability",value:function(){this._hideTrashBagIcon()}},{key:"_hideTrashBagIcon",value:function(){this._trashBagIcon.classList.add("place-card__trash-bag_hidden")}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._searchCardComponents(),this._toggleTrashBagVisability(),this._setEventListenersToCard(),this._cardImage.setAttribute("src",this._imagePath),this._cardImage.setAttribute("alt",this._imageDescription),this._cardDescription.textContent=this._imageDescription,this._likesCounter.textContent=this._likes.length,this.changeLikeCounterVisability(),this._element}}])&&T(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function R(t){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},R(t)}function D(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==R(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==R(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===R(o)?o:String(o)),r)}var o}function x(){return x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=A(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},x.apply(this,arguments)}function q(t,e){return q=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},q(t,e)}function A(t){return A=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},A(t)}var U=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&q(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=A(r);if(o){var n=A(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===R(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e,n,r,o){var a,c=t.name,l=t.link,s=t.likes,f=t._id;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(a=i.call(this,{name:c,link:l,likes:s,_id:f},e,n,r))._handleTrashBagClick=o,a}return e=u,(n=[{key:"_toggleTrashBagVisability",value:function(){x(A(u.prototype),"_toggleTrashBagVisability",this).call(this),this._showTrashBagIcon()}},{key:"deleteCard",value:function(){this._element.remove()}},{key:"_showTrashBagIcon",value:function(){this._trashBagIcon.classList.remove("place-card__trash-bag_hidden")}},{key:"_setEventListenersToCard",value:function(){var t=this;x(A(u.prototype),"_setEventListenersToCard",this).call(this),this._trashBagIcon.addEventListener("click",(function(){t._handleTrashBagClick(t,t._id)}))}}])&&D(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(I);function V(t){return V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(t)}function F(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==V(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==V(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===V(o)?o:String(o)),r)}var o}var N=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=e.baseUrlAdress,this._autorisationToken=e.autorisationToken,this._profileUrl="".concat(this._baseUrl,"users/me"),this._profileAvatarUrl="".concat(this._profileUrl,"/avatar"),this._cardsUrl="".concat(this._baseUrl,"cards")}var e,n;return e=t,(n=[{key:"_fetchServerResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"_fetchGetRequest",value:function(t){var e=this;return fetch(t,{method:"GET",headers:{authorization:this._autorisationToken}}).then((function(t){return e._fetchServerResponse(t)}))}},{key:"_fetchPostRequest",value:function(t,e,n){var r=this;return fetch(t,{method:e,headers:{authorization:this._autorisationToken,"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(t){return r._fetchServerResponse(t)}))}},{key:"_fetchDeleteRequest",value:function(t,e){var n=this;return fetch("".concat(t,"/").concat(e),{method:"DELETE",headers:{authorization:this._autorisationToken}}).then((function(t){return n._fetchServerResponse(t)}))}},{key:"_fetchAddCardBody",value:function(t){return{name:t["card-name"],link:t["card-url"]}}},{key:"_fetchEditProfileBody",value:function(t){return{name:t["profile-name"],about:t["profile-job"]}}},{key:"_fetchPostAvatarBody",value:function(t){return{avatar:t["avatar-url"]}}},{key:"_fetchChangeLikesState",value:function(t,e,n){var r=this;return fetch("".concat(t,"/").concat(e,"/likes"),{method:n,headers:{authorization:this._autorisationToken}}).then((function(t){return r._fetchServerResponse(t)}))}},{key:"getProfileData",value:function(){return this._fetchGetRequest(this._profileUrl)}},{key:"getCards",value:function(){return this._fetchGetRequest(this._cardsUrl)}},{key:"postNewCard",value:function(t){return this._fetchPostRequest(this._cardsUrl,"POST",this._fetchAddCardBody(t))}},{key:"postProfileData",value:function(t){return this._fetchPostRequest(this._profileUrl,"PATCH",this._fetchEditProfileBody(t))}},{key:"postAvatar",value:function(t){return this._fetchPostRequest(this._profileAvatarUrl,"PATCH",this._fetchPostAvatarBody(t))}},{key:"postLike",value:function(t){return this._fetchChangeLikesState(this._cardsUrl,t,"PUT")}},{key:"deleteLike",value:function(t){return this._fetchChangeLikesState(this._cardsUrl,t,"DELETE")}},{key:"cardDelition",value:function(t){return this._fetchDeleteRequest(this._cardsUrl,t)}},{key:"changeButtonText",value:function(t,e){t.textContent=e}}])&&F(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function J(t){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},J(t)}function z(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==J(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==J(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===J(o)?o:String(o)),r)}var o}var G=function(){function t(e){var n=e.profileNameSelector,r=e.profileJobSelector,o=e.profileAvatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userNameElement=document.querySelector(n),this._userJobElement=document.querySelector(r),this._userAvatarElement=document.querySelector(o)}var e,n;return e=t,(n=[{key:"setUserId",value:function(t){this._userId=t}},{key:"getUserId",value:function(){return this._userId}},{key:"getUserInfo",value:function(){return{"profile-name":this._userNameElement.textContent,"profile-job":this._userJobElement.textContent}}},{key:"setUserInfo",value:function(t,e){this._userNameElement.textContent=t,this._userJobElement.textContent=e}},{key:"setAvatar",value:function(t){this._userAvatarElement.src=t}}])&&z(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),M=document.querySelector(".profile__edit-btn"),H=document.querySelector(".profile__add-button"),K="#place-card-template",Q={},W="Сохранение...",X={profileNameSelector:".profile__name",profileJobSelector:".profile__job",profileAvatarSelector:".profile__avatar"},Y=document.querySelector(".profile__avatar-wrapper"),Z={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__btn",inactiveButtonClass:"form__btn_disabled",inputErrorClass:"form__input_type_error"},$={baseUrlAdress:"https://nomoreparties.co/v1/cohort-62/",autorisationToken:"21d67130-4b88-41b2-a64a-c76e797b432e"};function tt(t,e,n){return tt=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}()?Reflect.construct.bind():function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&et(o,n.prototype),o},tt.apply(null,arguments)}function et(t,e){return et=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},et(t,e)}window.addEventListener("DOMContentLoaded",(function(){function t(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return tt(U,e).generateCard()}function e(t,e,n,r){e.classList.contains("place-card__heart_like")?l.deleteLike(r).then((function(e){var r=e.likes;n.textContent=r.length,t.removeLike(),t.changeLikeCounterVisability()})).catch((function(t){return console.log(t)})).finally((function(){return console.log("Лайк убран")})):l.postLike(r).then((function(e){var r=e.likes;n.textContent=r.length,t.setLike(),t.changeLikeCounterVisability()})).catch((function(t){return console.log(t)})).finally((function(){return console.log("Лайк поставлен")}))}var r=new G(X),o=new B("#delete-card-popup",(function(t,e,n,r){l.changeButtonText(n,"Удаление..."),l.cardDelition(e).then((function(e){t.deleteCard()})).catch((function(t){return console.log(t)})).finally((function(){l.changeButtonText(n,r),console.log("Удаление карточки прошло успешно")}))}));M.addEventListener("click",(function(){s.setInputValues(r.getUserInfo()),Q["edit-profile"].resetValidation(),s.open()})),H.addEventListener("click",(function(){f.open(),Q["add-card"].resetValidation()})),Y.addEventListener("click",(function(){p.open(),Q["refresh-avatar"].resetValidation()}));var u,a=new S("#open-image-popup"),c=new i({renderer:function(n){var i=n.name,u=n.link,l=n.likes,s=n._id,f=r.getUserId()===n.owner._id?t({name:i,link:u,likes:l,_id:s},K,a.handleCardClick,e,o.handleTrashBagClick):function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return tt(I,e).generateCard()}({name:i,link:u,likes:l,_id:s},K,a.handleCardClick,e);c.addItem(f)}},".places__list");u=Z,Array.from(document.querySelectorAll(u.formSelector)).forEach((function(t){var e=new n(u,t),r=t.getAttribute("name");Q[r]=e,e.enableValidation()}));var l=new N($);l.getProfileData().then((function(t){var e=t.name,n=t.about,o=t.avatar,i=t._id;r.setUserInfo(e,n),r.setAvatar(o),r.setUserId(i)})).catch((function(t){return console.log(t)})).finally((function(){return console.log("Загрузка данных с сервера прошла успешно")})),l.getCards().then((function(t){c.renderItems(t)})).catch((function(t){return console.log(t)})).finally((function(){return console.log("Загрузка данных с сервера прошла успешно")}));var s=new v("#edit-profile-popup",(function(t,e,n){l.changeButtonText(e,W),l.postProfileData(t).then((function(t){var e=t.name,n=t.about;r.setUserInfo(e,n)})).catch((function(t){return console.log(t)})).finally((function(){l.changeButtonText(e,n),console.log("Загрузка данных на сервера прошла успешно")}))})),f=new v("#add-card-popup",(function(n,r,i){l.changeButtonText(r,W),l.postNewCard(n).then((function(n){var r=t({name:n.name,link:n.link,likes:n.likes,_id:n._id},K,a.handleCardClick,e,o.handleTrashBagClick);c.addItem(r)})).catch((function(t){return console.log(t)})).finally((function(){l.changeButtonText(r,i),console.log("Загрузка данных на сервер прошла успешно")}))})),p=new v("#refresh-avatar-popup",(function(t,e,n){l.changeButtonText(e,"Обновление..."),l.postAvatar(t).then((function(t){r.setAvatar(t.avatar)})).catch((function(t){return console.log(t)})).finally((function(){l.changeButtonText(e,n),console.log("Загрузка данных на сервера прошла успешно")}))}))}))})();