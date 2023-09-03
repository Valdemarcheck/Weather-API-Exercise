export default class DataFetcher {
  async fetchData(url) {
    return await fetch(url, { mode: "no-cors" });
  }
}
