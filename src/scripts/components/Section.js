export default class Section {
    constructor({items: data, renderer}, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        this._clear();
        this._renderedItems.forEach(item => {
         this._renderer(item);
        });
    }

    addItem(element) {
        this._container.append(element);
    }
}