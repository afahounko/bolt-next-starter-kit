import axios from 'axios';
import { useAuthStore } from './store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Default user credentials
const DEFAULT_USER = {
  id: "default-user-id",
  email: "admin@example.com",
  name: "Admin User",
  password: "admin123", // In a real app, this would be hashed
};

// Mock JWT token generation
const generateToken = () => {
  return 'mock-jwt-token-' + Math.random().toString(36).slice(2);
};

export const login = async (email: string, password: string) => {
  // Check for default user first
  if (email === DEFAULT_USER.email && password === DEFAULT_USER.password) {
    return {
      token: generateToken(),
      user: {
        id: DEFAULT_USER.id,
        email: DEFAULT_USER.email,
        name: DEFAULT_USER.name,
      },
    };
  }

  // Fallback to regular API call if not default user
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    // For demo purposes, also allow the default user credentials
    // even if the API call fails
    if (email === DEFAULT_USER.email && password === DEFAULT_USER.password) {
      return {
        token: generateToken(),
        user: {
          id: DEFAULT_USER.id,
          email: DEFAULT_USER.email,
          name: DEFAULT_USER.name,
        },
      };
    }
    throw error;
  }
};

export const signup = async (email: string, password: string, name: string) => {
  try {
    const response = await api.post('/auth/signup', { email, password, name });
    return response.data;
  } catch (error) {
    // For demo purposes, if the API is not available, create a mock user
    return {
      token: generateToken(),
      user: {
        id: 'new-' + Math.random().toString(36).slice(2),
        email,
        name,
      },
    };
  }
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export default api;
