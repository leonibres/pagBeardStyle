import { ref, computed } from 'vue'
import axiosInstance from '../axiosConfig'

const user = ref(null)
const loading = ref(false)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)
  
  const checkAuth = () => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      user.value = JSON.parse(userData)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    user.value = null
  }

  const login = async (credentials) => {
    loading.value = true
    try {
      const response = await axiosInstance.post('/api/clientes/login', credentials)
      const { token, data } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('userData', JSON.stringify(data))
      user.value = data
      return true
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    try {
      const response = await axiosInstance.post('/api/clientes/register', userData)
      return response.data
    } catch (error) {
      console.error('Error en registro:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Inicializar estado de autenticación
  checkAuth()

  return {
    user,
    loading,
    isAuthenticated,
    checkAuth,
    login,
    register,
    logout
  }
}
