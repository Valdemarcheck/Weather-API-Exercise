import TextTranslator from "./textTranslator";
import LocalStorageManager from "./localStorageManager";
import InputGetter from "./inputGetter";
import URLMaker from "./URLMaker";
import DataFetcher from "./dataFetcher";
import ErrorNotifier from "./errorNotifier";
import JsonParser from "./jsonParser";
import DataRenderer from "./dataRenderer";
import RequiredDataGetter from "./requiredDataGetter";

const URL_TYPES = {
  current: "/current.json",
  forecast: "/forecast.json",
};
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
export default class App {
  constructor() {
    const objectsToRenderInsideOf = {
      current: document.getElementById("current-forecast-div"),
      forecast: document.getElementById("weekly-forecast-div"),
    };

    this.localStorageManager = new LocalStorageManager();
    this.textTranslator = new TextTranslator(TEXT_TRANSLATIONS, null);
    this.inputGetter = new InputGetter();
    this.urlMaker = new URLMaker(URL_TYPES);
    this.dataFetcher = new DataFetcher();
    this.errorNotifier = new ErrorNotifier();
    this.jsonParser = new JsonParser();
    this.dataRenderer = new DataRenderer(objectsToRenderInsideOf);
    this.requiredDataGetter = new RequiredDataGetter();
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

        this.dataRenderer.renderWeather({
          data: requiredData,
          renderingParameters,
        });
      }
    });
  }
}
