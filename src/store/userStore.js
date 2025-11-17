import { create } from 'zustand';
import * as userService from '../services/userService';

/**
 * Store de usuarios usando Zustand
 * Gestiona estado global de usuarios, loading, errores
 */

export const useUserStore = create((set, get) => ({
  // Estado
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  filterRole: 'ALL', // ALL, USER, ADMIN

  // Acciones
  
  // Obtener todos los usuarios
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await userService.getAllUsers();
      set({ users: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Obtener usuario por ID
  fetchUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await userService.getUserById(id);
      set({ selectedUser: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Obtener usuario por email
  fetchUserByEmail: async (email) => {
    set({ loading: true, error: null });
    try {
      const data = await userService.getUserByEmail(email);
      set({ selectedUser: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Crear usuario
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const newUser = await userService.createUser(userData);
      set((state) => ({
        users: [...state.users, newUser],
        loading: false,
      }));
      return newUser;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const updated = await userService.updateUser(id, userData);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updated : u)),
        selectedUser: updated,
        loading: false,
      }));
      return updated;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Eliminar usuario
  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await userService.deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Filtrar por rol
  setFilterRole: (role) => set({ filterRole: role }),

  // Limpiar errores
  clearError: () => set({ error: null }),

  // Limpiar estado
  resetState: () => set({ users: [], selectedUser: null, error: null, filterRole: 'ALL' }),
}));
