import { HttpAdapter } from "@config/adapters/http";

import type { Stock } from "@domain/entities";
import { StocksMapper } from "@infrastructure/mappers";

import type { StockListResponse } from "@infrastructure/interfaces";

export const getStocksUseCase = async (
  fetcher: HttpAdapter
): Promise<Stock[]> => {
  try {
    const stocksResponse = await fetcher.get<StockListResponse[]>(
      "stock/symbol",
      {
        exchange: "US",
        token: process.env.API_KEY,
      }
    );

    const stocks = stocksResponse.map(StocksMapper.stocksResultToEntity);

    return stocks;
  } catch (error) {
    console.error(`Couldn't load stocks: ${error}`);
    return [];
  }
};
