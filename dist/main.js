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

/***/ "./src/classes/PubSub.js":
/*!*******************************!*\
  !*** ./src/classes/PubSub.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PubSub = (() => {
  const NOT_PRESENT_IN_THE_ARRAY = -1;
  const events = {};

  function debugEventAnnounce(event) {
    console.log(`[debug] EVENT ${event} IS CALLED`);
  }

  function emit(event, param = null) {
    if (events[event]) {
      debugEventAnnounce(event);
      for (let func of events[event]) {
        func(param);
      }
    } else {
      alert(`There is no event with a name '${event}'`);
    }
  }

  function on(event, func) {
    if (events[event]) {
      events[event].push(func);
    } else {
      events[event] = [func];
    }
  }

  function off(event, func) {
    if (events[event]) {
      const indexOfGivenFunction = events[event].indexOf(func);
      if (indexOfGivenFunction !== NOT_PRESENT_IN_THE_ARRAY) {
        events[event].splice(indexOfGivenFunction, 1);
      }
    } else {
      alert(
        `There is either no such event (${event}) registered, or your function isn't present there`
      );
    }
  }

  return { emit, on, off };
})());


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
    const URLParameters = `key=${key}&q=${location}&lang=${language}`;

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

    if (localStorageManager.getValue("language")) {
      const language = localStorageManager.getValue("language");
      textTranslator.translateText(language);
      languageSelect.value = language;
    }

    languageSelect.addEventListener("change", () => {
      textTranslator.translateText(languageSelect.value);
      localStorageManager.setValue("language", languageSelect.value);
    });

    submitButton.addEventListener("click", (e) => {
      if (weatherForm.checkValidity()) {
        e.preventDefault();
        const inputValues = inputGetter.getURLInputValues(inputs);
        console.log(inputValues);

        const currentWeatherURL = urlMaker.makeURL(
          inputValues,
          this.URL_TYPES.current
        );
        console.log(currentWeatherURL);

        dataFetcher.fetchData(currentWeatherURL).catch((err) => {
          errorNotifier.notifyError(errorNotificationElement, err);
        });
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
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PubSub */ "./src/classes/PubSub.js");


class DataFetcher {
  async fetchData(url) {
    try {
      await fetch(url, { mode: "no-cors" });
    } catch (err) {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].emit("fetchError", err);
    }
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
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PubSub */ "./src/classes/PubSub.js");


class ErrorNotifier {
  TIMEOUT_TIME_MS = 5000;

