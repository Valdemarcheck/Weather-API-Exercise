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




class App {
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
    return inputs.reduce((valuesObject, input) => {
      console.log(input.id, input.value);
      valuesObject[input.id] = input.value || null;
    }, {});
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
//# sourceMappingURL=main.js.map