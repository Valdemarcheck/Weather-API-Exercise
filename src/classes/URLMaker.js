export default class URLMaker {
  constructor(URLTypes) {
    this.URLTypes = URLTypes;
  }

  makeURL(inputValues, URLType) {
    const key = process.env.API_KEY;
    const location = inputValues.location;
    const language = inputValues.language;

    const URLPath = `https://api.weatherapi.com/v1${URLType}`;
    let URLParameters = `key=${key}&q=${location}`;
    if (language !== "en") {
      URLParameters += `&lang=${language}`;
    }
    if (URLType === this.URLTypes.forecast) {
      URLParameters += "&days=7";
    }

    return URLPath + "?" + URLParameters;
  }
}
