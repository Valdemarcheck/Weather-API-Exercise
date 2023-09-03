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
// import "dotenv/config";

class URLMaker {
  constructor() {}

  makeURL(inputValues, URLType) {
    // const key = process.env.API_KEY;
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
    const inputs = [languageSelect, document.getElementById("location")];

    const localStorageManager = new _localStorageManager__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const textTranslator = new _textTranslator__WEBPACK_IMPORTED_MODULE_0__["default"](this.TEXT_TRANSLATIONS, null);
    const inputGetter = new _inputGetter__WEBPACK_IMPORTED_MODULE_2__["default"]();
    const urlMaker = new _URLMaker__WEBPACK_IMPORTED_MODULE_3__["default"]();

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
      e.preventDefault();
      const inputValues = inputGetter.getURLInputValues(inputs);
      console.log(inputValues);
      const currentWeatherURL = urlMaker.makeURL(
        inputValues,
        this.URL_TYPES.current
      );
      console.log(currentWeatherURL);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFFZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0RBQW9ELFFBQVE7QUFDNUQsaUNBQWlDLElBQUksS0FBSyxTQUFTLFFBQVEsU0FBUzs7QUFFcEU7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEI4QztBQUNVO0FBQ2hCO0FBQ047O0FBRW5CO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsNERBQW1CO0FBQ3ZELCtCQUErQix1REFBYztBQUM3Qyw0QkFBNEIsb0RBQVc7QUFDdkMseUJBQXlCLGlEQUFROztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNFZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzlDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxtREFBbUQsT0FBTyxLQUFLLHVCQUF1QjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDckJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNCO0FBQ1U7O0FBRWhDO0FBQ0Esa0JBQWtCLG9EQUFHO0FBQ3JCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL3N0eWxlcy5jc3M/MTU1MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9jbGFzc2VzL1VSTE1ha2VyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvYXBwLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvaW5wdXRHZXR0ZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2UvLi9zcmMvY2xhc3Nlcy9sb2NhbFN0b3JhZ2VNYW5hZ2VyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlLy4vc3JjL2NsYXNzZXMvdGV4dFRyYW5zbGF0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBpLWV4ZXJjaXNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcGktZXhlcmNpc2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS1leGVyY2lzZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBpbXBvcnQgXCJkb3RlbnYvY29uZmlnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVSTE1ha2VyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG1ha2VVUkwoaW5wdXRWYWx1ZXMsIFVSTFR5cGUpIHtcbiAgICAvLyBjb25zdCBrZXkgPSBwcm9jZXNzLmVudi5BUElfS0VZO1xuICAgIGNvbnN0IGtleSA9IFwiMjYwYzQ4MDkwNDJjNDdhZGI1Mzc1MDEzMjMyNzA4XCI7XG4gICAgY29uc3QgbG9jYXRpb24gPSBpbnB1dFZhbHVlcy5sb2NhdGlvbjtcbiAgICBjb25zdCBsYW5ndWFnZSA9IGlucHV0VmFsdWVzLmxhbmd1YWdlO1xuXG4gICAgY29uc3QgVVJMUGF0aCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MSR7VVJMVHlwZX1gO1xuICAgIGNvbnN0IFVSTFBhcmFtZXRlcnMgPSBga2V5PSR7a2V5fSZxPSR7bG9jYXRpb259Jmxhbmc9JHtsYW5ndWFnZX1gO1xuXG4gICAgcmV0dXJuIFVSTFBhdGggKyBcIj9cIiArIFVSTFBhcmFtZXRlcnM7XG4gIH1cbn1cbiIsImltcG9ydCBUZXh0VHJhbnNsYXRvciBmcm9tIFwiLi90ZXh0VHJhbnNsYXRvclwiO1xuaW1wb3J0IExvY2FsU3RvcmFnZU1hbmFnZXIgZnJvbSBcIi4vbG9jYWxTdG9yYWdlTWFuYWdlclwiO1xuaW1wb3J0IElucHV0R2V0dGVyIGZyb20gXCIuL2lucHV0R2V0dGVyXCI7XG5pbXBvcnQgVVJMTWFrZXIgZnJvbSBcIi4vVVJMTWFrZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcbiAgVVJMX1RZUEVTID0ge1xuICAgIGN1cnJlbnQ6IFwiL2N1cnJlbnQuanNvblwiLFxuICAgIGZvcmVjYXN0OiBcIi9mb3JlY2FzdC5qc29uXCIsXG4gIH07XG4gIFRFWFRfVFJBTlNMQVRJT05TID0ge1xuICAgIFwiZm9ybSNzZXR0aW5ncz4uaGVhZGVyXCI6IHtcbiAgICAgIHJ1OiBcItCd0LDRgdGC0YDQvtC50LrQuFwiLFxuICAgICAgZW46IFwiU2V0dGluZ3NcIixcbiAgICB9LFxuICAgICdsYWJlbFtmb3I9XCJsYW5ndWFnZVwiXSc6IHtcbiAgICAgIHJ1OiBcItCv0LfRi9C6XCIsXG4gICAgICBlbjogXCJMYW5ndWFnZVwiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cInNwZWVkXCJdJzoge1xuICAgICAgcnU6IFwi0KHQutC+0YDQvtGB0YLRjFwiLFxuICAgICAgZW46IFwiU3BlZWRcIixcbiAgICB9LFxuICAgICdsYWJlbFtmb3I9XCJ0ZW1wZXJhdHVyZVwiXSc6IHtcbiAgICAgIHJ1OiBcItCi0LXQvNC/0LXRgNCw0YLRg9GA0LBcIixcbiAgICAgIGVuOiBcIlRlbXBlcmF0dXJlXCIsXG4gICAgfSxcbiAgICAnbGFiZWxbZm9yPVwicHJlc3N1cmVcIl0nOiB7XG4gICAgICBydTogXCLQlNCw0LLQu9C10L3QuNC1XCIsXG4gICAgICBlbjogXCJQcmVzc3VyZVwiLFxuICAgIH0sXG4gICAgJ2xhYmVsW2Zvcj1cInByZWNpcGl0YXRpb25cIl0nOiB7XG4gICAgICBydTogXCLQntGB0LDQtNC60LhcIixcbiAgICAgIGVuOiBcIlByZWNpcGl0YXRpb25cIixcbiAgICB9LFxuICAgICdsYWJlbFtmb3I9XCJsb2NhdGlvblwiXSc6IHtcbiAgICAgIHJ1OiBcItCT0L7RgNC+0LQg0LjQu9C4INGB0YLRgNCw0L3QsFwiLFxuICAgICAgZW46IFwiQ2l0eSBvciBjb3VudHJ5XCIsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgc2V0dXAoKSB7XG4gICAgY29uc3QgbGFuZ3VhZ2VTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmd1YWdlXCIpO1xuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25bdHlwZT0nc3VibWl0J11cIik7XG4gICAgY29uc3QgaW5wdXRzID0gW2xhbmd1YWdlU2VsZWN0LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpXTtcblxuICAgIGNvbnN0IGxvY2FsU3RvcmFnZU1hbmFnZXIgPSBuZXcgTG9jYWxTdG9yYWdlTWFuYWdlcigpO1xuICAgIGNvbnN0IHRleHRUcmFuc2xhdG9yID0gbmV3IFRleHRUcmFuc2xhdG9yKHRoaXMuVEVYVF9UUkFOU0xBVElPTlMsIG51bGwpO1xuICAgIGNvbnN0IGlucHV0R2V0dGVyID0gbmV3IElucHV0R2V0dGVyKCk7XG4gICAgY29uc3QgdXJsTWFrZXIgPSBuZXcgVVJMTWFrZXIoKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2VNYW5hZ2VyLmdldFZhbHVlKFwibGFuZ3VhZ2VcIikpIHtcbiAgICAgIGNvbnN0IGxhbmd1YWdlID0gbG9jYWxTdG9yYWdlTWFuYWdlci5nZXRWYWx1ZShcImxhbmd1YWdlXCIpO1xuICAgICAgdGV4dFRyYW5zbGF0b3IudHJhbnNsYXRlVGV4dChsYW5ndWFnZSk7XG4gICAgICBsYW5ndWFnZVNlbGVjdC52YWx1ZSA9IGxhbmd1YWdlO1xuICAgIH1cblxuICAgIGxhbmd1YWdlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgdGV4dFRyYW5zbGF0b3IudHJhbnNsYXRlVGV4dChsYW5ndWFnZVNlbGVjdC52YWx1ZSk7XG4gICAgICBsb2NhbFN0b3JhZ2VNYW5hZ2VyLnNldFZhbHVlKFwibGFuZ3VhZ2VcIiwgbGFuZ3VhZ2VTZWxlY3QudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZXMgPSBpbnB1dEdldHRlci5nZXRVUkxJbnB1dFZhbHVlcyhpbnB1dHMpO1xuICAgICAgY29uc29sZS5sb2coaW5wdXRWYWx1ZXMpO1xuICAgICAgY29uc3QgY3VycmVudFdlYXRoZXJVUkwgPSB1cmxNYWtlci5tYWtlVVJMKFxuICAgICAgICBpbnB1dFZhbHVlcyxcbiAgICAgICAgdGhpcy5VUkxfVFlQRVMuY3VycmVudFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRXZWF0aGVyVVJMKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRHZXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0VVJMSW5wdXRWYWx1ZXMoaW5wdXRzKSB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMgPSB7fTtcbiAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0LmlkXSA9IGlucHV0LnZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnB1dFZhbHVlcztcbiAgfVxufVxuIiwiZnVuY3Rpb24gc3RvcmFnZUF2YWlsYWJsZSh0eXBlKSB7XG4gIGxldCBzdG9yYWdlO1xuICB0cnkge1xuICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgY29uc3QgeCA9IFwiX19zdG9yYWdlX3Rlc3RfX1wiO1xuICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJlxuICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgKGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCIpICYmXG4gICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgc3RvcmFnZSAmJlxuICAgICAgc3RvcmFnZS5sZW5ndGggIT09IDBcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2FsU3RvcmFnZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoc3RvcmFnZUF2YWlsYWJsZShcImxvY2FsU3RvcmFnZVwiKSkge1xuICAgICAgY29uc29sZS5sb2coXCJMb2NhbCBzdG9yYWdlIGlzIGF2YWlsYWJsZVwiKTtcbiAgICAgIHRoaXMubG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkxvY2FsIHN0b3JhZ2UgaXMgdW5hdmFpbGFibGUgYnkgc29tZSByZWFzb24uIENoZWNrIGlmIGl0IGlzIGZ1bGwsIG9yIGlmIHlvdXIgYnJvd3NlciBzdXBwb3J0cyBpdFwiXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0VmFsdWUoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFRyYW5zbGF0b3Ige1xuICBjb25zdHJ1Y3RvcihzdGF0aWNUZXh0VHJhbnNsYXRpb25zLCBpbnB1dFRyYW5zbGF0aW9ucykge1xuICAgIHRoaXMuc3RhdGljVGV4dFRyYW5zbGF0aW9ucyA9IHN0YXRpY1RleHRUcmFuc2xhdGlvbnM7XG4gICAgdGhpcy5pbnB1dFRyYW5zbGF0aW9ucyA9IGlucHV0VHJhbnNsYXRpb25zO1xuICB9XG5cbiAgdHJhbnNsYXRlVGV4dChsYW5ndWFnZSkge1xuICAgIGZvciAobGV0IFtxdWVyeSwgdHJhbnNsYXRpb25zXSBvZiBPYmplY3QuZW50cmllcyhcbiAgICAgIHRoaXMuc3RhdGljVGV4dFRyYW5zbGF0aW9uc1xuICAgICkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbnNbbGFuZ3VhZ2VdO1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdHJhbnNsYXRpb247XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBgQ291bGRuJ3QgdHJhbnNsYXRlIGVsZW1lbnQgd2l0aCBxdWVyeSAke3F1ZXJ5fSB0byAke3RyYW5zbGF0aW9uc1tsYW5ndWFnZV19YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcbmltcG9ydCBBcHAgZnJvbSBcIi4vY2xhc3Nlcy9hcHBcIjtcblxuKCgpID0+IHtcbiAgY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuICBhcHAuc2V0dXAoKTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=