/**
 * Datos de ejemplo para pruebas
 * Estos datos se pueden usar para mock de la API
 */

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Manzana Roja',
    price: 2.99,
    description: 'Manzanas rojas frescas y deliciosas, perfectas para un snack saludable',
    ingredients: '100% Manzana Natural',
    stock: 150,
    image: 'apple-red.jpg'
  },
  {
    id: 2,
    name: 'Plátano',
    price: 1.99,
    description: 'Plátanos amarillos maduros, ricos en potasio y vitaminas',
    ingredients: '100% Plátano Natural',
    stock: 200,
    image: 'banana.jpg'
  },
  {
    id: 3,
    name: 'Naranja Valencia',
    price: 2.49,
    description: 'Naranjas jugosas y refrescantes, ideales para zumo natural',
    ingredients: '100% Naranja Natural',
    stock: 100,
    image: 'orange.jpg'
  },
  {
    id: 4,
    name: 'Fresa',
    price: 4.99,
    description: 'Fresas frescas y dulces, perfectas para postres y desayunos',
    ingredients: '100% Fresa Natural',
    stock: 50,
    image: 'strawberry.jpg'
  },
  {
    id: 5,
    name: 'Melón',
    price: 5.99,
    description: 'Melones frescos y jugosos, perfectos para días calurosos',
    ingredients: '100% Melón Natural',
    stock: 30,
    image: 'melon.jpg'
  },
  {
    id: 6,
    name: 'Sandía',
    price: 6.99,
    description: 'Sandías grandes y dulces, perfectas para refrescarse en verano',
    ingredients: '100% Sandía Natural',
    stock: 20,
    image: 'watermelon.jpg'
  },
  {
    id: 7,
    name: 'Mango',
    price: 3.99,
    description: 'Mangos tropicales dulces, rey de las frutas',
    ingredients: '100% Mango Natural',
    stock: 80,
    image: 'mango.jpg'
  },
  {
    id: 8,
    name: 'Piña',
    price: 4.49,
    description: 'Piñas tropicales exóticas, perfectas para ensaladas',
    ingredients: '100% Piña Natural',
    stock: 60,
    image: 'pineapple.jpg'
  }
];

export const MOCK_USERS = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'USER'
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@example.com',
    role: 'ADMIN'
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos@example.com',
    role: 'USER'
  },
  {
    id: 4,
    name: 'Ana Martínez',
    email: 'ana@example.com',
    role: 'ADMIN'
  },
  {
    id: 5,
    name: 'Roberto Sánchez',
    email: 'roberto@example.com',
    role: 'USER'
  }
];

export default { MOCK_PRODUCTS, MOCK_USERS };
