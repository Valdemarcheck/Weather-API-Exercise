/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/classes/URLMaker.js":
/*!*********************************!*\
  !*** ./src/classes/URLMaker.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ URLMaker)
/* harmony export */ });
class URLMaker {
  makeURL(inputValues) {
    const key = "260c4809042c47adb5375013232708";
    const location = inputValues.location;
    const language = inputValues.language;

    const URLPath = `https://api.weatherapi.com/v1/forecast.json`;
    let URLParameters = `key=${key}&q=${location}&days=7`;
    if (language !== "en") {
      URLParameters += `&lang=${language}`;
    }

    return URLPath + "?" + URLParameters;
  }
}


/***/ }),

/***/ "./src/classes/app.js":
/*!****************************!*\
  !*** ./src/classes/app.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _textTranslator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./textTranslator */ "./src/classes/textTranslator.js");
/* harmony import */ var _localStorageManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorageManager */ "./src/classes/localStorageManager.js");
/* harmony import */ var _inputGetter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inputGetter */ "./src/classes/inputGetter.js");
/* harmony import */ var _URLMaker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./URLMaker */ "./src/classes/URLMaker.js");
/* harmony import */ var _dataFetcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dataFetcher */ "./src/classes/dataFetcher.js");
/* harmony import */ var _errorNotifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errorNotifier */ "./src/classes/errorNotifier.js");
/* harmony import */ var _jsonParser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./jsonParser */ "./src/classes/jsonParser.js");
/* harmony import */ var _dataRenderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dataRenderer */ "./src/classes/dataRenderer.js");
/* harmony import */ var _requiredDataGetter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./requiredDataGetter */ "./src/classes/requiredDataGetter.js");










const URL_TYPES = {
  current: "/current.json",
  forecast: "/forecast.json",
};
const STATIC_TEXT_TRANSLATIONS = {
  "form#settings>.header": {
    ru: "Настройки",
    en: "Settings",
  },
  'label[for="language"]': {
    ru: "Язык",
    en: "Language",
  },
  'label[for="speed"]': {
    ru: "Скорость",
    en: "Speed",
  },
  'label[for="temperature"]': {
    ru: "Температура",
    en: "Temperature",
  },
  'label[for="pressure"]': {
    ru: "Давление",
    en: "Pressure",
  },
  'label[for="precipitation"]': {
    ru: "Осадки",
    en: "Precipitation",
  },
  'label[for="location"]': {
    ru: "Город или страна",
    en: "City or country",
  },
};
class App {
  constructor() {
    const objectsToRenderInsideOf = {
      current: document.getElementById("current-forecast-div"),
      forecast: document.getElementById("weekly-forecast-div"),
    };

    this.localStorageManager = new _localStorageManager__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.textTranslator = new _textTranslator__WEBPACK_IMPORTED_MODULE_0__["default"](STATIC_TEXT_TRANSLATIONS, null);
    this.inputGetter = new _inputGetter__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.urlMaker = new _URLMaker__WEBPACK_IMPORTED_MODULE_3__["default"](URL_TYPES);
    this.dataFetcher = new _dataFetcher__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.errorNotifier = new _errorNotifier__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this.jsonParser = new _jsonParser__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this.dataRenderer = new _dataRenderer__WEBPACK_IMPORTED_MODULE_7__["default"](objectsToRenderInsideOf);
    this.requiredDataGetter = new _requiredDataGetter__WEBPACK_IMPORTED_MODULE_8__["default"]();
  }

  async getWeatherData(inputValues) {
    const fetchURL = this.urlMaker.makeURL(inputValues);

    const response = await this.dataFetcher.fetchData(fetchURL);
    const data = await this.jsonParser.parseJson(response);
    return data;
  }

  setup() {
    const inputsForRenderingParameters = {
      speed: document.getElementById("speed"),
      temperature: document.getElementById("temperature"),
      pressure: document.getElementById("pressure"),
      precipitation: document.getElementById("precipitation"),
    };

    const languageSelect = document.getElementById("language");
    const submitButton = document.querySelector("button[type='submit']");
    const weatherForm = document.getElementById("weather-form");
    const inputs = [languageSelect, document.getElementById("location")];

    if (this.localStorageManager.getValue("language")) {
      const language = this.localStorageManager.getValue("language");
      this.textTranslator.translateText(language);
      languageSelect.value = language;
    }

    languageSelect.addEventListener("change", () => {
      this.textTranslator.translateText(languageSelect.value);
      this.localStorageManager.setValue("language", languageSelect.value);
    });

    submitButton.addEventListener("click", async (e) => {
      if (weatherForm.checkValidity()) {
        e.preventDefault();
        const inputValues = this.inputGetter.getURLInputValues(inputs);

        const allWeatherData = await this.getWeatherData(inputValues);
        const renderingParameters = this.inputGetter.getRenderingParameters(
          inputsForRenderingParameters
        );

        const requiredData = this.requiredDataGetter.getRequiredWeatherData({
          data: allWeatherData,
          renderingParameters,
        });

        this.dataRenderer.renderWeather(requiredData);
      }
    });
  }
}


/***/ }),

/***/ "./src/classes/dataFetcher.js":
/*!************************************!*\
  !*** ./src/classes/dataFetcher.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataFetcher)
/* harmony export */ });
class DataFetcher {
  fetchData(url) {
    return fetch(url, { mode: "cors" });
  }
}


/***/ }),

/***/ "./src/classes/dataRenderer.js":
/*!*************************************!*\
  !*** ./src/classes/dataRenderer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataRenderer)
/* harmony export */ });
class DataRenderer {
  constructor(objectsToRenderInsideOf) {
    this._objectsToRenderInsideOf = objectsToRenderInsideOf;
  }

  renderWeather(data) {
    console.log(data);
    this.#renderCurrentWeather(data);
    this.#renderForecastWeather(data.forecastDays);
  }

