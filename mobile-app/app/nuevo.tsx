import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function NuevoPaciente() {
  const [form, setForm] = useState({ nombre: '', edad: '', whatsapp: '', diagnostico: '', zona: '' });

  const guardar = async () => {
    try {
      // USAMOS TU IP
      const res = await axios.post("http://172.26.162.143/fisioterapia-api/insertar_paciente.php", form);
      if (res.data.status === "success") {
        Alert.alert("Éxito", "Paciente guardado correctamente");
        setForm({ nombre: '', edad: '', whatsapp: '', diagnostico: '', zona: '' });
      }
    } catch (e) {
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del Paciente:</Text>
      <TextInput style={styles.input} value={form.nombre} onChangeText={(t) => setForm({...form, nombre: t})} placeholder="Juan Pérez" />
      
      <Text style={styles.label}>Edad:</Text>
      <TextInput style={styles.input} value={form.edad} onChangeText={(t) => setForm({...form, edad: t})} keyboardType="numeric" placeholder="28" />

      <Text style={styles.label}>Zona Afectada:</Text>
      <TextInput style={styles.input} value={form.zona} onChangeText={(t) => setForm({...form, zona: t})} placeholder="Rodilla Derecha" />

      <Text style={styles.label}>Diagnóstico:</Text>
      <TextInput style={[styles.input, { height: 80 }]} multiline value={form.diagnostico} onChangeText={(t) => setForm({...form, diagnostico: t})} />

      <TouchableOpacity style={styles.btn} onPress={guardar}>
        <Text style={styles.btnText}>Guardar Paciente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 15 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8, fontSize: 16 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, marginTop: 30, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});