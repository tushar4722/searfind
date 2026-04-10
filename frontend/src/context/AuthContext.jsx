import { createContext, useContext, useState } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const getStoredUser = () => {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch {
      localStorage.removeItem('user')
      return null
    }
  }

  const [user, setUser] = useState(getStoredUser())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authService.register(userData)
      const userObj = data.user || {
        _id:    data._id,
        name:   data.name,
        email:  data.email,
        role:   data.role,
        avatar: data.avatar || ''
      }
      setUser(userObj)
      localStorage.setItem('user', JSON.stringify(userObj))
      return { ...data, user: userObj }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authService.login(userData)
      const userObj = data.user || {
        _id:    data._id,
        name:   data.name,
        email:  data.email,
        role:   data.role,
        avatar: data.avatar || ''
      }
      setUser(userObj)
      localStorage.setItem('user', JSON.stringify(userObj))
      return { ...data, user: userObj }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      register,
      login,
      logout,
      isLoggedIn:  !!user,
      isEmployer:  user?.role === 'employer',
      isJobSeeker: user?.role === 'jobseeker'
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext