import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';

export default function EvolucionPaciente() {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://172.26.162.143/fisioterapia-api/get_evolucion.php?id=1";

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        if (res.data.length > 0) {
          const chartData = {
            labels: res.data.map(s => s.fecha.substring(5, 10)), // Solo mes-día
            datasets: [
              {
                data: res.data.map(s => s.dolor_antes),
                color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`, // Rojo: Inicio
                strokeWidth: 2
              },
              {
                data: res.data.map(s => s.dolor_despues),
                color: (opacity = 1) => `rgba(52, 199, 89, ${opacity})`, // Verde: Final
                strokeWidth: 2
              }
            ],
            legend: ["Dolor Inicial", "Dolor Final"]
          };
          setDatos(chartData);
        }
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{flex: 1}} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Progreso Clínico</Text>
      <Text style={styles.subtitle}>Paciente: Juan Pérez</Text>
      
      {datos ? (
        <LineChart
          data={datos}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
          style={styles.chart}
        />
      ) : (
        <Text>No hay sesiones registradas aún.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F2F2F7' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1C1C1E' },
  subtitle: { fontSize: 16, color: '#8E8E93', marginBottom: 20 },
  chart: { marginVertical: 8, borderRadius: 16 }
});