  #renderCurrentWeather(data) {
    const currentWeatherDiv = this._objectsToRenderInsideOf.current;
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
    const forecastWeatherDiv = this._objectsToRenderInsideOf.forecast;

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

  #renderImage(elementToAppendTo, data) {
    const weatherCondition = data.condition;
  }
}


/***/ }),

/***/ "./src/classes/errorNotifier.js":
/*!**************************************!*\
  !*** ./src/classes/errorNotifier.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ErrorNotifier)
/* harmony export */ });
class ErrorNotifier {
  TIMEOUT_TIME_MS = 5000;

  notifyError(notifyDiv, errorMessage) {
    notifyDiv.classList.remove("hidden");
    const notifyDivText = notifyDiv.querySelector("p");
    notifyDivText.textContent = errorMessage;

    setTimeout(() => {
      notifyDiv.classList.add("hidden");
    }, this.TIMEOUT_TIME_MS);
  }
}


/***/ }),

/***/ "./src/classes/inputGetter.js":
/*!************************************!*\
  !*** ./src/classes/inputGetter.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputGetter)
/* harmony export */ });
class InputGetter {
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


/***/ }),

/***/ "./src/classes/jsonParser.js":
/*!***********************************!*\
  !*** ./src/classes/jsonParser.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JsonParser)
/* harmony export */ });
class JsonParser {
  parseJson(responsePromise) {
    return responsePromise.json();
  }
}


/***/ }),

/***/ "./src/classes/localStorageManager.js":
/*!********************************************!*\
  !*** ./src/classes/localStorageManager.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocalStorageManager)
/* harmony export */ });
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

class LocalStorageManager {
  constructor() {
    if (storageAvailable("localStorage")) {
      console.log("Local storage is available");
      this.localStorage = window.localStorage;
    } else {
      console.warn(
        "Local storage is unavailable by some reason. Check if it is full, or if your browser supports it"
      );
    }
  }

  setValue(key, value) {
    this.localStorage.setItem(key, value);
  }

  getValue(key) {
    return this.localStorage.getItem(key);
  }
}


/***/ }),

/***/ "./src/classes/requiredDataGetter.js":
/*!*******************************************!*\
  !*** ./src/classes/requiredDataGetter.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RequiredDataGetter)
/* harmony export */ });
const DATA_KINDS = {
  current: 0,
  day: 1,
};

function metersPerHourToMetersPerSecond(mph) {
  const mps = mph / 3600;
  return mps.toFixed(2);
}

class RequiredDataGetter {
  getRequiredWeatherData({ data, renderingParameters }) {
    const requiredData = {
      country: data.location.country,
      localTime: data.location.localtime,
      name: data.location.name,
      region: data.location.region,
      condition: data.current.condition.text,
      forecastDays: [],
    };

    const exactDataParameters = {
      renderingParameters,
      requiredDataObject: requiredData,
      allData: data,
      dataKind: DATA_KINDS.current,
    };

    this.#setSpeedRelatedParams(exactDataParameters);
    this.#setTemperatureRelatedParams(exactDataParameters);
    this.#setPressureRelatedParams(exactDataParameters);
    this.#setPrecipitationRelatedParams(exactDataParameters);
    this.#setForecastParams(exactDataParameters);
    return requiredData;
  }

  #setSpeedRelatedParams({
    allData,
    renderingParameters,
    requiredDataObject,
    dataKind,
  }) {
    switch (renderingParameters.speed) {
      case "kph":
        requiredDataObject.gust = allData.current.gust_kph;
        requiredDataObject.wind_speed = allData.current.wind_kph;
        break;
      case "mps":
        requiredDataObject.gust = metersPerHourToMetersPerSecond(
          allData.current.gust_mph
        );
        requiredDataObject.wind_speed = metersPerHourToMetersPerSecond(
          allData.current.wind_mph
        );
        break;
      case "mph":
        requiredDataObject.gust = allData.current.gust_mph;
        requiredDataObject.wind_speed = allData.current.wind_mph;
        break;
    }
  }

  #setTemperatureRelatedParams({
    allData,
    renderingParameters,
    requiredDataObject,
    dataKind,
  }) {
    if (dataKind === DATA_KINDS.current) {
      switch (renderingParameters.temperature) {
        case "temp_c":
          requiredDataObject.feelslike = allData.current.feelslike_c;
          requiredDataObject.temp = allData.current.temp_c;
          break;
        case "temp_f":
          requiredDataObject.feelslike = allData.current.feelslike_f;
          requiredDataObject.temp = allData.current.temp_f;
          break;
      }
    } else if (dataKind === DATA_KINDS.day) {
      switch (renderingParameters.temperature) {
        case "temp_c":
          requiredDataObject.maxtemp = allData.day.maxtemp_c;
          requiredDataObject.mintemp = allData.day.mintemp_c;
          break;
        case "temp_f":
          requiredDataObject.maxtemp = allData.day.maxtemp_f;
          requiredDataObject.mintemp = allData.day.mintemp_f;
          break;
      }
    }
  }

  #setPressureRelatedParams({
    allData,
    renderingParameters,
    requiredDataObject,
  }) {
    requiredDataObject.pressure = allData.current[renderingParameters.pressure];
  }

  #setPrecipitationRelatedParams({
    allData,
    renderingParameters,
    requiredDataObject,
  }) {
    requiredDataObject.precipitation =
      allData.current[renderingParameters.precipitation];
  }

  #setForecastParams({ allData, renderingParameters, requiredDataObject }) {
    for (let i = 0; i < allData.forecast.forecastday.length; i++) {
      const allDayData = allData.forecast.forecastday[i];
      const requiredDayData = {
        condition: allDayData.day.condition.text,
      };

      this.#setTemperatureRelatedParams({
        allData: allDayData,
        renderingParameters,
        requiredDataObject: requiredDayData,
        dataKind: DATA_KINDS.day,
      });

      requiredDataObject.forecastDays.push(requiredDayData);
    }
  }
}


