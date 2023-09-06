export default class URLMaker {
  makeURL(inputValues) {
    const key = process.env.API_KEY;
    const location = inputValues.location;
    const language = inputValues.language;

    const URLPath = `https://api.weatherapi.com/v1/forecast.json`;
    let URLParameters = `key=${key}&q=${location}&days=7`;
    if (language !== "en") {
      URLParameters += `&lang=${language}`;
    }

    return URLPath + "?" + URLParameters;
  }
}
