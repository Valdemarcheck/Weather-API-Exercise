export default class JsonParser {
  parseJson(responsePromise) {
    return responsePromise.json();
  }
}
