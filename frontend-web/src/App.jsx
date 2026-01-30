import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function App() {
  const [pacientes, setPacientes] = useState([])
  const [evolucion, setEvolucion] = useState([])
  const API_BASE = "http://172.26.162.143/fisioterapia-api"

  useEffect(() => {
    // 1. Cargar la tabla de pacientes
    axios.get(`${API_BASE}/get_pacientes.php`)
      .then(res => setPacientes(res.data))
      .catch(err => console.error("Error cargando pacientes:", err))

    // 2. Cargar evolución del paciente #1 (Prueba inicial)
    axios.get(`${API_BASE}/get_evolucion.php?id=1`)
      .then(res => setEvolucion(res.data))
      .catch(err => console.error("Error cargando evolución:", err))
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ color: '#007AFF' }}>Fisio+ Dashboard</h1>
      <hr />

      {/* SECCIÓN DE LA GRÁFICA */}
      <div style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ marginTop: 0 }}>Evolución del Paciente: Juan Pérez</h2>
        <p style={{ color: '#666' }}>Seguimiento de niveles de dolor (EVA)</p>
        
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={evolucion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="dolor_antes" 
                stroke="#FF3B30" 
                name="Dolor Pre-Sesión" 
                strokeWidth={3}
                dot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="dolor_despues" 
                stroke="#34C759" 
                name="Dolor Post-Sesión" 
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLA DE PACIENTES */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
        <h2>Lista de Pacientes</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Nombre</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Edad</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Zona</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Diagnóstico</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(p => (
              <tr key={p.id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{p.nombre}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{p.edad}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{p.zona_afectada}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{p.diagnostico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App