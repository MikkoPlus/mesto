export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems(renderedItems) {
        this._clear();
        renderedItems.forEach(item => {
         this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}