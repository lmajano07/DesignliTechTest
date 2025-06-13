import React from "react";

import { View, Text, StyleSheet } from "react-native";

export interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  changePercentage: number;
}

const StockCard = ({
  symbol,
  name,
  price,
  changePercentage,
}: StockCardProps) => (
  <View style={styles.card}>
    <Text style={styles.name}>
      {name} ({symbol})
    </Text>
    <Text style={styles.value}>${price.toFixed(2)}</Text>
    <Text
      style={[
        styles.change,
        changePercentage >= 0 ? styles.onPositive : styles.onNegative,
      ]}
    >
      {changePercentage >= 0
        ? `+${changePercentage.toFixed(2)}%`
        : `${changePercentage.toFixed(2)}%`}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    marginVertical: 8,
  },
  change: {
    fontSize: 12,
  },
  onPositive: {
    color: "green",
  },
  onNegative: {
    color: "red",
  },
});

export default StockCard;
