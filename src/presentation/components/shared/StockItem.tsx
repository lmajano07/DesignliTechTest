import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Stock } from "@src/domain/entities";

interface StockListProps {
  stock: Stock;
}

const StockItem = ({ stock }: StockListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>{stock.symbol}</Text>
      <Text style={styles.price}>${stock.currentPrice?.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
  },
  symbol: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "green",
  },
});

export default StockItem;
