import TextTranslator from "./textTranslator";

export default class App {
  constructor() {}

  setup() {
    const languageSelect = document.getElementById("language");
    const TEXT_TRANSLATIONS = {
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

    const textTranslator = new TextTranslator(TEXT_TRANSLATIONS);
    languageSelect.addEventListener("change", () => {
      textTranslator.translateText(languageSelect.value);
    });
  }
}
