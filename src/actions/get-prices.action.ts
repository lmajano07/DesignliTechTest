import { stocksAPIFetcher } from "@config/adapters";

import { Stock } from "@domain/entities";

import { getBySymbolUseCase } from "@use-cases/get-by-symbol.use-case";

export const getStockPrices = async (symbols: string[]): Promise<Stock[]> => {
  const fetchedData: Stock[] = [];

  for (let symbol of symbols) {
    try {
      const currentStock = await getBySymbolUseCase(
        stocksAPIFetcher(symbol),
        symbol
      );
      const currentPrice = currentStock.currentPrice ?? 0;
      fetchedData.push({ symbol, currentPrice });
    } catch (error) {
      console.error(`Couldn't get price for ${symbol}: ${error}`);
    }
  }

  return fetchedData;
};
