import axios from 'axios';
import { computed, ref } from 'vue';

const token = ref(localStorage.getItem('authToken') || '');

export function useAuth () {
  const isAuthenticated = computed(() => !!token.value);

  // Atualiza o token caso mude no localStorage
  window.addEventListener('storage', () => {
    token.value = localStorage.getItem('authToken') || '';
  });

  return { token, isAuthenticated };
}

export async function login (email: string, password: string) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  if (response.status !== 200) {
    throw new Error('Login failed');
  }
  token.value = response.data.token;
  localStorage.setItem('authToken', token.value);
}

export function logout () {
  token.value = '';
  localStorage.removeItem('authToken');
}
