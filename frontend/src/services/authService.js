import api from './api'

// Register
const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
    const user = {
      _id:    response.data._id,
      name:   response.data.name,
      email:  response.data.email,
      role:   response.data.role,
      avatar: response.data.avatar || ''
    }
    localStorage.setItem('user', JSON.stringify(user))
    return { ...response.data, user }
  }
  return response.data
}

// Login
const login = async (userData) => {
  const response = await api.post('/auth/login', userData)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
    const user = {
      _id:    response.data._id,
      name:   response.data.name,
      email:  response.data.email,
      role:   response.data.role,
      avatar: response.data.avatar || ''
    }
    localStorage.setItem('user', JSON.stringify(user))
    return { ...response.data, user }
  }
  return response.data
}

// Logout
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// Forgot Password
const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email })
  return response.data
}

// Reset Password
const resetPassword = async (token, password) => {
  const response = await api.put(`/auth/reset-password/${token}`, { password })
  return response.data
}

// Get current user
const getMe = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

const authService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getMe
}

export default authService