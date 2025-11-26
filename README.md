# Frutolandia Frontend

Frontend de e-commerce de frutas frescas construido con Vite, React y Bootstrap 5.

## 🚀 Despliegue Rápido

### Requisitos
- Node.js 16+
- npm o yarn

### Comandos de Despliegue

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# Otros comandos útiles
npm run build    # Compilar para producción
npm run preview  # Previsualizar build
npm run lint     # Ejecutar linter
```

**Acceso**: http://localhost:5173  
**Backend requerido**: http://localhost:8080 (debe estar corriendo)

## 🚀 Características

- ✅ React 18 con Vite
- ✅ React Router v6 para navegación
- ✅ Gestión de estado con Zustand
- ✅ Bootstrap 5 para estilos
- ✅ Axios para peticiones HTTP
- ✅ Componentes reutilizables y bien organizados
- ✅ Diseño responsive (Mobile, Tablet, Desktop)
- ✅ Tema CSS personalizado
- ✅ Validación de formularios
- ✅ Notificaciones con Toast

## 📋 Requisitos

- Node.js 16+ 
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Dayana0897/Frutolandia-frontend.git
cd Frutolandia-frontend
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

## 🎯 Desarrollo

Inicia el servidor de desarrollo en modo watch:

```bash
npm run dev
# o
yarn dev
```

La aplicación se abrirá automáticamente en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── ProductForm.jsx
│   ├── UserList.jsx
│   ├── UserForm.jsx
│   ├── SearchBar.jsx
│   ├── Toast.jsx
│   └── *.css
├── pages/              # Páginas/vistas
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── UsersPage.jsx
│   ├── AdminPage.jsx
│   ├── NotFoundPage.jsx
│   └── *.css
├── services/           # Servicios HTTP y configuración
│   ├── axiosConfig.js
│   ├── productService.js
│   └── userService.js
├── store/             # Estado global con Zustand
│   ├── productStore.js
│   └── userStore.js
├── theme.css          # Estilos globales y utilidades
├── App.jsx            # Componente raíz con rutas
├── App.css
└── main.jsx          # Punto de entrada

```

## 🔌 API Endpoints

La aplicación se conecta a la API en `http://localhost:8080/api`

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/{id}` - Obtener producto por ID
- `GET /api/products/search?name={name}` - Buscar productos
- `POST /api/products` - Crear producto
- `PUT /api/products/{id}` - Actualizar producto
- `DELETE /api/products/{id}` - Eliminar producto

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/{id}` - Obtener usuario por ID
- `GET /api/users/email/{email}` - Obtener usuario por email
- `POST /api/users` - Crear usuario
- `PUT /api/users/{id}` - Actualizar usuario
- `DELETE /api/users/{id}` - Eliminar usuario

## 🎨 Personalización de Estilos

Los estilos se encuentran en `src/theme.css`. Puedes personalizar:

- **Colores**: Variables CSS en `:root`
- **Tipografía**: Variables de fuentes
- **Espaciado**: Variables de espaciado
- **Componentes**: Clases de utilidad

## 📦 Construir para Producción

```bash
npm run build
# o
yarn build
```

Los archivos compilados estarán en la carpeta `dist/`

## 🧪 Características Principales

### 1. Página de Inicio
- Banner de bienvenida
- Productos destacados
- Características de la tienda
- Llamada a la acción

### 2. Gestión de Productos
- Listar productos en grid
- Buscar productos en tiempo real
- Ver detalles completos
- Crear, editar y eliminar (con confirmación)
- Stock en tiempo real

### 3. Gestión de Usuarios
- Listar usuarios en tabla
- Filtrar por rol (USER, ADMIN)
- Crear, editar y eliminar usuarios
- Validación de email

### 4. Dashboard Admin
- Estadísticas resumidas
- Acciones rápidas
- Información del sistema

### 5. Formularios
- Validación de campos
- Mensajes de error
- Estilos con Bootstrap

## 🎯 Tecnologías Usadas

- **React 18**: Framework UI
- **Vite**: Build tool y dev server
- **React Router v6**: Enrutamiento
- **Zustand**: Gestión de estado
- **Axios**: Cliente HTTP
- **Bootstrap 5**: Estilos CSS
- **CSS3**: Animaciones y layouts

## 🚀 Próximas Mejoras

- [ ] Carrito de compras
- [ ] Sistema de autenticación
- [ ] Paginación avanzada
- [ ] Filtros de productos
- [ ] Integración de pagos
- [ ] Notificaciones en tiempo real

## 📝 Licencia

Este proyecto es parte del TFM Atrium.

## 👥 Autor

- Dayana0897

## 📞 Soporte

Para reportar problemas o sugerencias, abre un issue en el repositorio.

---

⭐ Si te gusta este proyecto, ¡déjanos una estrella!
