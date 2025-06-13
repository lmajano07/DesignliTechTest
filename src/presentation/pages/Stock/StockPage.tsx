import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useStocks } from "./use-stocks.hook";

import StockList from "@presentation/components/lists/StockList";
import StockChart from "@presentation/components/shared/StockChart";
import { RootStackParams } from "@presentation/routes/StackNavigator";

type NavigationProp = StackNavigationProp<RootStackParams, "Stocks">;

const StockPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const { stocks, isLoading, error } = useStocks();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <View></View>,
    });
  }, [navigation]);

  if (isLoading) {
    return <View></View>;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>
          There was an error loading stock data. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <StockChart stocks={stocks} />
      <StockList stocks={stocks} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
});

export default StockPage;
