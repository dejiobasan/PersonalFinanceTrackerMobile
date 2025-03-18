import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useUserStore } from "@/stores/useUserStore";

const AdminChart = () => {
  const {
    fetchDashboardData,
    totalCreditTransactions,
    totalDebitTransactions,
    totalUsers,
    averageTransactions,
  } = useDashboardStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const totalCredit = totalCreditTransactions;
  const totalDebit = totalDebitTransactions;
  const userName = user?.Name || "User";

  const data = {
    labels: ["Total Credit", "Total Debit"],
    datasets: [{ data: [totalCredit, totalDebit] }],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(13, 127, 209, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
        yAxisLabel=""
        yAxisSuffix=""
      />
    </View>
  );
};

export default AdminChart;

const styles = StyleSheet.create({});
