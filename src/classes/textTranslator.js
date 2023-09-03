export default class TextTranslator {
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
