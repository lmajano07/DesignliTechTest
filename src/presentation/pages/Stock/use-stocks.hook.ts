import { useState, useEffect } from "react";

import { Stock } from "@domain/entities";

import { getStockPrices } from "@actions/get-prices.action";

export const useStocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stockWatchlist = [
      "AAPL",
      "GOOG",
      "AMZN",
      "MSFT",
      "TSLA",
      "META",
      "NFLX",
      "NVDA",
      "AMD",
      "INTC",
      "SPY",
      "BABA",
      "DIS",
      "BA",
      "V",
      "PYPL",
      "CSCO",
      "IBM",
      "NKE",
      "KO",
      "PEP",
      "JNJ",
      "PFE",
      "MRK",
      "MCD",
    ];

    setIsLoading(true);
    setError(null);

    const fetchStockData = async () => {
      try {
        const stocks = await getStockPrices(stockWatchlist);
        setStocks(stocks);
      } catch (err: any) {
        setError("Failed to load stocks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return {
    stocks,
    isLoading,
    error,
  };
};
