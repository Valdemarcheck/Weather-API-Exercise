export default class JsonParser {
  async parseJson(responsePromise) {
    return await responsePromise.json();
  }
}
