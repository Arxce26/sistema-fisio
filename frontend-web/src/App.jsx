import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function App() {
  const [pacientes, setPacientes] = useState([])
  const [evolucion, setEvolucion] = useState([])
  const API_BASE = "http://192.168.100.6/fisioterapia-api" // Tu IP de Pop!_OS

  useEffect(() => {
    // Cargar pacientes
    axios.get(`${API_BASE}/get_pacientes.php`)
      .then(res => setPacientes(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Error pacientes:", err))

    // Cargar evolución de Juan Pérez (ID: 1)
    axios.get(`${API_BASE}/get_evolucion.php?id=1`)
      .then(res => setEvolucion(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Error evolución:", err))
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 style={{ color: '#007AFF' }}>Fisio+ Dashboard Pro</h1>
      
      {/* GRÁFICA DE EVOLUCIÓN */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2>Evolución Clínica: Juan Pérez</h2>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <LineChart data={evolucion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis domain={[0, 10]} label={{ value: 'Dolor (EVA)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="dolor_antes" stroke="#FF3B30" name="Dolor Inicial" strokeWidth={3} />
              <Line type="monotone" dataKey="dolor_despues" stroke="#34C759" name="Dolor Final" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLA DE PACIENTES */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2>Pacientes Registrados</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#007AFF', color: '#fff', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Nombre</th>
              <th style={{ padding: '15px' }}>Zona</th>
              <th style={{ padding: '15px' }}>Diagnóstico</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>{p.nombre}</td>
                <td style={{ padding: '15px' }}>{p.zona_afectada}</td>
                <td style={{ padding: '15px' }}>{p.diagnostico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default App