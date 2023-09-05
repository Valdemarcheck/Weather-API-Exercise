export default class DataFetcher {
  fetchData(url) {
    return fetch(url, { mode: "cors" });
  }
}
