import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useUserStore } from "@/stores/useUserStore";

const UserChart = () => {
  const {
    fetchUserDashboardData,
    totalUserCreditTransactions,
    totalUserDebitTransactions,
  } = useDashboardStore();

  const { user } = useUserStore();

  useEffect(() => {
    fetchUserDashboardData();
  }, [fetchUserDashboardData]);

  const  totalCredit = totalUserCreditTransactions;
  const  totalDebit = totalUserDebitTransactions;
  const userName = user?.Name || "User";

  const data = {
    labels: ["Total Credit", "Total Debit"],
    datasets: [{ data: [totalCredit, totalDebit] }],
  };
  
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(13, 127, 209, ${opacity})`, // Bar color
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#0d7fd1" },
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <BarChart
        data={data}
        width={300}
        height={220}
        chartConfig={chartConfig}
        fromZero
        yAxisLabel="₦"
        yAxisSuffix=""
      />
    </View>
  );
};

export default UserChart;

const styles = StyleSheet.create({});
