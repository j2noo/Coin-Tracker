const BASE_URL = "https://api.coinpaprika.com/v1";

//json data의 promise를 리턴해야한다!
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());

  // 또는
  // const response = await fetch("https://api.coinpaprika.com/v1/coins");
  // const json = await response.json();
  // return json
}
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) => response.json());
}
