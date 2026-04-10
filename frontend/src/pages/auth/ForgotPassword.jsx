import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email })
    setSent(true)
    // TODO: connect to authService.js
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white relative overflow-hidden">

      {/* Background Shapes */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gray-100 rounded-full blur-3xl opacity-60 z-0"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-30 z-0"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-20">
        <div className="flex justify-between items-center w-full px-6 py-6 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tight text-blue-700">SearFind</div>
        </div>
      </header>

      {/* Main Card */}
      <main className="w-full max-w-md z-10">
        <div className="bg-white rounded-xl p-10 shadow-lg relative overflow-hidden border border-gray-100">

          {/* Left Accent Bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>

          {/* Header */}
          <div className="mb-10">
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🔑</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
              Forgot Password?
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Success Message */}
          {sent && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
              ✅ Reset link sent! Please check your email.
            </div>
          )}

          {/* Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✉</span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm tracking-wide rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Send Reset Link</span>
              <span>→</span>
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-10 pt-8 text-center border-t border-gray-100">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-700 transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-8 flex justify-center items-center gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <span className="text-sm">🔒</span>
            <span className="text-xs font-bold uppercase tracking-widest">Secure Protocol</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">🔐</span>
            <span className="text-xs font-bold uppercase tracking-widest">256-bit Encrypted</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center opacity-60">
        <p className="text-xs font-medium text-gray-500">© 2026 SearFind. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="text-xs font-medium text-gray-500 hover:text-blue-700 transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs font-medium text-gray-500 hover:text-blue-700 transition-colors">Terms of Service</a>
          <a href="#" className="text-xs font-medium text-gray-500 hover:text-blue-700 transition-colors">Help Center</a>
        </div>
      </footer>

    </div>
  )
}