import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function ListaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tu IP de Pop!_OS
  const API_URL = "http://192.168.100.6/fisioterapia-api/get_pacientes.php";

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setPacientes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.zone}>📍 {item.zona_afectada}</Text>
              <Text style={styles.diag}>{item.diagnostico}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2 },
  name: { fontSize: 18, fontWeight: 'bold' },
  zone: { fontSize: 14, color: '#FF9500', marginVertical: 4 },
  diag: { fontSize: 14, color: '#8E8E93' }
});