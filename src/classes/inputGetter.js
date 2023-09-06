export default class InputGetter {
  constructor() {}

  getURLInputValues(inputsArray) {
    const inputValues = {};
    inputsArray.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  getRenderingParameters(inputsObject) {
    const parameters = {};
    for (let [key, selectElement] of Object.entries(inputsObject)) {
      parameters[key] =
        selectElement.options[selectElement.selectedIndex].value;
    }
    return parameters;
  }
}
