import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";

import { Stock } from "@domain/entities";

import StockItem from "../shared/StockItem";

interface StockListProps {
  stocks: Stock[];
}

const StockList = ({ stocks: stocks }: StockListProps) => {
  return (
    <>
      <Text style={styles.title}>Stocks List</Text>
      <ScrollView>
        {stocks.map((stock, index) => (
          <StockItem key={index} stock={stock} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  stockContainer: {
    backgroundColor: "#f6f6f6",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 8,
  },
});

export default StockList;
