import React from "react";
import { Dimensions, ScrollView } from "react-native";

import { Stock } from "@domain/entities";
import { BarChart } from "react-native-gifted-charts";

const screenHeight = Dimensions.get("window").height;

interface StockChartProps {
  stocks: Stock[];
}

const StockChart = ({ stocks }: StockChartProps) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      bounces={false}
    >
      <BarChart
        data={stocks.map((e) => ({
          value: e.currentPrice ?? 1,
          label: e.symbol,
        }))}
        height={screenHeight * 0.3}
        barStyle={{}}
        yAxisLabelPrefix="$"
        yAxisLabelSuffix=""
      />
    </ScrollView>
  );
};

export default StockChart;
