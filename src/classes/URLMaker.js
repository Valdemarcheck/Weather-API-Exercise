// import "dotenv/config";
import KEY from "./key";

export default class URLMaker {
  constructor() {}

  makeURL(inputValues, URLType) {
    // const key = process.env.API_KEY;
    const location = inputValues.location;
    const language = inputValues.language;

    const URLPath = `https://api.weatherapi.com/v1${URLType}`;
    const URLParameters = `key=${KEY}&q=${location}&lang=${language}`;

    return URLPath + "?" + URLParameters;
  }
}
