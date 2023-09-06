export default class DataUnrenderer {
  constructor(DOMElementsToHandleOnRender) {
    this.DOMElementsToHandleOnRender = DOMElementsToHandleOnRender;
  }

  unrender() {
    for (let element of Object.values(this.DOMElementsToHandleOnRender)) {
      element.textContent = "";
    }
  }
}
