import TextTranslator from "./textTranslator";
import LocalStorageManager from "./localStorageManager";
import InputGetter from "./inputGetter";
import URLMaker from "./URLMaker";
import DataFetcher from "./dataFetcher";
import ErrorNotifier from "./errorNotifier";
import JsonParser from "./jsonParser";

export default class App {
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

  constructor() {
    this.localStorageManager = new LocalStorageManager();
    this.textTranslator = new TextTranslator(this.TEXT_TRANSLATIONS, null);
    this.inputGetter = new InputGetter();
    this.urlMaker = new URLMaker(this.URL_TYPES);
    this.dataFetcher = new DataFetcher();
    this.errorNotifier = new ErrorNotifier();
    this.jsonParser = new JsonParser();
  }

  async getDataOfURLType(inputValues, URLType) {
    const fetchURL = this.urlMaker.makeURL(inputValues, URLType);

    const response = await this.dataFetcher.fetchData(fetchURL);
    const data = await this.jsonParser.parseJson(response);
    return data;
  }

  setup() {
    const languageSelect = document.getElementById("language");
    const submitButton = document.querySelector("button[type='submit']");
    const weatherForm = document.getElementById("weather-form");
    const errorNotificationElement =
      document.getElementById("error-notification");
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
        console.log(inputValues);

        const currentWeatherData = await this.getDataOfURLType(
          inputValues,
          this.URL_TYPES.current
        );
        const forecastWeatherData = await this.getDataOfURLType(
          inputValues,
          this.URL_TYPES.forecast
        );
        console.log(currentWeatherData, forecastWeatherData);
      }
    });
  }
}
