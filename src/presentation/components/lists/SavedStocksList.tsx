import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Stock } from "@domain/entities";
import { ScrollView } from "react-native-gesture-handler";
import IconButton from "../shared/IconButton";

import { useWatchStockStore } from "@src/presentation/store/watch-stock.store";
import StockItem from "../shared/StockItem";

interface StockListProps {
  stockData: Stock[];
}

const SavedStocksList = ({ stockData }: StockListProps) => {
  const clearStockList = useWatchStockStore((state) => state.clearStocks);

  return (
    <ScrollView style={styles.stockContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Alert list</Text>
        <IconButton
          iconName="delete"
          onPressed={clearStockList}
          iconColor="#b81414"
        />
      </View>
      {stockData.map((stock, index) => (
        <StockItem key={index} stock={stock} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  stockContainer: {
    backgroundColor: "white",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    marginVertical: 10,
  },
});

export default SavedStocksList;
