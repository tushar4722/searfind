import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const [role, setRole] = useState('jobseeker')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [localError, setLocalError] = useState(null)

  const { register, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError(null)
    setSuccess(false)

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match!')
      return
    }

    try {
      const data = await register({ name, email, password, role })
      console.log('Register response:', data)

      // Show success message
      setSuccess(true)

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/login')
      }, 1500)

    } catch (err) {
      console.error('Register failed:', err)
      setLocalError(err.response?.data?.message || 'Registration failed!')
    }
  }

  return (
    <div className="min-h-screen flex bg-white">

      {/* Left Banner */}
      <section className="hidden lg:flex w-1/2 relative overflow-hidden bg-blue-800 items-center justify-center p-12">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            alt="Professional Office Space"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ9IV-Bjd1UWEaKIOBtHzKNzoysECsq24r5vEIOQOZ45SKXNza0KU7bJUHiXzWMTJNAlZGSLEE3I3Vb5kRwC5CJTNvRZyhAWkcEYFSQ2tubHrfDbfg62zbWAsQaUDsfO3FX59NPyEDsQeqtRM291cdmCt9oNvPZu-d_JPFm9wGhLcU2yQvK_2eo502fTBDqcUb0gWnn6rmGDcgBFiecl1pRkXVgBOXndRZzpAfHRLK9Zif9WBQcEve9OwA5nMR2jWzNhiXraoDTWI"
          />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs tracking-widest uppercase mb-6">
              The Curated Professional
            </span>
            <h1 className="text-white text-5xl font-extrabold leading-tight mb-6 tracking-tight">
              Join Our Professional Network
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed max-w-md">
              Connecting elite talent with the world's most innovative companies.
              Your next career milestone starts here.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white/70 backdrop-blur p-6 rounded-xl flex items-center gap-4 border border-white/10 shadow-2xl">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA26WsDiH5S4jNLqvggOF2bOtpGATYekdEsxscFaH_HYyDtk3EsrzFa-Ca_KlmSKRL7GgcmYt6uxuXaocUDnrckR2SvgNgQA2EquK0Ow9yuBxiOffzlJ-Rcb6JLD22Gh8ZSQYEkwBDAJ9rmPkq1hG-zOgSRrvYt5jABUf03Ap7Bxv2aWP0Q-MxhVnEqm7beTnug3UI3jlP6eybcjjNQpNvExLoYBbnbo3Dt-Xtp3giLLSx_-lzKX5AdqTAwSrrxboSoPTIigoqge6k"
                  alt="Professional" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLIeJMOXlDNOR2u1qQbhQoEDljuEt5e7IQb8Mg96n-goSXclrg5QkzvtLD3prn1xBWn_lVh8f2yJN4oo7y3z38Gqyk1wAGsS7RdJm5orcKzdYmLY2WbWsOacHuAlNS7ZUp1w6GUiYUoiap5i2FjV4digDloaxBh6BE2_xEA8xPbeW4VUND2lgGUXfzN99-rDyom3fFC5Y-QN0vt3a_hEyGm46m1H_aN4hjtKhOwKNnO54Jx5Pd1JYArNNf1Ht1DwvsAPmJC_gpLys"
                  alt="Professional" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZEb1K6hCpJNz-K3CrirRcpON5SNZRENG0kwnqdPKZZE2zJj6N8BW-jgvRf_Tb_90xguWlaSiZd_Q72xy3fAnJgNyI4GYcYrBBo4fIGCycqadfvbsu0eRICQHZJJZ4WuatVEHmx4pQAlJ3l1Ks7UjOCNizClTJEuDMtDvnsxWPrQdMUBomkNrZFo5o3-Dd_w8OsWbdiFF-CDIySLgdVbT1RP9uwej79bA21wTiED06HxTUTjp-BOH76WlqInMMeXgRlPJzvfPXM1s"
                  alt="Professional" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-800 flex items-center justify-center text-xs font-bold text-white">
                  +10k
                </div>
              </div>
              <div>
                <p className="text-blue-800 font-bold text-sm">10k+ members already joined</p>
                <p className="text-gray-500 text-xs">Access exclusive job opportunities today.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white/90">
              <span className="text-orange-300 mt-1 text-xl">✔</span>
              <div>
                <h4 className="font-bold text-base">Verified Companies</h4>
                <p className="text-sm opacity-80">Only top-tier employers are invited to our platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Form Section */}
      <main className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile Header */}
          <div className="flex items-center justify-between lg:hidden mb-8">
            <span className="text-blue-800 text-2xl font-extrabold tracking-tight">SearFind</span>
            <Link to="/login" className="text-sm font-bold text-blue-800">Login</Link>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Your Account</h2>
            <p className="text-gray-500">Join 10k+ professionals and employers today.</p>
          </div>

          {/* ✅ Success Message — shown at top */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm font-medium text-center">
              ✅ Account created successfully! Redirecting...
            </div>
          )}

          {/* ❌ Error Message — shown at top */}
          {(localError || error) && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              ❌ {localError || error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Role Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">I am a:</label>
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setRole('jobseeker')}
                  className={`py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                    role === 'jobseeker'
                      ? 'bg-white text-blue-800 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                    role === 'employer'
                      ? 'bg-white text-blue-800 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Employer
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900" htmlFor="name">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                <input
                  id="name"
                  type="text"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✉</span>
                <input
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900" htmlFor="password">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-100 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-900" htmlFor="confirm-password">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  id="confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-100 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showConfirm ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-4 bg-blue-800 hover:bg-blue-900 text-white font-bold text-base rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading
                ? 'Creating Account...'
                : success
                  ? '✅ Account Created!'
                  : 'Create Account →'
              }
            </button>

          </form>

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-800 font-bold hover:underline ml-1">
                Login
              </Link>
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400 leading-relaxed px-8">
              By creating an account, you agree to SearFind's{' '}
              <a href="#" className="underline">Terms of Service</a> and{' '}
              <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}