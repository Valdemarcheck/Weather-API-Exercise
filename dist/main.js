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
  constructor() {}

  makeURL(inputValues, URLType) {
    const key = "260c4809042c47adb5375013232708";
    const location = inputValues.location;
    const language = inputValues.language;

    const URLPath = `https://api.weatherapi.com/v1${URLType}`;
    let URLParameters = `key=${key}&q=${location}`;
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








class App {
  URL_TYPES = {
    current: "/current.json",
    forecast: "/forecast.json",
  };
  TEXT_TRANSLATIONS = {
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

  constructor() {}

  setup() {
    const languageSelect = document.getElementById("language");
    const submitButton = document.querySelector("button[type='submit']");
    const weatherForm = document.getElementById("weather-form");
    const errorNotificationElement =
      document.getElementById("error-notification");
    const inputs = [languageSelect, document.getElementById("location")];

    const localStorageManager = new _localStorageManager__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const textTranslator = new _textTranslator__WEBPACK_IMPORTED_MODULE_0__["default"](this.TEXT_TRANSLATIONS, null);
    const inputGetter = new _inputGetter__WEBPACK_IMPORTED_MODULE_2__["default"]();
    const urlMaker = new _URLMaker__WEBPACK_IMPORTED_MODULE_3__["default"]();
    const dataFetcher = new _dataFetcher__WEBPACK_IMPORTED_MODULE_4__["default"]();
    const errorNotifier = new _errorNotifier__WEBPACK_IMPORTED_MODULE_5__["default"]();
    const jsonParser = new _jsonParser__WEBPACK_IMPORTED_MODULE_6__["default"]();

    if (localStorageManager.getValue("language")) {
      const language = localStorageManager.getValue("language");
      textTranslator.translateText(language);
      languageSelect.value = language;
    }

    languageSelect.addEventListener("change", () => {
      textTranslator.translateText(languageSelect.value);
      localStorageManager.setValue("language", languageSelect.value);
    });

    submitButton.addEventListener("click", async (e) => {
      if (weatherForm.checkValidity()) {
        e.preventDefault();
        const inputValues = inputGetter.getURLInputValues(inputs);
        console.log(inputValues);

        const currentWeatherURL = urlMaker.makeURL(
          inputValues,
          this.URL_TYPES.current
        );
        console.log(currentWeatherURL);

        const response = await dataFetcher.fetchData(currentWeatherURL);
        console.log(response);
        const data = await jsonParser.parseJson(response);
        console.log(data);
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

  getURLInputValues(inputs) {
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmMvc3R5bGVzLmNzcz8xNTUzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvVVJMTWFrZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9hcHAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9kYXRhRmV0Y2hlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL2Vycm9yTm90aWZpZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9pbnB1dEdldHRlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL2pzb25QYXJzZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9sb2NhbFN0b3JhZ2VNYW5hZ2VyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvdGV4dFRyYW5zbGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVUkxNYWtlciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBtYWtlVVJMKGlucHV0VmFsdWVzLCBVUkxUeXBlKSB7XG4gICAgY29uc3Qga2V5ID0gcHJvY2Vzcy5lbnYuQVBJX0tFWTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGlucHV0VmFsdWVzLmxvY2F0aW9uO1xuICAgIGNvbnN0IGxhbmd1YWdlID0gaW5wdXRWYWx1ZXMubGFuZ3VhZ2U7XG5cbiAgICBjb25zdCBVUkxQYXRoID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxJHtVUkxUeXBlfWA7XG4gICAgbGV0IFVSTFBhcmFtZXRlcnMgPSBga2V5PSR7a2V5fSZxPSR7bG9jYXRpb259YDtcbiAgICBpZiAobGFuZ3VhZ2UgIT09IFwiZW5cIikge1xuICAgICAgVVJMUGFyYW1ldGVycyArPSBgJmxhbmc9JHtsYW5ndWFnZX1gO1xuICAgIH1cblxuICAgIHJldHVybiBVUkxQYXRoICsgXCI/XCIgKyBVUkxQYXJhbWV0ZXJzO1xuICB9XG59XG4iLCJpbXBvcnQgVGV4dFRyYW5zbGF0b3IgZnJvbSBcIi4vdGV4dFRyYW5zbGF0b3JcIjtcbmltcG9ydCBMb2NhbFN0b3JhZ2VNYW5hZ2VyIGZyb20gXCIuL2xvY2FsU3RvcmFnZU1hbmFnZXJcIjtcbmltcG9ydCBJbnB1dEdldHRlciBmcm9tIFwiLi9pbnB1dEdldHRlclwiO1xuaW1wb3J0IFVSTE1ha2VyIGZyb20gXCIuL1VSTE1ha2VyXCI7XG5pbXBvcnQgRGF0YUZldGNoZXIgZnJvbSBcIi4vZGF0YUZldGNoZXJcIjtcbmltcG9ydCBFcnJvck5vdGlmaWVyIGZyb20gXCIuL2Vycm9yTm90aWZpZXJcIjtcbmltcG9ydCBKc29uUGFyc2VyIGZyb20gXCIuL2pzb25QYXJzZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcbiAgVVJMX1RZUEVTID0ge1xuICAgIGN1cnJlbnQ6IFwiL2N1cnJlbnQuanNvblwiLFxuICAgIGZvcmVjYXN0OiBcIi9mb3JlY2FzdC5qc29uXCIsXG4gIH07XG4gIFRFWFRfVFJBTlNMQVRJT05TID0ge1xuICAgIFwiZm9ybSNzZXR0aW5ncz4uaGVhZGVyXCI6IHtcbiAgICAgIHJ1OiBcItCd0LDRgdGC0YDQvtC50LrQuFwiLFxuICAgICAgZW46IFwiU2V0dGluZ3NcIixcbiAgICB9LFxuICAgICdsYWJlbFtmb3I9XCJsYW5ndWFnZVwiXSc6IHtcbiAgICAgIHJ1OiBcItCv0LfRi9C6XCIsXG4gICAgICBlbjogXCJMYW5ndWFnZVwiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cInNwZWVkXCJdJzoge1xuICAgICAgcnU6IFwi0KHQutC+0YDQvtGB0YLRjFwiLFxuICAgICAgZW46IFwiU3BlZWRcIixcbiAgICB9LFxuICAgICdsYWJlbFtmb3I9XCJ0ZW1wZXJhdHVyZVwiXSc6IHtcbiAgICAgIHJ1OiBcItCi0LXQvNC/0LXRgNCw0YLRg9GA0LBcIixcbiAgICAgIGVuOiBcIlRlbXBlcmF0dXJlXCIsXG4gICAgfSxcbiAgICAnbGFiZWxbZm9yPVwicHJlc3N1cmVcIl0nOiB7XG4gICAgICBydTogXCLQlNCw0LLQu9C10L3QuNC1XCIsXG4gICAgICBlbjogXCJQcmVzc3VyZVwiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cInByZWNpcGl0YXRpb25cIl0nOiB7XG4gICAgICBydTogXCLQntGB0LDQtNC60LhcIixcbiAgICAgIGVuOiBcIlByZWNpcGl0YXRpb25cIixcbiAgICB9LFxuICAgICdsYWJlbFtmb3I9XCJsb2NhdGlvblwiXSc6IHtcbiAgICAgIHJ1OiBcItCT0L7RgNC+0LQg0LjQu9C4INGB0YLRgNCw0L3QsFwiLFxuICAgICAgZW46IFwiQ2l0eSBvciBjb3VudHJ5XCIsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgc2V0dXAoKSB7XG4gICAgY29uc3QgbGFuZ3VhZ2VTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmd1YWdlXCIpO1xuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25bdHlwZT0nc3VibWl0J11cIik7XG4gICAgY29uc3Qgd2VhdGhlckZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItZm9ybVwiKTtcbiAgICBjb25zdCBlcnJvck5vdGlmaWNhdGlvbkVsZW1lbnQgPVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvci1ub3RpZmljYXRpb25cIik7XG4gICAgY29uc3QgaW5wdXRzID0gW2xhbmd1YWdlU2VsZWN0LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpXTtcblxuICAgIGNvbnN0IGxvY2FsU3RvcmFnZU1hbmFnZXIgPSBuZXcgTG9jYWxTdG9yYWdlTWFuYWdlcigpO1xuICAgIGNvbnN0IHRleHRUcmFuc2xhdG9yID0gbmV3IFRleHRUcmFuc2xhdG9yKHRoaXMuVEVYVF9UUkFOU0xBVElPTlMsIG51bGwpO1xuICAgIGNvbnN0IGlucHV0R2V0dGVyID0gbmV3IElucHV0R2V0dGVyKCk7XG4gICAgY29uc3QgdXJsTWFrZXIgPSBuZXcgVVJMTWFrZXIoKTtcbiAgICBjb25zdCBkYXRhRmV0Y2hlciA9IG5ldyBEYXRhRmV0Y2hlcigpO1xuICAgIGNvbnN0IGVycm9yTm90aWZpZXIgPSBuZXcgRXJyb3JOb3RpZmllcigpO1xuICAgIGNvbnN0IGpzb25QYXJzZXIgPSBuZXcgSnNvblBhcnNlcigpO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZU1hbmFnZXIuZ2V0VmFsdWUoXCJsYW5ndWFnZVwiKSkge1xuICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBsb2NhbFN0b3JhZ2VNYW5hZ2VyLmdldFZhbHVlKFwibGFuZ3VhZ2VcIik7XG4gICAgICB0ZXh0VHJhbnNsYXRvci50cmFuc2xhdGVUZXh0KGxhbmd1YWdlKTtcbiAgICAgIGxhbmd1YWdlU2VsZWN0LnZhbHVlID0gbGFuZ3VhZ2U7XG4gICAgfVxuXG4gICAgbGFuZ3VhZ2VTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICB0ZXh0VHJhbnNsYXRvci50cmFuc2xhdGVUZXh0KGxhbmd1YWdlU2VsZWN0LnZhbHVlKTtcbiAgICAgIGxvY2FsU3RvcmFnZU1hbmFnZXIuc2V0VmFsdWUoXCJsYW5ndWFnZVwiLCBsYW5ndWFnZVNlbGVjdC52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChlKSA9PiB7XG4gICAgICBpZiAod2VhdGhlckZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgaW5wdXRWYWx1ZXMgPSBpbnB1dEdldHRlci5nZXRVUkxJbnB1dFZhbHVlcyhpbnB1dHMpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbnB1dFZhbHVlcyk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudFdlYXRoZXJVUkwgPSB1cmxNYWtlci5tYWtlVVJMKFxuICAgICAgICAgIGlucHV0VmFsdWVzLFxuICAgICAgICAgIHRoaXMuVVJMX1RZUEVTLmN1cnJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudFdlYXRoZXJVUkwpO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YUZldGNoZXIuZmV0Y2hEYXRhKGN1cnJlbnRXZWF0aGVyVVJMKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQganNvblBhcnNlci5wYXJzZUpzb24ocmVzcG9uc2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YUZldGNoZXIge1xuICBmZXRjaERhdGEodXJsKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCwgeyBtb2RlOiBcImNvcnNcIiB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JOb3RpZmllciB7XG4gIFRJTUVPVVRfVElNRV9NUyA9IDUwMDA7XG5cbiAgbm90aWZ5RXJyb3Iobm90aWZ5RGl2LCBlcnJvck1lc3NhZ2UpIHtcbiAgICBub3RpZnlEaXYuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICBjb25zdCBub3RpZnlEaXZUZXh0ID0gbm90aWZ5RGl2LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpO1xuICAgIG5vdGlmeURpdlRleHQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5vdGlmeURpdi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH0sIHRoaXMuVElNRU9VVF9USU1FX01TKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRHZXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0VVJMSW5wdXRWYWx1ZXMoaW5wdXRzKSB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB7fTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0LmlkXSA9IGlucHV0LnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnB1dFZhbHVlcztcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnNvblBhcnNlciB7XG4gIHBhcnNlSnNvbihyZXNwb25zZVByb21pc2UpIHtcbiAgICByZXR1cm4gcmVzcG9uc2VQcm9taXNlLmpzb24oKTtcbiAgfVxufVxuIiwiZnVuY3Rpb24gc3RvcmFnZUF2YWlsYWJsZSh0eXBlKSB7XG4gIGxldCBzdG9yYWdlO1xuICB0cnkge1xuICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgY29uc3QgeCA9IFwiX19zdG9yYWdlX3Rlc3RfX1wiO1xuICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJlxuICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgKGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCIpICYmXG4gICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgc3RvcmFnZSAmJlxuICAgICAgc3RvcmFnZS5sZW5ndGggIT09IDBcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2FsU3RvcmFnZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoc3RvcmFnZUF2YWlsYWJsZShcImxvY2FsU3RvcmFnZVwiKSkge1xuICAgICAgY29uc29sZS5sb2coXCJMb2NhbCBzdG9yYWdlIGlzIGF2YWlsYWJsZVwiKTtcbiAgICAgIHRoaXMubG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkxvY2FsIHN0b3JhZ2UgaXMgdW5hdmFpbGFibGUgYnkgc29tZSByZWFzb24uIENoZWNrIGlmIGl0IGlzIGZ1bGwsIG9yIGlmIHlvdXIgYnJvd3NlciBzdXBwb3J0cyBpdFwiXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0VmFsdWUoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFRyYW5zbGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzdGF0aWNUZXh0VHJhbnNsYXRpb25zLCBpbnB1dFRyYW5zbGF0aW9ucykge1xuICAgIHRoaXMuc3RhdGljVGV4dFRyYW5zbGF0aW9ucyA9IHN0YXRpY1RleHRUcmFuc2xhdGlvbnM7XG4gICAgdGhpcy5pbnB1dFRyYW5zbGF0aW9ucyA9IGlucHV0VHJhbnNsYXRpb25zO1xuICB9XG5cbiAgdHJhbnNsYXRlVGV4dChsYW5ndWFnZSkge1xuICAgIGZvciAobGV0IFtxdWVyeSwgdHJhbnNsYXRpb25zXSBvZiBPYmplY3QuZW50cmllcyhcbiAgICAgIHRoaXMuc3RhdGljVGV4dFRyYW5zbGF0aW9uc1xuICAgICkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbnNbbGFuZ3VhZ2VdO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdHJhbnNsYXRpb247XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBgQ291bGRuJ3QgdHJhbnNsYXRlIGVsZW1lbnQgd2l0aCBxdWVyeSAke3F1ZXJ5fSB0byAke3RyYW5zbGF0aW9uc1tsYW5ndWFnZV19YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBBcHAgZnJvbSBcIi4vY2xhc3Nlcy9hcHBcIjtcblxuKCgpID0+IHtcbiAgY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICBhcHAuc2V0dXAoKTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=