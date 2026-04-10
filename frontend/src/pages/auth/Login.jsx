import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [success, setSuccess] = useState(false)

  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login({ email, password })
      console.log('Login response:', data)
      if (data && data.user) {
        setSuccess(true)
        setTimeout(() => {
          if (data.user.role === 'employer') {
            navigate('/employer-dashboard')
          } else {
            navigate('/dashboard')
          }
        }, 1000)
      }
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* Left Banner */}
      <section className="relative w-full md:w-3/5 h-64 md:h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqD55RrRkkXZLFSTlA112PzF-UtKuRAC_SvOnAXpWexHHxaw3S1lYMryqqMW6pQzb2yRKu9h3LwTj9-6x5OqIe4nL5Fe_7DdXpC80NSQSFHYkfmixZ63w6EqpbyCRxaWJkH01dO8qgYJpSwr0ukrVW2qOuU_yhu8RIr4LcA_C3off23MHmJw8qoWK3Yno-TYQd62-2FFdx9byFVsxwtEchXqtf3BtUhTOGMkHn8flelH8FgOMvDRRU9ksA1_RlRB_SsqQTPnHRA1E"
            alt="Modern office interior"
          />
          <div className="absolute inset-0 bg-blue-900/80"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 space-y-6">
          <div className="flex items-center space-x-3 mb-8">
            <span className="text-white text-3xl font-extrabold tracking-tight">SearFind</span>
            <div className="h-px w-12 bg-white/40"></div>
          </div>
          <h1 className="text-white text-5xl lg:text-7xl font-extrabold leading-tight max-w-xl">
            Find Your <br />
            <span className="text-blue-200 italic font-medium">Dream Job</span>
          </h1>
          <p className="text-white/80 text-lg max-w-md leading-relaxed">
            Join an exclusive community of professionals and discover curated
            opportunities tailored to your career trajectory.
          </p>
          <div className="flex gap-4 pt-4 items-center">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSHpcVrGnpjZJx3fLnpA3giJNhDo12Yp83u60wMH19GWBLR83u5CsT-lJ9tZa6dOquDdVwQn22YRJ3j6UJ8uNu1Uk-X4_Zupy4Y3gqMvZlvudI2yrQeIPFsTe8HR94OQW7hq8g0AkVcGjaR7bDePqOncNXZl4tt_vM167jOOUTZZse1eGXIZ7Ceod4_PVzYJ_4F6sO79cvIVZ1ZBxuwUqd-DSQyTtYONjKCIrDmdcJRHt8s9M15y1aX3WSHVxBEXyJHUPtKzW01hM"
                alt="Professional" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTHWAuJI54_I_RASwKODFgq3_aCWkM5l1o7CQsyVX4WQTALp0tvSCQ8bJPpGXf2PQXtKvXgulWCP4rxjiCE3CDS-CrpbQLSI7P9t0h_jazrUcw8MzGqeudjpbLOXnkpqKTvvVaBpz9QjblcNuWQOyzWR2kJiJMFNb8reccDZd51E51c-di4XPrIlYacpZ9QtQobiUj2aIZd7uVhmHEWTSltHL5LRq9XZfy3Ayrq2f89adoZQ5Qt7p_Ebc4v2cbMvjOwokdLqA01os"
                alt="Professional" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQj1AmPZu0FpEfvz8zbV2AEqIblB3fDmnOWLJR0dIko7Ys-awWxQ_7uC9LhCm8swSN0LNvYhsf7XkQ8ykzVtYkBXLrSxlepcPk3ABDgBu767alMo8hcZ-70asyxWSwr-XK-00tJEgP3wTWUA6loIUgmITnqedwFBs1P-G6nn6oPZM5n_tEY-6sLeB5M8UtXABY7mZdjfk27fXJCCL9PKvDKmQ5Mce4Tddn3te5EqZ9oVQbmwl7EZ3N889_AdE9_upYsO-LJZvTUe8"
                alt="Professional" />
            </div>
            <p className="text-white/90 text-sm">
              <span className="font-bold">10k+</span> members already joined
            </p>
          </div>
        </div>
      </section>

      {/* Right Form Section */}
      <section className="w-full md:w-2/5 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center">
            <span className="text-blue-800 text-2xl font-extrabold tracking-tight">SearFind</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500">Enter your credentials to access your dashboard.</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm font-medium text-center">
              ✅ Login successful! Redirecting to dashboard...
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              ❌ {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500" htmlFor="password">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-bold text-blue-800 hover:underline uppercase tracking-wider">
                  Forgot Password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded text-blue-800"
              />
              <label className="text-sm text-gray-500" htmlFor="remember">Keep me logged in</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-4 px-6 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg transition-all active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              <span>
                {loading ? 'Logging in...' : success ? '✅ Done!' : 'Login'}
              </span>
              <span>→</span>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-white px-4 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.12 1.12-2.8 2.344-5.912 2.344-5.12 0-9.176-4.144-9.176-9.264s4.056-9.264 9.176-9.264c2.792 0 4.88 1.104 6.384 2.544l2.32-2.32C19.344 1.056 16.4 0 12.48 0 5.688 0 0 5.688 0 12.48s5.688 12.48 12.48 12.48c3.704 0 6.504-1.224 8.704-3.52 2.24-2.24 2.944-5.384 2.944-7.792 0-.744-.064-1.456-.184-2.12h-11.456z" />
                </svg>
                <span className="text-sm font-semibold">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.988 1.57-.12 0-.24 0-.36-.01-.01-1.15.52-2.31 1.2-3.12.744-.88 2.01-1.55 3.102-1.55.06 0 .14 0 .223.03zm1.667 4.87c-1.54 0-2.858.91-3.66 1.14-.984.27-2.525-.33-3.844-.33-2.13 0-4.08 1.29-5.16 3.18-2.19 3.84-.56 9.53 1.58 12.61 1.04 1.51 2.28 3.2 3.91 3.2s2.11-.97 4.1-.97c1.98 0 2.41.97 4.1.97s2.91-1.53 3.95-3.04c1.2-1.75 1.69-3.44 1.71-3.53-.03-.01-3.29-1.26-3.32-5.06-.03-3.17 2.6-4.7 2.72-4.78-1.48-2.17-3.77-2.42-4.57-2.45-.16-.01-.36-.02-.51-.02z" />
                </svg>
                <span className="text-sm font-semibold">Apple</span>
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-800 font-bold hover:underline ml-1">
                Register
              </Link>
            </p>

          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-slate-50 py-6 hidden md:block">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto">
          <div>
            <span className="font-bold text-slate-900">SearFind</span>
            <p className="text-xs uppercase tracking-wider text-slate-500 mt-1">
              © 2026 SearFind. The Curated Professional Journey.
            </p>
          </div>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs uppercase tracking-wider text-slate-500 hover:text-blue-500 transition-all">Privacy Policy</a>
            <a href="#" className="text-xs uppercase tracking-wider text-slate-500 hover:text-blue-500 transition-all">Terms of Service</a>
            <a href="#" className="text-xs uppercase tracking-wider text-slate-500 hover:text-blue-500 transition-all">Help Center</a>
          </nav>
        </div>
      </footer>

    </div>
  )
}