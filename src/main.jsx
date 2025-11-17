/**
 * Punto de entrada de la aplicación React
 * Monta el componente App en el elemento root del HTML
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './theme.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
