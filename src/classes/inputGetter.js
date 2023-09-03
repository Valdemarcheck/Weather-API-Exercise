export default class InputGetter {
  constructor() {}

  getURLInputValues(inputs) {
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }
}
