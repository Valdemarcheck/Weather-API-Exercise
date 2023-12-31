export default class DataRenderer {
  constructor(DOMElementsToHandleOnRender) {
    this._DOMElementsToHandleOnRender = DOMElementsToHandleOnRender;
  }

  renderWeather(data) {
    this.#renderCurrentWeather(data);
    this.#renderForecastWeather(data.forecastDays);
  }

  #renderCurrentWeather(data) {
    const currentWeatherDiv = this._DOMElementsToHandleOnRender.current;
    const header = document.createElement("h2");
    header.textContent = "Current weather";
    currentWeatherDiv.appendChild(header);

    for (let [key, value] of Object.entries(data)) {
      if (key === "forecastDays") continue;
      this.#setupDataRow({
        elementToAppendTo: currentWeatherDiv,
        data: value,
        dataName: key,
      });
    }
  }

  #renderForecastWeather(daysData) {
    const forecastWeatherDiv = this._DOMElementsToHandleOnRender.forecast;

    const header = document.createElement("h2");
    header.textContent = "Weekly forecast";
    forecastWeatherDiv.appendChild(header);

    const dayCellsArea = document.createElement("div");
    dayCellsArea.id = "day-cells-area";
    forecastWeatherDiv.appendChild(dayCellsArea);

    for (let day of daysData) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("day-cell");
      dayCellsArea.appendChild(dayCell);

      const weatherConditionImageDiv = document.createElement("div");
      weatherConditionImageDiv.classList.add("condition-image");
      dayCell.appendChild(weatherConditionImageDiv);

      const weatherConditionText = document.createElement("p");
      weatherConditionText.classList.add("condition-text");
      weatherConditionText.textContent = day.condition;
      dayCell.appendChild(weatherConditionText);

      const temperaturesSection = document.createElement("div");
      temperaturesSection.classList.add("temperatures-section");
      dayCell.appendChild(temperaturesSection);

      const temperatureSeparator = document.createElement("div");
      temperatureSeparator.classList.add("temperature-separator");
      temperaturesSection.appendChild(temperatureSeparator);

      const minTemperatureText = document.createElement("p");
      minTemperatureText.classList.add("min-temperature");
      minTemperatureText.textContent = day.mintemp;
      temperaturesSection.appendChild(minTemperatureText);

      const maxTemperatureText = document.createElement("p");
      maxTemperatureText.classList.add("max-temperature");
      maxTemperatureText.textContent = day.maxtemp;
      temperaturesSection.appendChild(maxTemperatureText);

      this.#renderImage(weatherConditionImageDiv, day.imageURL);
    }
  }

  #setupDataRow({ elementToAppendTo, data, dataName }) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    elementToAppendTo.appendChild(rowDiv);

    const valueNameElement = document.createElement("p");
    valueNameElement.textContent = dataName;
    rowDiv.appendChild(valueNameElement);

    const valueElement = document.createElement("p");
    valueElement.textContent = data;
    rowDiv.appendChild(valueElement);
  }

  async #renderImage(elementToAppendTo, imageURL) {
    const imageProcessedURL = await this.#getImage(imageURL);
    const imageElement = document.createElement("img");
    imageElement.src = imageProcessedURL;
    elementToAppendTo.appendChild(imageElement);
  }

  async #getImage(imageURL) {
    const response = await fetch(imageURL, { mode: "cors" });
    const blob = await response.blob();
    const image = URL.createObjectURL(blob);
    return image;
  }
}
