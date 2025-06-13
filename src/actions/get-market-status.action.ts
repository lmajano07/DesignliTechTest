import { stocksAPIFetcher } from "@config/adapters";

import { MarketStatus } from "@domain/entities";

import { getMarketStatusUseCase } from "@use-cases/get-market-status.use-case";

export const getStockMarketStatus = async (): Promise<MarketStatus> => {
  try {
    const marketStatus = await getMarketStatusUseCase(stocksAPIFetcher());

    return marketStatus;
  } catch (error) {
    console.error(`Couldn't get market status: ${error}`);
    return { market: "", isOpen: false };
  }
};
