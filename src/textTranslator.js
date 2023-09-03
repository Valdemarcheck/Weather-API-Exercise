export default class TextTranslator {
  constructor(textTranslations) {
    this.textTranslations = textTranslations;
  }

  translateText(language) {
    for (let [query, translations] of Object.entries(this.textTranslations)) {
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
