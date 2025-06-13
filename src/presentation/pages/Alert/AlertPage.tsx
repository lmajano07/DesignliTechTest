import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";

import { useStocks } from "../Stock/use-stocks.hook";
import { useWatchStockStore } from "@src/presentation/store/watch-stock.store";
import DropDownPicker from "react-native-dropdown-picker";
import SavedStocksList from "@src/presentation/components/lists/SavedStocksList";

const AlertPage = () => {
  const { isLoading, stocks } = useStocks();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [priceAlert, setPriceAlert] = useState<string>("");
  const stockList = useWatchStockStore((state) => state.stocks);
  const addStock = useWatchStockStore((state) => state.addStock);

  const handlePriceAlertChange = (text: string) => {
    const numericText = text
      .replace(/[^0-9.]/g, "")
      .replace(/^([^.]*\.)|\./g, "$1")
      .replace(/^0+(\d)/, "$1")
      .replace(/(\.\d{0,2}).*/, "$1")
      .slice(0, 8);
    setPriceAlert(numericText);
  };

  const handleSubmit = () => {
    if (submitting) return;

    setSubmitting(true);

    if (!selectedStock || !priceAlert) {
      Alert.alert("Error", "Select stock and price alert");
      setSubmitting(false);
      return;
    }

    const stockExists = stockList.some(
      (stock) => stock.symbol === selectedStock
    );

    if (stockExists) {
      Alert.alert("Error", `Alert for ${selectedStock} already exists!`);
      setSubmitting(false);
      return;
    }

    addStock({ symbol: selectedStock, currentPrice: Number(priceAlert) });

    setSubmitting(false);
    Keyboard.dismiss();

    Alert.alert(
      "Success",
      `Added alert for: ${selectedStock}, at: $${priceAlert}`
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Set Price Alert</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={stocks.map((stock) => ({
          label: stock?.name || stock?.symbol,
          value: stock.symbol,
        }))}
        value={selectedStock}
        placeholder="Select a stock"
        containerStyle={styles.dropdownContainer}
        dropDownContainerStyle={styles.dropdownContent}
        style={styles.dropdown}
        selectedItemLabelStyle={{ color: "#000", fontWeight: "bold" }}
        onChangeValue={(item) => setSelectedStock(item)}
        setValue={setSelectedStock}
        multiple={false}
        listItemContainerStyle={{ height: 40 }}
        textStyle={{ color: "#000", fontSize: 16 }}
        listItemLabelStyle={{ color: "#000", fontSize: 16 }}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Set price alert"
        value={priceAlert}
        onChangeText={handlePriceAlertChange}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Set Alert</Text>
      </Pressable>
      <SavedStocksList stockData={stockList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    zIndex: 1000,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownContent: {
    backgroundColor: "white",
    borderWidth: 0.2,
    borderColor: "green",
    zIndex: 1000,
    elevation: 3,
  },
  dropdown: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 5,
    height: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "green",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: "green",
    marginVertical: 10,
    borderRadius: 5,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AlertPage;
