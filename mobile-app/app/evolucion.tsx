import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';

export default function EvolucionScreen() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const API_URL = "http://192.168.100.6/fisioterapia-api/get_evolucion.php?id=1";

  const loadData = () => {
    setLoading(true);
    axios.get(API_URL)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setChartData({
            labels: res.data.map(s => s.fecha.substring(8, 10) + "/" + s.fecha.substring(5, 7)),
            datasets: [
              { data: res.data.map(s => s.dolor_antes), color: () => '#FF3B30' },
              { data: res.data.map(s => s.dolor_despues), color: () => '#34C759' }
            ],
            legend: ["Inicial", "Final"]
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} color="#007AFF" />;

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
    >
      <Text style={styles.title}>Evolución Clínica</Text>
      {chartData ? (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: () => `black`,
          }}
          bezier
          style={{ borderRadius: 16, marginVertical: 10 }}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Aún no hay sesiones para este paciente.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 }
});