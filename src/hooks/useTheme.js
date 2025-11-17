import { useEffect, useState } from 'react';

/**
 * Hook personalizado para manejar temas claro/oscuro
 * Persiste la preferencia en localStorage
 */
export const useTheme = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Inicializar tema desde localStorage o preferencia del sistema
  useEffect(() => {
    // Función para aplicar el tema
    const applyTheme = (newTheme) => {
      const htmlElement = document.documentElement;
      htmlElement.setAttribute('data-theme', newTheme);
      document.body.style.backgroundColor = `var(--bg-primary)`;
      document.body.style.color = `var(--text-primary)`;
      setTheme(newTheme);
    };

    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      applyTheme(storedTheme);
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      applyTheme(initialTheme);
    }
    
    setMounted(true);
  }, []);

  // Toggle entre temas
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      // Forzar re-render
      return newTheme;
    });
  };

  // Cambiar a un tema específico
  const setThemeMode = (mode) => {
    if (mode === 'light' || mode === 'dark') {
      setTheme(mode);
      document.documentElement.setAttribute('data-theme', mode);
      localStorage.setItem('theme', mode);
    }
  };

  return {
    theme,
    toggleTheme,
    setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    mounted,
  };
};
