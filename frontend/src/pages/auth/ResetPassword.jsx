import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../../services/authService'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    setLoading(true)
    try {
      // Get token from URL
      const token = window.location.pathname.split('/').pop()
      await authService.resetPassword(token, newPassword)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      alert('❌ ' + (err.response?.data?.message || 'Reset failed!'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-3xl"></div>
        <div className="absolute bottom-[5%] right-[2%] w-[30%] h-[30%] rounded-full bg-indigo-50 blur-3xl"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <Link to="/login" className="text-2xl font-black text-blue-900 tracking-tight">
          SearFind
        </Link>
      </div>

      {/* Main Card */}
      <main className="w-full max-w-md px-6 z-10 flex flex-col items-center">
        <div className="w-full bg-white rounded-xl p-8 md:p-10 border border-gray-100 shadow-lg">

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">
              Forgot Password?
            </h1>
            <p className="text-gray-500 leading-relaxed">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm font-medium text-center">
              ✅ Reset link sent! Please check your email inbox.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              ❌ {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-500 tracking-wide" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✉</span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-400 focus:bg-white rounded-lg py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                  required
                  disabled={success}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 rounded-lg shadow-md hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <span>
                {loading ? 'Sending...' : success ? '✅ Email Sent!' : 'Send Reset Link'}
              </span>
              {!loading && !success && <span>→</span>}
            </button>

          </form>

          {/* Back Link */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/login"
              className="flex items-center gap-2 text-blue-800 font-bold text-sm hover:underline transition-all group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Login</span>
            </Link>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-10 flex flex-col items-center gap-4 opacity-60">
          <div className="flex items-center gap-3 py-2 px-6 rounded-full bg-gray-100 border border-gray-200">
            <span className="text-blue-800 text-sm">🔒</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
              256-bit Encrypted Protocol
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full px-12 py-8 flex flex-col md:flex-row justify-between items-center opacity-40">
        <p className="text-xs font-medium text-gray-600">© 2026 SearFind. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="text-xs font-medium text-gray-600 hover:text-blue-700 transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs font-medium text-gray-600 hover:text-blue-700 transition-colors">Terms of Service</a>
          <a href="#" className="text-xs font-medium text-gray-600 hover:text-blue-700 transition-colors">Help Center</a>
        </div>
      </footer>

    </div>
  )
}