import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [pacientes, setPacientes] = useState([])
  const API_URL = "http://172.26.162.143/fisioterapia-api/get_pacientes.php"

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setPacientes(res.data))
      .catch(err => console.error("Error cargando pacientes:", err))
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#007AFF' }}>Fisio+ Dashboard</h1>
      <hr />
      <h2>Lista de Pacientes</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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
  )
}

export default App