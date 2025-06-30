import axios from 'axios'

export function useAuth () {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  return { token, isAuthenticated }
}

export async function login (email: string, password: string) {
  const response = await axios.post('/api/login', { email, password })
  const token = response.data.token
  localStorage.setItem('authToken', token)
}
