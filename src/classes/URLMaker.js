// import KEY from "./key";

export default class URLMaker {
  constructor() {}

  makeURL(inputValues, URLType) {
    const key = process.env.API_KEY;
    const location = inputValues.location;
    const language = inputValues.language;

    const URLPath = `http://api.weatherapi.com/v1${URLType}`;
    let URLParameters = `key=${key}&q=${location}`;
    if (language !== "en") {
      URLParameters += `&lang=${language}`;
    }

    return URLPath + "?" + URLParameters;
  }
}
