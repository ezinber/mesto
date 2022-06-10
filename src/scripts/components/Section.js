export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  addItem(element, isInitial) {
    isInitial
    ? this._container.append(element)
    : this._container.prepend(element);
  }
}