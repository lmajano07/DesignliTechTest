import { HttpAdapter } from "@config/adapters/http";

import { Stock } from "@domain/entities";

import { StocksMapper } from "@infrastructure/mappers";
import { StockResponse } from "@infrastructure/interfaces";

export const getBySymbolUseCase = async (
  fetcher: HttpAdapter,
  symbol: string
): Promise<Stock> => {
  try {
    const stockResponse = await fetcher.get<StockResponse>("quote", {
      symbol: symbol,
      token: process.env.API_KEY,
    });

    const stock = StocksMapper.stockResultToEntity(stockResponse, symbol);

    return stock;
  } catch (error) {
    console.error(`Couldn't load stock: ${error}`);
    return {};
  }
};
