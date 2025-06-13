import { useState, useEffect } from "react";

import { MarketStatus, Stock } from "@domain/entities";

import { useWatchStockStore } from "@src/presentation/store/watch-stock.store";

const getStockName = (symbol: string): string => {
  const stockNames: { [key: string]: string } = {
    AAPL: "Apple",
    GOOG: "Google",
    AMZN: "Amazon",
    MSFT: "Microsoft",
    TSLA: "Tesla",
    META: "Meta Platforms",
    NFLX: "Netflix",
    NVDA: "Nvidia",
    AMD: "Advanced Micro Devices",
    INTC: "Intel",
    SPY: "SPDR S&P 500 ETF",
    BABA: "Alibaba",
    DIS: "Walt Disney",
    BA: "Boeing",
    V: "Visa",
    PYPL: "PayPal",
    CSCO: "Cisco",
    IBM: "IBM",
    NKE: "Nike",
    KO: "Coca-Cola",
    PEP: "PepsiCo",
    JNJ: "Johnson & Johnson",
    PFE: "Pfizer",
    MRK: "Merck",
    MCD: "McDonald's",
    WMT: "Walmart",
    HD: "Home Depot",
    LOW: "Lowe's",
    T: "AT&T",
    VZ: "Verizon",
    SQ: "Square",
    LULU: "Lululemon",
    GM: "General Motors",
    F: "Ford",
    GS: "Goldman Sachs",
    JPM: "JPMorgan Chase",
    C: "Citigroup",
    AXP: "American Express",
    MS: "Morgan Stanley",
  };
  return stockNames[symbol] || symbol;
};

export const useStockWebSocket = (symbols: string[]) => {
  const [_socket, setSocket] = useState<WebSocket | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [marketStatus, _setMarketStatus] = useState<MarketStatus>({
    market: "US",
    isOpen: true,
  });
  const stockList = useWatchStockStore((state) => state.stocks);

  useEffect(() => {
    const socketConnection = new WebSocket(
      `${process.env.SOCKET_URL}?token=${process.env.API_KEY}`
    );

    socketConnection.onopen = () => {
      symbols.forEach((stock) => {
        socketConnection.send(
          JSON.stringify({
            type: "subscribe",
            symbol: stock,
          })
        );
      });
    };

    socketConnection.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (
          message.type === "trade" &&
          message.data &&
          message.data.length > 0
        ) {
          const trade = message.data[0];
          const symbol = trade.s;
          const price = trade.p;

          setStocks((prevStocks) => {
            const existingStockIndex = prevStocks.findIndex(
              (stock) => stock.symbol === symbol
            );

            if (existingStockIndex !== -1) {
              const existingStock = prevStocks[existingStockIndex];

              const previousPrice = existingStock.previousPrice ?? price;

              const changePercentage =
                previousPrice !== 0
                  ? ((price - previousPrice) / previousPrice) * 100
                  : 0;

              const updatedStock = {
                ...existingStock,
                previousPrice: price,
                currentPrice: price,
                changePercentage: changePercentage,
              };

              const updatedStocks = [...prevStocks];
              updatedStocks[existingStockIndex] = updatedStock;

              const stockInStockList = stockList.find(
                (stock) => stock.symbol === symbol
              );
              if (stockInStockList && stockInStockList.currentPrice !== price) {
                stockInStockList.currentPrice = price;
              }

              return updatedStocks;
            } else {
              const name = getStockName(symbol);
              return [
                ...prevStocks,
                {
                  symbol,
                  name,
                  currentPrice: price,
                  previousPrice: price,
                  changePercentage: 0,
                },
              ];
            }
          });
        }
      } catch (error) {
        console.error(`WebSocket error: ${error}`);
      }
    };

    socketConnection.onerror = (error) => {
      console.error(`WebSocket Connection Error: ${error}`);
    };

    socketConnection.onclose = () => {};

    setSocket(socketConnection);

    return () => {
      if (socketConnection) {
        socketConnection.close();
      }
    };
  }, [symbols, stockList]);

  return { stocks, marketStatus };
};