  constructor() {
    _PubSub__WEBPACK_IMPORTED_MODULE_0__["default"].on("fetchError", this.notifyError.bind(this));
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNCO0FBQ1U7O0FBRWhDO0FBQ0Esa0JBQWtCLG9EQUFHO0FBQ3JCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL3N0eWxlcy5jc3M/MTU1MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL1B1YlN1Yi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL1VSTE1ha2VyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvYXBwLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvZGF0YUZldGNoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9lcnJvck5vdGlmaWVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvaW5wdXRHZXR0ZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9sb2NhbFN0b3JhZ2VNYW5hZ2VyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvdGV4dFRyYW5zbGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCBQdWJTdWIgPSAoKCkgPT4ge1xuICBjb25zdCBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkgPSAtMTtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgZnVuY3Rpb24gZGVidWdFdmVudEFubm91bmNlKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtkZWJ1Z10gRVZFTlQgJHtldmVudH0gSVMgQ0FMTEVEYCk7XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2ZW50LCBwYXJhbSA9IG51bGwpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgZGVidWdFdmVudEFubm91bmNlKGV2ZW50KTtcbiAgICAgIGZvciAobGV0IGZ1bmMgb2YgZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICBmdW5jKHBhcmFtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoYFRoZXJlIGlzIG5vIGV2ZW50IHdpdGggYSBuYW1lICcke2V2ZW50fSdgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbihldmVudCwgZnVuYykge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBldmVudHNbZXZlbnRdLnB1c2goZnVuYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50c1tldmVudF0gPSBbZnVuY107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGNvbnN0IGluZGV4T2ZHaXZlbkZ1bmN0aW9uID0gZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZ1bmMpO1xuICAgICAgaWYgKGluZGV4T2ZHaXZlbkZ1bmN0aW9uICE9PSBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkpIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50XS5zcGxpY2UoaW5kZXhPZkdpdmVuRnVuY3Rpb24sIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcbiAgICAgICAgYFRoZXJlIGlzIGVpdGhlciBubyBzdWNoIGV2ZW50ICgke2V2ZW50fSkgcmVnaXN0ZXJlZCwgb3IgeW91ciBmdW5jdGlvbiBpc24ndCBwcmVzZW50IHRoZXJlYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBlbWl0LCBvbiwgb2ZmIH07XG59KSgpO1xuIiwiLy8gaW1wb3J0IEtFWSBmcm9tIFwiLi9rZXlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVVJMTWFrZXIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbWFrZVVSTChpbnB1dFZhbHVlcywgVVJMVHlwZSkge1xuICAgIGNvbnN0IGtleSA9IHByb2Nlc3MuZW52LkFQSV9LRVk7XG4gICAgY29uc3QgbG9jYXRpb24gPSBpbnB1dFZhbHVlcy5sb2NhdGlvbjtcbiAgICBjb25zdCBsYW5ndWFnZSA9IGlucHV0VmFsdWVzLmxhbmd1YWdlO1xuXG4gICAgY29uc3QgVVJMUGF0aCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MSR7VVJMVHlwZX1gO1xuICAgIGNvbnN0IFVSTFBhcmFtZXRlcnMgPSBga2V5PSR7a2V5fSZxPSR7bG9jYXRpb259Jmxhbmc9JHtsYW5ndWFnZX1gO1xuXG4gICAgcmV0dXJuIFVSTFBhdGggKyBcIj9cIiArIFVSTFBhcmFtZXRlcnM7XG4gIH1cbn1cbiIsImltcG9ydCBUZXh0VHJhbnNsYXRvciBmcm9tIFwiLi90ZXh0VHJhbnNsYXRvclwiO1xuaW1wb3J0IExvY2FsU3RvcmFnZU1hbmFnZXIgZnJvbSBcIi4vbG9jYWxTdG9yYWdlTWFuYWdlclwiO1xuaW1wb3J0IElucHV0R2V0dGVyIGZyb20gXCIuL2lucHV0R2V0dGVyXCI7XG5pbXBvcnQgVVJMTWFrZXIgZnJvbSBcIi4vVVJMTWFrZXJcIjtcbmltcG9ydCBEYXRhRmV0Y2hlciBmcm9tIFwiLi9kYXRhRmV0Y2hlclwiO1xuaW1wb3J0IEVycm9yTm90aWZpZXIgZnJvbSBcIi4vZXJyb3JOb3RpZmllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuICBVUkxfVFlQRVMgPSB7XG4gICAgY3VycmVudDogXCIvY3VycmVudC5qc29uXCIsXG4gICAgZm9yZWNhc3Q6IFwiL2ZvcmVjYXN0Lmpzb25cIixcbiAgfTtcbiAgVEVYVF9UUkFOU0xBVElPTlMgPSB7XG4gICAgXCJmb3JtI3NldHRpbmdzPi5oZWFkZXJcIjoge1xuICAgICAgcnU6IFwi0J3QsNGB0YLRgNC+0LnQutC4XCIsXG4gICAgICBlbjogXCJTZXR0aW5nc1wiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cImxhbmd1YWdlXCJdJzoge1xuICAgICAgcnU6IFwi0K/Qt9GL0LpcIixcbiAgICAgIGVuOiBcIkxhbmd1YWdlXCIsXG4gICAgfSxcbiAgICAnbGFiZWxbZm9yPVwic3BlZWRcIl0nOiB7XG4gICAgICBydTogXCLQodC60L7RgNC+0YHRgtGMXCIsXG4gICAgICBlbjogXCJTcGVlZFwiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cInRlbXBlcmF0dXJlXCJdJzoge1xuICAgICAgcnU6IFwi0KLQtdC80L/QtdGA0LDRgtGD0YDQsFwiLFxuICAgICAgZW46IFwiVGVtcGVyYXR1cmVcIixcbiAgICB9LFxuICAgICdsYWJlbFtmb3I9XCJwcmVzc3VyZVwiXSc6IHtcbiAgICAgIHJ1OiBcItCU0LDQstC70LXQvdC40LVcIixcbiAgICAgIGVuOiBcIlByZXNzdXJlXCIsXG4gICAgfSxcbiAgICAnbGFiZWxbZm9yPVwicHJlY2lwaXRhdGlvblwiXSc6IHtcbiAgICAgIHJ1OiBcItCe0YHQsNC00LrQuFwiLFxuICAgICAgZW46IFwiUHJlY2lwaXRhdGlvblwiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cImxvY2F0aW9uXCJdJzoge1xuICAgICAgcnU6IFwi0JPQvtGA0L7QtCDQuNC70Lgg0YHRgtGA0LDQvdCwXCIsXG4gICAgICBlbjogXCJDaXR5IG9yIGNvdW50cnlcIixcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXR1cCgpIHtcbiAgICBjb25zdCBsYW5ndWFnZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZ3VhZ2VcIik7XG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblt0eXBlPSdzdWJtaXQnXVwiKTtcbiAgICBjb25zdCB3ZWF0aGVyRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1mb3JtXCIpO1xuICAgIGNvbnN0IGVycm9yTm90aWZpY2F0aW9uRWxlbWVudCA9XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yLW5vdGlmaWNhdGlvblwiKTtcbiAgICBjb25zdCBpbnB1dHMgPSBbbGFuZ3VhZ2VTZWxlY3QsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIildO1xuXG4gICAgY29uc3QgbG9jYWxTdG9yYWdlTWFuYWdlciA9IG5ldyBMb2NhbFN0b3JhZ2VNYW5hZ2VyKCk7XG4gICAgY29uc3QgdGV4dFRyYW5zbGF0b3IgPSBuZXcgVGV4dFRyYW5zbGF0b3IodGhpcy5URVhUX1RSQU5TTEFUSU9OUywgbnVsbCk7XG4gICAgY29uc3QgaW5wdXRHZXR0ZXIgPSBuZXcgSW5wdXRHZXR0ZXIoKTtcbiAgICBjb25zdCB1cmxNYWtlciA9IG5ldyBVUkxNYWtlcigpO1xuICAgIGNvbnN0IGRhdGFGZXRjaGVyID0gbmV3IERhdGFGZXRjaGVyKCk7XG4gICAgY29uc3QgZXJyb3JOb3RpZmllciA9IG5ldyBFcnJvck5vdGlmaWVyKCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlTWFuYWdlci5nZXRWYWx1ZShcImxhbmd1YWdlXCIpKSB7XG4gICAgICBjb25zdCBsYW5ndWFnZSA9IGxvY2FsU3RvcmFnZU1hbmFnZXIuZ2V0VmFsdWUoXCJsYW5ndWFnZVwiKTtcbiAgICAgIHRleHRUcmFuc2xhdG9yLnRyYW5zbGF0ZVRleHQobGFuZ3VhZ2UpO1xuICAgICAgbGFuZ3VhZ2VTZWxlY3QudmFsdWUgPSBsYW5ndWFnZTtcbiAgICB9XG5cbiAgICBsYW5ndWFnZVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIHRleHRUcmFuc2xhdG9yLnRyYW5zbGF0ZVRleHQobGFuZ3VhZ2VTZWxlY3QudmFsdWUpO1xuICAgICAgbG9jYWxTdG9yYWdlTWFuYWdlci5zZXRWYWx1ZShcImxhbmd1YWdlXCIsIGxhbmd1YWdlU2VsZWN0LnZhbHVlKTtcbiAgICB9KTtcblxuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmICh3ZWF0aGVyRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBpbnB1dFZhbHVlcyA9IGlucHV0R2V0dGVyLmdldFVSTElucHV0VmFsdWVzKGlucHV0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGlucHV0VmFsdWVzKTtcblxuICAgICAgICBjb25zdCBjdXJyZW50V2VhdGhlclVSTCA9IHVybE1ha2VyLm1ha2VVUkwoXG4gICAgICAgICAgaW5wdXRWYWx1ZXMsXG4gICAgICAgICAgdGhpcy5VUkxfVFlQRVMuY3VycmVudFxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50V2VhdGhlclVSTCk7XG5cbiAgICAgICAgZGF0YUZldGNoZXIuZmV0Y2hEYXRhKGN1cnJlbnRXZWF0aGVyVVJMKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgZXJyb3JOb3RpZmllci5ub3RpZnlFcnJvcihlcnJvck5vdGlmaWNhdGlvbkVsZW1lbnQsIGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUHViU3ViIGZyb20gXCIuL1B1YlN1YlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhRmV0Y2hlciB7XG4gIGFzeW5jIGZldGNoRGF0YSh1cmwpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZmV0Y2godXJsLCB7IG1vZGU6IFwibm8tY29yc1wiIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgUHViU3ViLmVtaXQoXCJmZXRjaEVycm9yXCIsIGVycik7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUHViU3ViIGZyb20gXCIuL1B1YlN1YlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcnJvck5vdGlmaWVyIHtcbiAgVElNRU9VVF9USU1FX01TID0gNTAwMDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBQdWJTdWIub24oXCJmZXRjaEVycm9yXCIsIHRoaXMubm90aWZ5RXJyb3IuYmluZCh0aGlzKSk7XG4gIH1cblxuICBub3RpZnlFcnJvcihub3RpZnlEaXYsIGVycm9yTWVzc2FnZSkge1xuICAgIG5vdGlmeURpdi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIGNvbnN0IG5vdGlmeURpdlRleHQgPSBub3RpZnlEaXYucXVlcnlTZWxlY3RvcihcInBcIik7XG4gICAgbm90aWZ5RGl2VGV4dC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG5vdGlmeURpdi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH0sIHRoaXMuVElNRU9VVF9USU1FX01TKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRHZXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0VVJMSW5wdXRWYWx1ZXMoaW5wdXRzKSB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB7fTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0LmlkXSA9IGlucHV0LnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnB1dFZhbHVlcztcbiAgfVxufVxuIiwiZnVuY3Rpb24gc3RvcmFnZUF2YWlsYWJsZSh0eXBlKSB7XG4gIGxldCBzdG9yYWdlO1xuICB0cnkge1xuICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgY29uc3QgeCA9IFwiX19zdG9yYWdlX3Rlc3RfX1wiO1xuICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJlxuICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgKGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCIpICYmXG4gICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgc3RvcmFnZSAmJlxuICAgICAgc3RvcmFnZS5sZW5ndGggIT09IDBcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2FsU3RvcmFnZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoc3RvcmFnZUF2YWlsYWJsZShcImxvY2FsU3RvcmFnZVwiKSkge1xuICAgICAgY29uc29sZS5sb2coXCJMb2NhbCBzdG9yYWdlIGlzIGF2YWlsYWJsZVwiKTtcbiAgICAgIHRoaXMubG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkxvY2FsIHN0b3JhZ2UgaXMgdW5hdmFpbGFibGUgYnkgc29tZSByZWFzb24uIENoZWNrIGlmIGl0IGlzIGZ1bGwsIG9yIGlmIHlvdXIgYnJvd3NlciBzdXBwb3J0cyBpdFwiXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0VmFsdWUoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFRyYW5zbGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzdGF0aWNUZXh0VHJhbnNsYXRpb25zLCBpbnB1dFRyYW5zbGF0aW9ucykge1xuICAgIHRoaXMuc3RhdGljVGV4dFRyYW5zbGF0aW9ucyA9IHN0YXRpY1RleHRUcmFuc2xhdGlvbnM7XG4gICAgdGhpcy5pbnB1dFRyYW5zbGF0aW9ucyA9IGlucHV0VHJhbnNsYXRpb25zO1xuICB9XG5cbiAgdHJhbnNsYXRlVGV4dChsYW5ndWFnZSkge1xuICAgIGZvciAobGV0IFtxdWVyeSwgdHJhbnNsYXRpb25zXSBvZiBPYmplY3QuZW50cmllcyhcbiAgICAgIHRoaXMuc3RhdGljVGV4dFRyYW5zbGF0aW9uc1xuICAgICkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbnNbbGFuZ3VhZ2VdO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdHJhbnNsYXRpb247XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBgQ291bGRuJ3QgdHJhbnNsYXRlIGVsZW1lbnQgd2l0aCBxdWVyeSAke3F1ZXJ5fSB0byAke3RyYW5zbGF0aW9uc1tsYW5ndWFnZV19YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBBcHAgZnJvbSBcIi4vY2xhc3Nlcy9hcHBcIjtcblxuKCgpID0+IHtcbiAgY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICBhcHAuc2V0dXAoKTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=