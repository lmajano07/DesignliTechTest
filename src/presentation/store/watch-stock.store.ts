import { Stock } from "@src/domain/entities";
import { create } from "zustand";

interface WatchStoreState {
  stocks: Stock[];
  addStock: (stock: Stock) => void;
  clearStocks: () => void;
}

export const useWatchStockStore = create<WatchStoreState>()((set) => ({
  stocks: [],
  clearStocks: () => {
    set({ stocks: [] });
  },
  addStock: (stock: Stock) => {
    set((state) => {
      const stockExists = state.stocks.some(
        (existingStock) => existingStock.symbol === stock.symbol
      );
      if (stockExists) {
        return state;
      } else {
        return {
          stocks: [...state.stocks, stock],
        };
      }
    });
  },
}));
