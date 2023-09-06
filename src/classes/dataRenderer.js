export default class DataRenderer {
  constructor(objectsToRenderInsideOf) {
    this._objectsToRenderInsideOf = objectsToRenderInsideOf;
  }

  renderWholeWeather(data, renderingParameters) {
    this.#renderCurrentWeather(data, renderingParameters);
    this.#renderForecastWeather(data, renderingParameters);
  }

  #renderCurrentWeather(data, renderingParameters) {}

  #renderForecastWeather(data, renderingParameters) {}

  #renderImage(data) {}
}
