import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Pacientes' }} />
      <Tabs.Screen name="nuevo" options={{ title: 'Registro' }} />
      <Tabs.Screen name="evolucion" options={{ title: 'Gráfica' }} />
    </Tabs>
  );
}