/***/ }),

/***/ "./src/classes/textTranslator.js":
/*!***************************************!*\
  !*** ./src/classes/textTranslator.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextTranslator)
/* harmony export */ });
class TextTranslator {
  constructor(staticTextTranslations, inputTranslations) {
    this.staticTextTranslations = staticTextTranslations;
    this.inputTranslations = inputTranslations;
  }

  translateText(language) {
    for (let [query, translations] of Object.entries(
      this.staticTextTranslations
    )) {
      try {
        const element = document.querySelector(query);
        const translation = translations[language];
        element.textContent = translation;
      } catch (err) {
        console.error(
          `Couldn't translate element with query ${query} to ${translations[language]}`
        );
      }
    }
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _classes_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/app */ "./src/classes/app.js");



(() => {
  const app = new _classes_app__WEBPACK_IMPORTED_MODULE_1__["default"]();
  app.setup();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7VUNyQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOc0I7QUFDVTs7QUFFaEM7QUFDQSxrQkFBa0Isb0RBQUc7QUFDckI7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvc3R5bGVzLmNzcz8xNTUzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvVVJMTWFrZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9hcHAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9kYXRhRmV0Y2hlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL2RhdGFSZW5kZXJlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL2Vycm9yTm90aWZpZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9pbnB1dEdldHRlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL2pzb25QYXJzZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9sb2NhbFN0b3JhZ2VNYW5hZ2VyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvcmVxdWlyZWREYXRhR2V0dGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvdGV4dFRyYW5zbGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVUkxNYWtlciB7XG4gIG1ha2VVUkwoaW5wdXRWYWx1ZXMpIHtcbiAgICBjb25zdCBrZXkgPSBwcm9jZXNzLmVudi5BUElfS0VZO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gaW5wdXRWYWx1ZXMubG9jYXRpb247XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBpbnB1dFZhbHVlcy5sYW5ndWFnZTtcblxuICAgIGNvbnN0IFVSTFBhdGggPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbmA7XG4gICAgbGV0IFVSTFBhcmFtZXRlcnMgPSBga2V5PSR7a2V5fSZxPSR7bG9jYXRpb259JmRheXM9N2A7XG4gICAgaWYgKGxhbmd1YWdlICE9PSBcImVuXCIpIHtcbiAgICAgIFVSTFBhcmFtZXRlcnMgKz0gYCZsYW5nPSR7bGFuZ3VhZ2V9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gVVJMUGF0aCArIFwiP1wiICsgVVJMUGFyYW1ldGVycztcbiAgfVxufVxuIiwiaW1wb3J0IFRleHRUcmFuc2xhdG9yIGZyb20gXCIuL3RleHRUcmFuc2xhdG9yXCI7XG5pbXBvcnQgTG9jYWxTdG9yYWdlTWFuYWdlciBmcm9tIFwiLi9sb2NhbFN0b3JhZ2VNYW5hZ2VyXCI7XG5pbXBvcnQgSW5wdXRHZXR0ZXIgZnJvbSBcIi4vaW5wdXRHZXR0ZXJcIjtcbmltcG9ydCBVUkxNYWtlciBmcm9tIFwiLi9VUkxNYWtlclwiO1xuaW1wb3J0IERhdGFGZXRjaGVyIGZyb20gXCIuL2RhdGFGZXRjaGVyXCI7XG5pbXBvcnQgRXJyb3JOb3RpZmllciBmcm9tIFwiLi9lcnJvck5vdGlmaWVyXCI7XG5pbXBvcnQgSnNvblBhcnNlciBmcm9tIFwiLi9qc29uUGFyc2VyXCI7XG5pbXBvcnQgRGF0YVJlbmRlcmVyIGZyb20gXCIuL2RhdGFSZW5kZXJlclwiO1xuaW1wb3J0IFJlcXVpcmVkRGF0YUdldHRlciBmcm9tIFwiLi9yZXF1aXJlZERhdGFHZXR0ZXJcIjtcblxuY29uc3QgVVJMX1RZUEVTID0ge1xuICBjdXJyZW50OiBcIi9jdXJyZW50Lmpzb25cIixcbiAgZm9yZWNhc3Q6IFwiL2ZvcmVjYXN0Lmpzb25cIixcbn07XG5jb25zdCBTVEFUSUNfVEVYVF9UUkFOU0xBVElPTlMgPSB7XG4gIFwiZm9ybSNzZXR0aW5ncz4uaGVhZGVyXCI6IHtcbiAgICBydTogXCLQndCw0YHRgtGA0L7QudC60LhcIixcbiAgICBlbjogXCJTZXR0aW5nc1wiLFxuICB9LFxuICAnbGFiZWxbZm9yPVwibGFuZ3VhZ2VcIl0nOiB7XG4gICAgcnU6IFwi0K/Qt9GL0LpcIixcbiAgICBlbjogXCJMYW5ndWFnZVwiLFxuICB9LFxuICAnbGFiZWxbZm9yPVwic3BlZWRcIl0nOiB7XG4gICAgcnU6IFwi0KHQutC+0YDQvtGB0YLRjFwiLFxuICAgIGVuOiBcIlNwZWVkXCIsXG4gIH0sXG4gICdsYWJlbFtmb3I9XCJ0ZW1wZXJhdHVyZVwiXSc6IHtcbiAgICBydTogXCLQotC10LzQv9C10YDQsNGC0YPRgNCwXCIsXG4gICAgZW46IFwiVGVtcGVyYXR1cmVcIixcbiAgfSxcbiAgJ2xhYmVsW2Zvcj1cInByZXNzdXJlXCJdJzoge1xuICAgIHJ1OiBcItCU0LDQstC70LXQvdC40LVcIixcbiAgICBlbjogXCJQcmVzc3VyZVwiLFxuICB9LFxuICAnbGFiZWxbZm9yPVwicHJlY2lwaXRhdGlvblwiXSc6IHtcbiAgICBydTogXCLQntGB0LDQtNC60LhcIixcbiAgICBlbjogXCJQcmVjaXBpdGF0aW9uXCIsXG4gIH0sXG4gICdsYWJlbFtmb3I9XCJsb2NhdGlvblwiXSc6IHtcbiAgICBydTogXCLQk9C+0YDQvtC0INC40LvQuCDRgdGC0YDQsNC90LBcIixcbiAgICBlbjogXCJDaXR5IG9yIGNvdW50cnlcIixcbiAgfSxcbn07XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBvYmplY3RzVG9SZW5kZXJJbnNpZGVPZiA9IHtcbiAgICAgIGN1cnJlbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudC1mb3JlY2FzdC1kaXZcIiksXG4gICAgICBmb3JlY2FzdDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWVrbHktZm9yZWNhc3QtZGl2XCIpLFxuICAgIH07XG5cbiAgICB0aGlzLmxvY2FsU3RvcmFnZU1hbmFnZXIgPSBuZXcgTG9jYWxTdG9yYWdlTWFuYWdlcigpO1xuICAgIHRoaXMudGV4dFRyYW5zbGF0b3IgPSBuZXcgVGV4dFRyYW5zbGF0b3IoU1RBVElDX1RFWFRfVFJBTlNMQVRJT05TLCBudWxsKTtcbiAgICB0aGlzLmlucHV0R2V0dGVyID0gbmV3IElucHV0R2V0dGVyKCk7XG4gICAgdGhpcy51cmxNYWtlciA9IG5ldyBVUkxNYWtlcihVUkxfVFlQRVMpO1xuICAgIHRoaXMuZGF0YUZldGNoZXIgPSBuZXcgRGF0YUZldGNoZXIoKTtcbiAgICB0aGlzLmVycm9yTm90aWZpZXIgPSBuZXcgRXJyb3JOb3RpZmllcigpO1xuICAgIHRoaXMuanNvblBhcnNlciA9IG5ldyBKc29uUGFyc2VyKCk7XG4gICAgdGhpcy5kYXRhUmVuZGVyZXIgPSBuZXcgRGF0YVJlbmRlcmVyKG9iamVjdHNUb1JlbmRlckluc2lkZU9mKTtcbiAgICB0aGlzLnJlcXVpcmVkRGF0YUdldHRlciA9IG5ldyBSZXF1aXJlZERhdGFHZXR0ZXIoKTtcbiAgfVxuXG4gIGFzeW5jIGdldFdlYXRoZXJEYXRhKGlucHV0VmFsdWVzKSB7XG4gICAgY29uc3QgZmV0Y2hVUkwgPSB0aGlzLnVybE1ha2VyLm1ha2VVUkwoaW5wdXRWYWx1ZXMpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmRhdGFGZXRjaGVyLmZldGNoRGF0YShmZXRjaFVSTCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuanNvblBhcnNlci5wYXJzZUpzb24ocmVzcG9uc2UpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgc2V0dXAoKSB7XG4gICAgY29uc3QgaW5wdXRzRm9yUmVuZGVyaW5nUGFyYW1ldGVycyA9IHtcbiAgICAgIHNwZWVkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwZWVkXCIpLFxuICAgICAgdGVtcGVyYXR1cmU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcGVyYXR1cmVcIiksXG4gICAgICBwcmVzc3VyZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVzc3VyZVwiKSxcbiAgICAgIHByZWNpcGl0YXRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlY2lwaXRhdGlvblwiKSxcbiAgICB9O1xuXG4gICAgY29uc3QgbGFuZ3VhZ2VTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmd1YWdlXCIpO1xuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25bdHlwZT0nc3VibWl0J11cIik7XG4gICAgY29uc3Qgd2VhdGhlckZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItZm9ybVwiKTtcbiAgICBjb25zdCBpbnB1dHMgPSBbbGFuZ3VhZ2VTZWxlY3QsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIildO1xuXG4gICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlTWFuYWdlci5nZXRWYWx1ZShcImxhbmd1YWdlXCIpKSB7XG4gICAgICBjb25zdCBsYW5ndWFnZSA9IHRoaXMubG9jYWxTdG9yYWdlTWFuYWdlci5nZXRWYWx1ZShcImxhbmd1YWdlXCIpO1xuICAgICAgdGhpcy50ZXh0VHJhbnNsYXRvci50cmFuc2xhdGVUZXh0KGxhbmd1YWdlKTtcbiAgICAgIGxhbmd1YWdlU2VsZWN0LnZhbHVlID0gbGFuZ3VhZ2U7XG4gICAgfVxuXG4gICAgbGFuZ3VhZ2VTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnRleHRUcmFuc2xhdG9yLnRyYW5zbGF0ZVRleHQobGFuZ3VhZ2VTZWxlY3QudmFsdWUpO1xuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VNYW5hZ2VyLnNldFZhbHVlKFwibGFuZ3VhZ2VcIiwgbGFuZ3VhZ2VTZWxlY3QudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgaWYgKHdlYXRoZXJGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWVzID0gdGhpcy5pbnB1dEdldHRlci5nZXRVUkxJbnB1dFZhbHVlcyhpbnB1dHMpO1xuXG4gICAgICAgIGNvbnN0IGFsbFdlYXRoZXJEYXRhID0gYXdhaXQgdGhpcy5nZXRXZWF0aGVyRGF0YShpbnB1dFZhbHVlcyk7XG4gICAgICAgIGNvbnN0IHJlbmRlcmluZ1BhcmFtZXRlcnMgPSB0aGlzLmlucHV0R2V0dGVyLmdldFJlbmRlcmluZ1BhcmFtZXRlcnMoXG4gICAgICAgICAgaW5wdXRzRm9yUmVuZGVyaW5nUGFyYW1ldGVyc1xuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHJlcXVpcmVkRGF0YSA9IHRoaXMucmVxdWlyZWREYXRhR2V0dGVyLmdldFJlcXVpcmVkV2VhdGhlckRhdGEoe1xuICAgICAgICAgIGRhdGE6IGFsbFdlYXRoZXJEYXRhLFxuICAgICAgICAgIHJlbmRlcmluZ1BhcmFtZXRlcnMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZGF0YVJlbmRlcmVyLnJlbmRlcldlYXRoZXIocmVxdWlyZWREYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YUZldGNoZXIge1xuICBmZXRjaERhdGEodXJsKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCwgeyBtb2RlOiBcImNvcnNcIiB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3Iob2JqZWN0c1RvUmVuZGVySW5zaWRlT2YpIHtcbiAgICB0aGlzLl9vYmplY3RzVG9SZW5kZXJJbnNpZGVPZiA9IG9iamVjdHNUb1JlbmRlckluc2lkZU9mO1xuICB9XG5cbiAgcmVuZGVyV2VhdGhlcihkYXRhKSB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgdGhpcy4jcmVuZGVyQ3VycmVudFdlYXRoZXIoZGF0YSk7XG4gICAgdGhpcy4jcmVuZGVyRm9yZWNhc3RXZWF0aGVyKGRhdGEuZm9yZWNhc3REYXlzKTtcbiAgfVxuXG4gICNyZW5kZXJDdXJyZW50V2VhdGhlcihkYXRhKSB7XG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJEaXYgPSB0aGlzLl9vYmplY3RzVG9SZW5kZXJJbnNpZGVPZi5jdXJyZW50O1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkN1cnJlbnQgd2VhdGhlclwiO1xuICAgIGN1cnJlbnRXZWF0aGVyRGl2LmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICAgIGlmIChrZXkgPT09IFwiZm9yZWNhc3REYXlzXCIpIGNvbnRpbnVlO1xuICAgICAgdGhpcy4jc2V0dXBEYXRhUm93KHtcbiAgICAgICAgZWxlbWVudFRvQXBwZW5kVG86IGN1cnJlbnRXZWF0aGVyRGl2LFxuICAgICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgICAgZGF0YU5hbWU6IGtleSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gICNyZW5kZXJGb3JlY2FzdFdlYXRoZXIoZGF5c0RhdGEpIHtcbiAgICBjb25zdCBmb3JlY2FzdFdlYXRoZXJEaXYgPSB0aGlzLl9vYmplY3RzVG9SZW5kZXJJbnNpZGVPZi5mb3JlY2FzdDtcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIldlZWtseSBmb3JlY2FzdFwiO1xuICAgIGZvcmVjYXN0V2VhdGhlckRpdi5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgY29uc3QgZGF5Q2VsbHNBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkYXlDZWxsc0FyZWEuaWQgPSBcImRheS1jZWxscy1hcmVhXCI7XG4gICAgZm9yZWNhc3RXZWF0aGVyRGl2LmFwcGVuZENoaWxkKGRheUNlbGxzQXJlYSk7XG5cbiAgICBmb3IgKGxldCBkYXkgb2YgZGF5c0RhdGEpIHtcbiAgICAgIGNvbnN0IGRheUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGF5Q2VsbC5jbGFzc0xpc3QuYWRkKFwiZGF5LWNlbGxcIik7XG4gICAgICBkYXlDZWxsc0FyZWEuYXBwZW5kQ2hpbGQoZGF5Q2VsbCk7XG5cbiAgICAgIGNvbnN0IHdlYXRoZXJDb25kaXRpb25JbWFnZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB3ZWF0aGVyQ29uZGl0aW9uSW1hZ2VEaXYuY2xhc3NMaXN0LmFkZChcImNvbmRpdGlvbi1pbWFnZVwiKTtcbiAgICAgIGRheUNlbGwuYXBwZW5kQ2hpbGQod2VhdGhlckNvbmRpdGlvbkltYWdlRGl2KTtcblxuICAgICAgY29uc3Qgd2VhdGhlckNvbmRpdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIHdlYXRoZXJDb25kaXRpb25UZXh0LmNsYXNzTGlzdC5hZGQoXCJjb25kaXRpb24tdGV4dFwiKTtcbiAgICAgIHdlYXRoZXJDb25kaXRpb25UZXh0LnRleHRDb250ZW50ID0gZGF5LmNvbmRpdGlvbjtcbiAgICAgIGRheUNlbGwuYXBwZW5kQ2hpbGQod2VhdGhlckNvbmRpdGlvblRleHQpO1xuXG4gICAgICBjb25zdCB0ZW1wZXJhdHVyZXNTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRlbXBlcmF0dXJlc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRlbXBlcmF0dXJlcy1zZWN0aW9uXCIpO1xuICAgICAgZGF5Q2VsbC5hcHBlbmRDaGlsZCh0ZW1wZXJhdHVyZXNTZWN0aW9uKTtcblxuICAgICAgY29uc3QgdGVtcGVyYXR1cmVTZXBhcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGVtcGVyYXR1cmVTZXBhcmF0b3IuY2xhc3NMaXN0LmFkZChcInRlbXBlcmF0dXJlLXNlcGFyYXRvclwiKTtcbiAgICAgIHRlbXBlcmF0dXJlc1NlY3Rpb24uYXBwZW5kQ2hpbGQodGVtcGVyYXR1cmVTZXBhcmF0b3IpO1xuXG4gICAgICBjb25zdCBtaW5UZW1wZXJhdHVyZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIG1pblRlbXBlcmF0dXJlVGV4dC5jbGFzc0xpc3QuYWRkKFwibWluLXRlbXBlcmF0dXJlXCIpO1xuICAgICAgbWluVGVtcGVyYXR1cmVUZXh0LnRleHRDb250ZW50ID0gZGF5Lm1pbnRlbXA7XG4gICAgICB0ZW1wZXJhdHVyZXNTZWN0aW9uLmFwcGVuZENoaWxkKG1pblRlbXBlcmF0dXJlVGV4dCk7XG5cbiAgICAgIGNvbnN0IG1heFRlbXBlcmF0dXJlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgbWF4VGVtcGVyYXR1cmVUZXh0LmNsYXNzTGlzdC5hZGQoXCJtYXgtdGVtcGVyYXR1cmVcIik7XG4gICAgICBtYXhUZW1wZXJhdHVyZVRleHQudGV4dENvbnRlbnQgPSBkYXkubWF4dGVtcDtcbiAgICAgIHRlbXBlcmF0dXJlc1NlY3Rpb24uYXBwZW5kQ2hpbGQobWF4VGVtcGVyYXR1cmVUZXh0KTtcbiAgICB9XG4gIH1cblxuICAjc2V0dXBEYXRhUm93KHsgZWxlbWVudFRvQXBwZW5kVG8sIGRhdGEsIGRhdGFOYW1lIH0pIHtcbiAgICBjb25zdCByb3dEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvd0Rpdi5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIGVsZW1lbnRUb0FwcGVuZFRvLmFwcGVuZENoaWxkKHJvd0Rpdik7XG5cbiAgICBjb25zdCB2YWx1ZU5hbWVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdmFsdWVOYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGFOYW1lO1xuICAgIHJvd0Rpdi5hcHBlbmRDaGlsZCh2YWx1ZU5hbWVFbGVtZW50KTtcblxuICAgIGNvbnN0IHZhbHVlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHZhbHVlRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGE7XG4gICAgcm93RGl2LmFwcGVuZENoaWxkKHZhbHVlRWxlbWVudCk7XG4gIH1cblxuICAjcmVuZGVySW1hZ2UoZWxlbWVudFRvQXBwZW5kVG8sIGRhdGEpIHtcbiAgICBjb25zdCB3ZWF0aGVyQ29uZGl0aW9uID0gZGF0YS5jb25kaXRpb247XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yTm90aWZpZXIge1xuICBUSU1FT1VUX1RJTUVfTVMgPSA1MDAwO1xuXG4gIG5vdGlmeUVycm9yKG5vdGlmeURpdiwgZXJyb3JNZXNzYWdlKSB7XG4gICAgbm90aWZ5RGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgY29uc3Qgbm90aWZ5RGl2VGV4dCA9IG5vdGlmeURpdi5xdWVyeVNlbGVjdG9yKFwicFwiKTtcbiAgICBub3RpZnlEaXZUZXh0LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBub3RpZnlEaXYuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB9LCB0aGlzLlRJTUVPVVRfVElNRV9NUyk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0R2V0dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldFVSTElucHV0VmFsdWVzKGlucHV0c0FycmF5KSB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB7fTtcbiAgICBpbnB1dHNBcnJheS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXRWYWx1ZXNbaW5wdXQuaWRdID0gaW5wdXQudmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0VmFsdWVzO1xuICB9XG5cbiAgZ2V0UmVuZGVyaW5nUGFyYW1ldGVycyhpbnB1dHNPYmplY3QpIHtcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0ge307XG4gICAgZm9yIChsZXQgW2tleSwgc2VsZWN0RWxlbWVudF0gb2YgT2JqZWN0LmVudHJpZXMoaW5wdXRzT2JqZWN0KSkge1xuICAgICAgcGFyYW1ldGVyc1trZXldID1cbiAgICAgICAgc2VsZWN0RWxlbWVudC5vcHRpb25zW3NlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbWV0ZXJzO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBKc29uUGFyc2VyIHtcbiAgcGFyc2VKc29uKHJlc3BvbnNlUHJvbWlzZSkge1xuICAgIHJldHVybiByZXNwb25zZVByb21pc2UuanNvbigpO1xuICB9XG59XG4iLCJmdW5jdGlvbiBzdG9yYWdlQXZhaWxhYmxlKHR5cGUpIHtcbiAgbGV0IHN0b3JhZ2U7XG4gIHRyeSB7XG4gICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICBjb25zdCB4ID0gXCJfX3N0b3JhZ2VfdGVzdF9fXCI7XG4gICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAoXG4gICAgICBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmXG4gICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAoZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09IFwiUXVvdGFFeGNlZWRlZEVycm9yXCIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09IFwiTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRURcIikgJiZcbiAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICBzdG9yYWdlICYmXG4gICAgICBzdG9yYWdlLmxlbmd0aCAhPT0gMFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYWxTdG9yYWdlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChzdG9yYWdlQXZhaWxhYmxlKFwibG9jYWxTdG9yYWdlXCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkxvY2FsIHN0b3JhZ2UgaXMgYXZhaWxhYmxlXCIpO1xuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiTG9jYWwgc3RvcmFnZSBpcyB1bmF2YWlsYWJsZSBieSBzb21lIHJlYXNvbi4gQ2hlY2sgaWYgaXQgaXMgZnVsbCwgb3IgaWYgeW91ciBicm93c2VyIHN1cHBvcnRzIGl0XCJcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH1cblxuICBnZXRWYWx1ZShrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG59XG4iLCJjb25zdCBEQVRBX0tJTkRTID0ge1xuICBjdXJyZW50OiAwLFxuICBkYXk6IDEsXG59O1xuXG5mdW5jdGlvbiBtZXRlcnNQZXJIb3VyVG9NZXRlcnNQZXJTZWNvbmQobXBoKSB7XG4gIGNvbnN0IG1wcyA9IG1waCAvIDM2MDA7XG4gIHJldHVybiBtcHMudG9GaXhlZCgyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVxdWlyZWREYXRhR2V0dGVyIHtcbiAgZ2V0UmVxdWlyZWRXZWF0aGVyRGF0YSh7IGRhdGEsIHJlbmRlcmluZ1BhcmFtZXRlcnMgfSkge1xuICAgIGNvbnN0IHJlcXVpcmVkRGF0YSA9IHtcbiAgICAgIGNvdW50cnk6IGRhdGEubG9jYXRpb24uY291bnRyeSxcbiAgICAgIGxvY2FsVGltZTogZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUsXG4gICAgICBuYW1lOiBkYXRhLmxvY2F0aW9uLm5hbWUsXG4gICAgICByZWdpb246IGRhdGEubG9jYXRpb24ucmVnaW9uLFxuICAgICAgY29uZGl0aW9uOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQsXG4gICAgICBmb3JlY2FzdERheXM6IFtdLFxuICAgIH07XG5cbiAgICBjb25zdCBleGFjdERhdGFQYXJhbWV0ZXJzID0ge1xuICAgICAgcmVuZGVyaW5nUGFyYW1ldGVycyxcbiAgICAgIHJlcXVpcmVkRGF0YU9iamVjdDogcmVxdWlyZWREYXRhLFxuICAgICAgYWxsRGF0YTogZGF0YSxcbiAgICAgIGRhdGFLaW5kOiBEQVRBX0tJTkRTLmN1cnJlbnQsXG4gICAgfTtcblxuICAgIHRoaXMuI3NldFNwZWVkUmVsYXRlZFBhcmFtcyhleGFjdERhdGFQYXJhbWV0ZXJzKTtcbiAgICB0aGlzLiNzZXRUZW1wZXJhdHVyZVJlbGF0ZWRQYXJhbXMoZXhhY3REYXRhUGFyYW1ldGVycyk7XG4gICAgdGhpcy4jc2V0UHJlc3N1cmVSZWxhdGVkUGFyYW1zKGV4YWN0RGF0YVBhcmFtZXRlcnMpO1xuICAgIHRoaXMuI3NldFByZWNpcGl0YXRpb25SZWxhdGVkUGFyYW1zKGV4YWN0RGF0YVBhcmFtZXRlcnMpO1xuICAgIHRoaXMuI3NldEZvcmVjYXN0UGFyYW1zKGV4YWN0RGF0YVBhcmFtZXRlcnMpO1xuICAgIHJldHVybiByZXF1aXJlZERhdGE7XG4gIH1cblxuICAjc2V0U3BlZWRSZWxhdGVkUGFyYW1zKHtcbiAgICBhbGxEYXRhLFxuICAgIHJlbmRlcmluZ1BhcmFtZXRlcnMsXG4gICAgcmVxdWlyZWREYXRhT2JqZWN0LFxuICAgIGRhdGFLaW5kLFxuICB9KSB7XG4gICAgc3dpdGNoIChyZW5kZXJpbmdQYXJhbWV0ZXJzLnNwZWVkKSB7XG4gICAgICBjYXNlIFwia3BoXCI6XG4gICAgICAgIHJlcXVpcmVkRGF0YU9iamVjdC5ndXN0ID0gYWxsRGF0YS5jdXJyZW50Lmd1c3Rfa3BoO1xuICAgICAgICByZXF1aXJlZERhdGFPYmplY3Qud2luZF9zcGVlZCA9IGFsbERhdGEuY3VycmVudC53aW5kX2twaDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibXBzXCI6XG4gICAgICAgIHJlcXVpcmVkRGF0YU9iamVjdC5ndXN0ID0gbWV0ZXJzUGVySG91clRvTWV0ZXJzUGVyU2Vjb25kKFxuICAgICAgICAgIGFsbERhdGEuY3VycmVudC5ndXN0X21waFxuICAgICAgICApO1xuICAgICAgICByZXF1aXJlZERhdGFPYmplY3Qud2luZF9zcGVlZCA9IG1ldGVyc1BlckhvdXJUb01ldGVyc1BlclNlY29uZChcbiAgICAgICAgICBhbGxEYXRhLmN1cnJlbnQud2luZF9tcGhcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibXBoXCI6XG4gICAgICAgIHJlcXVpcmVkRGF0YU9iamVjdC5ndXN0ID0gYWxsRGF0YS5jdXJyZW50Lmd1c3RfbXBoO1xuICAgICAgICByZXF1aXJlZERhdGFPYmplY3Qud2luZF9zcGVlZCA9IGFsbERhdGEuY3VycmVudC53aW5kX21waDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgI3NldFRlbXBlcmF0dXJlUmVsYXRlZFBhcmFtcyh7XG4gICAgYWxsRGF0YSxcbiAgICByZW5kZXJpbmdQYXJhbWV0ZXJzLFxuICAgIHJlcXVpcmVkRGF0YU9iamVjdCxcbiAgICBkYXRhS2luZCxcbiAgfSkge1xuICAgIGlmIChkYXRhS2luZCA9PT0gREFUQV9LSU5EUy5jdXJyZW50KSB7XG4gICAgICBzd2l0Y2ggKHJlbmRlcmluZ1BhcmFtZXRlcnMudGVtcGVyYXR1cmUpIHtcbiAgICAgICAgY2FzZSBcInRlbXBfY1wiOlxuICAgICAgICAgIHJlcXVpcmVkRGF0YU9iamVjdC5mZWVsc2xpa2UgPSBhbGxEYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2M7XG4gICAgICAgICAgcmVxdWlyZWREYXRhT2JqZWN0LnRlbXAgPSBhbGxEYXRhLmN1cnJlbnQudGVtcF9jO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGVtcF9mXCI6XG4gICAgICAgICAgcmVxdWlyZWREYXRhT2JqZWN0LmZlZWxzbGlrZSA9IGFsbERhdGEuY3VycmVudC5mZWVsc2xpa2VfZjtcbiAgICAgICAgICByZXF1aXJlZERhdGFPYmplY3QudGVtcCA9IGFsbERhdGEuY3VycmVudC50ZW1wX2Y7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkYXRhS2luZCA9PT0gREFUQV9LSU5EUy5kYXkpIHtcbiAgICAgIHN3aXRjaCAocmVuZGVyaW5nUGFyYW1ldGVycy50ZW1wZXJhdHVyZSkge1xuICAgICAgICBjYXNlIFwidGVtcF9jXCI6XG4gICAgICAgICAgcmVxdWlyZWREYXRhT2JqZWN0Lm1heHRlbXAgPSBhbGxEYXRhLmRheS5tYXh0ZW1wX2M7XG4gICAgICAgICAgcmVxdWlyZWREYXRhT2JqZWN0Lm1pbnRlbXAgPSBhbGxEYXRhLmRheS5taW50ZW1wX2M7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0ZW1wX2ZcIjpcbiAgICAgICAgICByZXF1aXJlZERhdGFPYmplY3QubWF4dGVtcCA9IGFsbERhdGEuZGF5Lm1heHRlbXBfZjtcbiAgICAgICAgICByZXF1aXJlZERhdGFPYmplY3QubWludGVtcCA9IGFsbERhdGEuZGF5Lm1pbnRlbXBfZjtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAjc2V0UHJlc3N1cmVSZWxhdGVkUGFyYW1zKHtcbiAgICBhbGxEYXRhLFxuICAgIHJlbmRlcmluZ1BhcmFtZXRlcnMsXG4gICAgcmVxdWlyZWREYXRhT2JqZWN0LFxuICB9KSB7XG4gICAgcmVxdWlyZWREYXRhT2JqZWN0LnByZXNzdXJlID0gYWxsRGF0YS5jdXJyZW50W3JlbmRlcmluZ1BhcmFtZXRlcnMucHJlc3N1cmVdO1xuICB9XG5cbiAgI3NldFByZWNpcGl0YXRpb25SZWxhdGVkUGFyYW1zKHtcbiAgICBhbGxEYXRhLFxuICAgIHJlbmRlcmluZ1BhcmFtZXRlcnMsXG4gICAgcmVxdWlyZWREYXRhT2JqZWN0LFxuICB9KSB7XG4gICAgcmVxdWlyZWREYXRhT2JqZWN0LnByZWNpcGl0YXRpb24gPVxuICAgICAgYWxsRGF0YS5jdXJyZW50W3JlbmRlcmluZ1BhcmFtZXRlcnMucHJlY2lwaXRhdGlvbl07XG4gIH1cblxuICAjc2V0Rm9yZWNhc3RQYXJhbXMoeyBhbGxEYXRhLCByZW5kZXJpbmdQYXJhbWV0ZXJzLCByZXF1aXJlZERhdGFPYmplY3QgfSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsRGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWxsRGF5RGF0YSA9IGFsbERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV07XG4gICAgICBjb25zdCByZXF1aXJlZERheURhdGEgPSB7XG4gICAgICAgIGNvbmRpdGlvbjogYWxsRGF5RGF0YS5kYXkuY29uZGl0aW9uLnRleHQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLiNzZXRUZW1wZXJhdHVyZVJlbGF0ZWRQYXJhbXMoe1xuICAgICAgICBhbGxEYXRhOiBhbGxEYXlEYXRhLFxuICAgICAgICByZW5kZXJpbmdQYXJhbWV0ZXJzLFxuICAgICAgICByZXF1aXJlZERhdGFPYmplY3Q6IHJlcXVpcmVkRGF5RGF0YSxcbiAgICAgICAgZGF0YUtpbmQ6IERBVEFfS0lORFMuZGF5LFxuICAgICAgfSk7XG5cbiAgICAgIHJlcXVpcmVkRGF0YU9iamVjdC5mb3JlY2FzdERheXMucHVzaChyZXF1aXJlZERheURhdGEpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFRyYW5zbGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzdGF0aWNUZXh0VHJhbnNsYXRpb25zLCBpbnB1dFRyYW5zbGF0aW9ucykge1xuICAgIHRoaXMuc3RhdGljVGV4dFRyYW5zbGF0aW9ucyA9IHN0YXRpY1RleHRUcmFuc2xhdGlvbnM7XG4gICAgdGhpcy5pbnB1dFRyYW5zbGF0aW9ucyA9IGlucHV0VHJhbnNsYXRpb25zO1xuICB9XG5cbiAgdHJhbnNsYXRlVGV4dChsYW5ndWFnZSkge1xuICAgIGZvciAobGV0IFtxdWVyeSwgdHJhbnNsYXRpb25zXSBvZiBPYmplY3QuZW50cmllcyhcbiAgICAgIHRoaXMuc3RhdGljVGV4dFRyYW5zbGF0aW9uc1xuICAgICkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbnNbbGFuZ3VhZ2VdO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdHJhbnNsYXRpb247XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBgQ291bGRuJ3QgdHJhbnNsYXRlIGVsZW1lbnQgd2l0aCBxdWVyeSAke3F1ZXJ5fSB0byAke3RyYW5zbGF0aW9uc1tsYW5ndWFnZV19YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBBcHAgZnJvbSBcIi4vY2xhc3Nlcy9hcHBcIjtcblxuKCgpID0+IHtcbiAgY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICBhcHAuc2V0dXAoKTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=