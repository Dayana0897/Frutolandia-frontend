/**
 * Componente Principal - App
 * Configuración de rutas y estructura de la aplicación
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { UsersPage } from './pages/UsersPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './theme.css';
import './App.css';

function App() {
  const { mounted } = useTheme();

  // Evitar flash de contenido sin estilo
  if (!mounted) {
    return null;
  }

  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <Navbar />

        {/* Contenido principal */}
        <main className="app-main">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/producto/:id" element={<ProductDetailPage />} />
            <Route path="/usuarios" element={<UsersPage />} />
            <Route path="/admin" element={<AdminPage />} />
            
            {/* Ruta 404 - Debe estar al final */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
