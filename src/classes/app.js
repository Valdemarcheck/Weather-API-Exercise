import TextTranslator from "./textTranslator";
import LocalStorageManager from "./localStorageManager";
import InputGetter from "./inputGetter";

export default class App {
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

    const localStorageManager = new LocalStorageManager();
    const textTranslator = new TextTranslator(this.TEXT_TRANSLATIONS, null);
    const inputGetter = new InputGetter();

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
