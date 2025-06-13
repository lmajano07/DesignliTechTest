import { AxiosAdapter } from "./http";

export const stocksAPIFetcher = (symbol: string = "") => {
  return new AxiosAdapter({
    baseURL: process.env.API_URL,
    params: {
      exchange: "US",
      symbol: symbol,
      token: process.env.API_KEY,
    },
  });
};
