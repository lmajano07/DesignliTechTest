import type { MarketStatus, Stock } from "@domain/entities";
import type {
  MarketStatusResponse,
  StockListResponse,
  StockResponse,
} from "@infrastructure/interfaces";

export class StocksMapper {
  static stocksResultToEntity(result: StockListResponse): Stock {
    return {
      symbol: result.symbol,
      name: result.description,
    };
  }

  static stockResultToEntity(result: StockResponse, symbol: string): Stock {
    return {
      symbol: symbol,
      currentPrice: result.c,
    };
  }
  static marketStatusResultToEntity(
    result: MarketStatusResponse
  ): MarketStatus {
    return {
      market: result.exchange,
      isOpen: result.isOpen,
    };
  }
}
