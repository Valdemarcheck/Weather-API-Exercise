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
// import KEY from "./key";

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
        console.log(`Response: ${response}`);
        const data = await jsonParser.parseJson(response);
        console.log(`Data: ${data}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9zdHlsZXMuY3NzPzE1NTMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9VUkxNYWtlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL2FwcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL2RhdGFGZXRjaGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvZXJyb3JOb3RpZmllci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL2lucHV0R2V0dGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvanNvblBhcnNlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL2xvY2FsU3RvcmFnZU1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy90ZXh0VHJhbnNsYXRvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGltcG9ydCBLRVkgZnJvbSBcIi4va2V5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVSTE1ha2VyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG1ha2VVUkwoaW5wdXRWYWx1ZXMsIFVSTFR5cGUpIHtcbiAgICBjb25zdCBrZXkgPSBwcm9jZXNzLmVudi5BUElfS0VZO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gaW5wdXRWYWx1ZXMubG9jYXRpb247XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBpbnB1dFZhbHVlcy5sYW5ndWFnZTtcblxuICAgIGNvbnN0IFVSTFBhdGggPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEke1VSTFR5cGV9YDtcbiAgICBsZXQgVVJMUGFyYW1ldGVycyA9IGBrZXk9JHtrZXl9JnE9JHtsb2NhdGlvbn1gO1xuICAgIGlmIChsYW5ndWFnZSAhPT0gXCJlblwiKSB7XG4gICAgICBVUkxQYXJhbWV0ZXJzICs9IGAmbGFuZz0ke2xhbmd1YWdlfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIFVSTFBhdGggKyBcIj9cIiArIFVSTFBhcmFtZXRlcnM7XG4gIH1cbn1cbiIsImltcG9ydCBUZXh0VHJhbnNsYXRvciBmcm9tIFwiLi90ZXh0VHJhbnNsYXRvclwiO1xuaW1wb3J0IExvY2FsU3RvcmFnZU1hbmFnZXIgZnJvbSBcIi4vbG9jYWxTdG9yYWdlTWFuYWdlclwiO1xuaW1wb3J0IElucHV0R2V0dGVyIGZyb20gXCIuL2lucHV0R2V0dGVyXCI7XG5pbXBvcnQgVVJMTWFrZXIgZnJvbSBcIi4vVVJMTWFrZXJcIjtcbmltcG9ydCBEYXRhRmV0Y2hlciBmcm9tIFwiLi9kYXRhRmV0Y2hlclwiO1xuaW1wb3J0IEVycm9yTm90aWZpZXIgZnJvbSBcIi4vZXJyb3JOb3RpZmllclwiO1xuaW1wb3J0IEpzb25QYXJzZXIgZnJvbSBcIi4vanNvblBhcnNlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuICBVUkxfVFlQRVMgPSB7XG4gICAgY3VycmVudDogXCIvY3VycmVudC5qc29uXCIsXG4gICAgZm9yZWNhc3Q6IFwiL2ZvcmVjYXN0Lmpzb25cIixcbiAgfTtcbiAgVEVYVF9UUkFOU0xBVElPTlMgPSB7XG4gICAgXCJmb3JtI3NldHRpbmdzPi5oZWFkZXJcIjoge1xuICAgICAgcnU6IFwi0J3QsNGB0YLRgNC+0LnQutC4XCIsXG4gICAgICBlbjogXCJTZXR0aW5nc1wiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cImxhbmd1YWdlXCJdJzoge1xuICAgICAgcnU6IFwi0K/Qt9GL0LpcIixcbiAgICAgIGVuOiBcIkxhbmd1YWdlXCIsXG4gICAgfSxcbiAgICAnbGFiZWxbZm9yPVwic3BlZWRcIl0nOiB7XG4gICAgICBydTogXCLQodC60L7RgNC+0YHRgtGMXCIsXG4gICAgICBlbjogXCJTcGVlZFwiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cInRlbXBlcmF0dXJlXCJdJzoge1xuICAgICAgcnU6IFwi0KLQtdC80L/QtdGA0LDRgtGD0YDQsFwiLFxuICAgICAgZW46IFwiVGVtcGVyYXR1cmVcIixcbiAgICB9LFxuICAgICdsYWJlbFtmb3I9XCJwcmVzc3VyZVwiXSc6IHtcbiAgICAgIHJ1OiBcItCU0LDQstC70LXQvdC40LVcIixcbiAgICAgIGVuOiBcIlByZXNzdXJlXCIsXG4gICAgfSxcbiAgICAnbGFiZWxbZm9yPVwicHJlY2lwaXRhdGlvblwiXSc6IHtcbiAgICAgIHJ1OiBcItCe0YHQsNC00LrQuFwiLFxuICAgICAgZW46IFwiUHJlY2lwaXRhdGlvblwiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cImxvY2F0aW9uXCJdJzoge1xuICAgICAgcnU6IFwi0JPQvtGA0L7QtCDQuNC70Lgg0YHRgtGA0LDQvdCwXCIsXG4gICAgICBlbjogXCJDaXR5IG9yIGNvdW50cnlcIixcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXR1cCgpIHtcbiAgICBjb25zdCBsYW5ndWFnZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZ3VhZ2VcIik7XG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblt0eXBlPSdzdWJtaXQnXVwiKTtcbiAgICBjb25zdCB3ZWF0aGVyRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1mb3JtXCIpO1xuICAgIGNvbnN0IGVycm9yTm90aWZpY2F0aW9uRWxlbWVudCA9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLW5vdGlmaWNhdGlvblwiKTtcbiAgICBjb25zdCBpbnB1dHMgPSBbbGFuZ3VhZ2VTZWxlY3QsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIildO1xuXG4gICAgY29uc3QgbG9jYWxTdG9yYWdlTWFuYWdlciA9IG5ldyBMb2NhbFN0b3JhZ2VNYW5hZ2VyKCk7XG4gICAgY29uc3QgdGV4dFRyYW5zbGF0b3IgPSBuZXcgVGV4dFRyYW5zbGF0b3IodGhpcy5URVhUX1RSQU5TTEFUSU9OUywgbnVsbCk7XG4gICAgY29uc3QgaW5wdXRHZXR0ZXIgPSBuZXcgSW5wdXRHZXR0ZXIoKTtcbiAgICBjb25zdCB1cmxNYWtlciA9IG5ldyBVUkxNYWtlcigpO1xuICAgIGNvbnN0IGRhdGFGZXRjaGVyID0gbmV3IERhdGFGZXRjaGVyKCk7XG4gICAgY29uc3QgZXJyb3JOb3RpZmllciA9IG5ldyBFcnJvck5vdGlmaWVyKCk7XG4gICAgY29uc3QganNvblBhcnNlciA9IG5ldyBKc29uUGFyc2VyKCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlTWFuYWdlci5nZXRWYWx1ZShcImxhbmd1YWdlXCIpKSB7XG4gICAgICBjb25zdCBsYW5ndWFnZSA9IGxvY2FsU3RvcmFnZU1hbmFnZXIuZ2V0VmFsdWUoXCJsYW5ndWFnZVwiKTtcbiAgICAgIHRleHRUcmFuc2xhdG9yLnRyYW5zbGF0ZVRleHQobGFuZ3VhZ2UpO1xuICAgICAgbGFuZ3VhZ2VTZWxlY3QudmFsdWUgPSBsYW5ndWFnZTtcbiAgICB9XG5cbiAgICBsYW5ndWFnZVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIHRleHRUcmFuc2xhdG9yLnRyYW5zbGF0ZVRleHQobGFuZ3VhZ2VTZWxlY3QudmFsdWUpO1xuICAgICAgbG9jYWxTdG9yYWdlTWFuYWdlci5zZXRWYWx1ZShcImxhbmd1YWdlXCIsIGxhbmd1YWdlU2VsZWN0LnZhbHVlKTtcbiAgICB9KTtcblxuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcbiAgICAgIGlmICh3ZWF0aGVyRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBpbnB1dFZhbHVlcyA9IGlucHV0R2V0dGVyLmdldFVSTElucHV0VmFsdWVzKGlucHV0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGlucHV0VmFsdWVzKTtcblxuICAgICAgICBjb25zdCBjdXJyZW50V2VhdGhlclVSTCA9IHVybE1ha2VyLm1ha2VVUkwoXG4gICAgICAgICAgaW5wdXRWYWx1ZXMsXG4gICAgICAgICAgdGhpcy5VUkxfVFlQRVMuY3VycmVudFxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50V2VhdGhlclVSTCk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhRmV0Y2hlci5mZXRjaERhdGEoY3VycmVudFdlYXRoZXJVUkwpO1xuICAgICAgICBjb25zb2xlLmxvZyhgUmVzcG9uc2U6ICR7cmVzcG9uc2V9YCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBqc29uUGFyc2VyLnBhcnNlSnNvbihyZXNwb25zZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEYXRhOiAke2RhdGF9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFGZXRjaGVyIHtcbiAgZmV0Y2hEYXRhKHVybCkge1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHsgbW9kZTogXCJjb3JzXCIgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yTm90aWZpZXIge1xuICBUSU1FT1VUX1RJTUVfTVMgPSA1MDAwO1xuXG4gIG5vdGlmeUVycm9yKG5vdGlmeURpdiwgZXJyb3JNZXNzYWdlKSB7XG4gICAgbm90aWZ5RGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgY29uc3Qgbm90aWZ5RGl2VGV4dCA9IG5vdGlmeURpdi5xdWVyeVNlbGVjdG9yKFwicFwiKTtcbiAgICBub3RpZnlEaXZUZXh0LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBub3RpZnlEaXYuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB9LCB0aGlzLlRJTUVPVVRfVElNRV9NUyk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0R2V0dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldFVSTElucHV0VmFsdWVzKGlucHV0cykge1xuICAgIGNvbnN0IGlucHV0VmFsdWVzID0ge307XG4gICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICBpbnB1dFZhbHVlc1tpbnB1dC5pZF0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5wdXRWYWx1ZXM7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEpzb25QYXJzZXIge1xuICBwYXJzZUpzb24ocmVzcG9uc2VQcm9taXNlKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlUHJvbWlzZS5qc29uKCk7XG4gIH1cbn1cbiIsImZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICBsZXQgc3RvcmFnZTtcbiAgdHJ5IHtcbiAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgIGNvbnN0IHggPSBcIl9fc3RvcmFnZV90ZXN0X19cIjtcbiAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiZcbiAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgIChlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gXCJRdW90YUV4Y2VlZGVkRXJyb3JcIiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gXCJOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRFwiKSAmJlxuICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgIHN0b3JhZ2UgJiZcbiAgICAgIHN0b3JhZ2UubGVuZ3RoICE9PSAwXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhbFN0b3JhZ2VNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKHN0b3JhZ2VBdmFpbGFibGUoXCJsb2NhbFN0b3JhZ2VcIikpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9jYWwgc3RvcmFnZSBpcyBhdmFpbGFibGVcIik7XG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJMb2NhbCBzdG9yYWdlIGlzIHVuYXZhaWxhYmxlIGJ5IHNvbWUgcmVhc29uLiBDaGVjayBpZiBpdCBpcyBmdWxsLCBvciBpZiB5b3VyIGJyb3dzZXIgc3VwcG9ydHMgaXRcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfVxuXG4gIGdldFZhbHVlKGtleSkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRUcmFuc2xhdG9yIHtcbiAgY29uc3RydWN0b3Ioc3RhdGljVGV4dFRyYW5zbGF0aW9ucywgaW5wdXRUcmFuc2xhdGlvbnMpIHtcbiAgICB0aGlzLnN0YXRpY1RleHRUcmFuc2xhdGlvbnMgPSBzdGF0aWNUZXh0VHJhbnNsYXRpb25zO1xuICAgIHRoaXMuaW5wdXRUcmFuc2xhdGlvbnMgPSBpbnB1dFRyYW5zbGF0aW9ucztcbiAgfVxuXG4gIHRyYW5zbGF0ZVRleHQobGFuZ3VhZ2UpIHtcbiAgICBmb3IgKGxldCBbcXVlcnksIHRyYW5zbGF0aW9uc10gb2YgT2JqZWN0LmVudHJpZXMoXG4gICAgICB0aGlzLnN0YXRpY1RleHRUcmFuc2xhdGlvbnNcbiAgICApKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb25zW2xhbmd1YWdlXTtcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHRyYW5zbGF0aW9uO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYENvdWxkbid0IHRyYW5zbGF0ZSBlbGVtZW50IHdpdGggcXVlcnkgJHtxdWVyeX0gdG8gJHt0cmFuc2xhdGlvbnNbbGFuZ3VhZ2VdfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMuY3NzXCI7XG5pbXBvcnQgQXBwIGZyb20gXCIuL2NsYXNzZXMvYXBwXCI7XG5cbigoKSA9PiB7XG4gIGNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbiAgYXBwLnNldHVwKCk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9