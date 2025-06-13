import { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";

import { Stock } from "@src/domain/entities";

import { useStockWebSocket } from "./use-web-socket.hook";
import StockCard from "@src/presentation/components/shared/StockCard";

const WatchlistPage = () => {
  const [symbols] = useState<string[]>([
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
    "WMT",
    "HD",
    "LOW",
    "T",
    "VZ",
    "SQ",
    "LULU",
    "GM",
    "F",
    "BA",
    "GS",
    "JPM",
    "C",
    "AXP",
    "MS",
  ]);

  const { stocks, marketStatus } = useStockWebSocket(symbols);

  const renderItem = ({ item }: { item: Stock }) => (
    <StockCard
      symbol={item.symbol ?? ""}
      name={item.name ?? ""}
      price={item.currentPrice ?? 0}
      changePercentage={item.changePercentage ?? 0}
    />
  );

  if (!marketStatus.isOpen) {
    return (
      <View style={styles.container}>
        <Text>Market is closed. Please try again later</Text>
      </View>
    );
  }

  if (stocks.length === 0 && marketStatus.isOpen) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stocks}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol ?? ""}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 12,
  },
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    marginVertical: 5,
  },
  change: {
    fontSize: 14,
  },
});

export default WatchlistPage;
