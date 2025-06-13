import { HttpAdapter } from "@config/adapters/http";
import { MarketStatus } from "@domain/entities";
import { StocksMapper } from "@infrastructure/mappers";
import { MarketStatusResponse } from "@infrastructure/interfaces";

export const GetMarketStatusUseCases = async (
  fetcher: HttpAdapter
): Promise<MarketStatus> => {
  try {
    // ENDPOINT RETURNING INCORRECT DATA
    const marketResponse = await fetcher.get<MarketStatusResponse>(
      "stock/market-status",
      {
        token: process.env.API_KEY,
      }
    );

    const currentMarketStatus =
      StocksMapper.marketStatusResultToEntity(marketResponse);

    return currentMarketStatus;
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return { market: "", isOpen: false };
  }
};
