import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import jobService from '../../services/jobService'
import api from '../../services/api'

const navItems = [
  { icon: '📊', label: 'Dashboard', key: 'dashboard' },
  { icon: '💼', label: 'My Jobs', key: 'jobs' },
  { icon: '📄', label: 'Applications', key: 'applications' },
  { icon: '✉️', label: 'Messages', key: 'messages' },
  { icon: '⚙️', label: 'Settings', key: 'settings' },
]

export default function UserDashboard() {
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('dashboard')
  const [recommendedJobs, setRecommendedJobs] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(false)
  const [appliedCount, setAppliedCount] = useState(0)
  const { user, logout } = useAuth()

  useEffect(() => {
    fetchRecommendedJobs()
    fetchAppliedJobs()
  }, [])

  const fetchRecommendedJobs = async () => {
    setLoadingJobs(true)
    try {
      const data = await jobService.getAllJobs()
      if (data.jobs) setRecommendedJobs(data.jobs.slice(0, 2))
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoadingJobs(false)
    }
  }

  const fetchAppliedJobs = async () => {
    try {
      const response = await api.get('/applications/my-applications')
      if (response.data.applications) {
        setAppliedCount(response.data.applications.length)
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    }
  }

  const formatSalary = (job) => {
    if (job?.salary?.min && job?.salary?.max) {
      return `$${(job.salary.min / 1000).toFixed(0)}k - $${(job.salary.max / 1000).toFixed(0)}k`
    }
    return 'Salary not specified'
  }

  const getInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    return 'U'
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 flex flex-col p-4 border-r border-gray-100 bg-gray-50 z-40 hidden md:flex">
        <div className="mb-8 px-4 py-2">
          <span className="text-xl font-extrabold text-indigo-700">SearFind</span>
          <p className="text-xs text-gray-500 font-medium">Professional Curator</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveNav(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeNav === item.key
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-2 px-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-semibold transition-all"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>

        {/* CTA Card */}
        <div className="mt-4 p-4 bg-indigo-700 rounded-xl text-white">
          <p className="text-sm font-semibold mb-2">Ready for a move?</p>
          <Link to="/jobs" className="w-full bg-white text-indigo-700 text-xs font-bold py-2 rounded-lg hover:bg-indigo-50 transition-colors block text-center">
            Browse Jobs
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col min-h-screen">

        {/* Top Navbar */}
        <header className="sticky top-0 z-50 bg-white flex justify-between items-center w-full px-6 py-3 border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 w-full max-w-xl">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                className="w-full bg-gray-100 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-300 text-sm outline-none"
                placeholder="Search for jobs, skills, or companies..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-gray-500 hover:text-indigo-700 transition-colors">
              <span>🔔</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-100"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{user?.role || 'Job Seeker'}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border-2 border-indigo-100">
                {getInitials()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Canvas */}
        <main className="flex-1 p-6 md:p-10">

          {/* ── MY JOBS TAB ─────────────────────────────── */}
          {activeNav === 'jobs' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">My Applied Jobs</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Job Title', 'Company', 'Location', 'Salary', 'Action'].map(h => (
                        <th key={h} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recommendedJobs.length > 0 ? recommendedJobs.map(job => (
                      <tr key={job._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900">{job.title}</p>
                          <p className="text-xs text-gray-400">{job.type}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
                            {formatSalary(job)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/jobs/${job._id}`} className="text-indigo-700 text-xs font-bold hover:underline">
                            View →
                          </Link>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                          <span className="text-4xl block mb-2">💼</span>
                          No jobs found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── APPLICATIONS TAB ────────────────────────── */}
          {activeNav === 'applications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
                <span className="text-5xl mb-4 block">📄</span>
                <p className="font-bold text-lg text-gray-700">Applications feature coming soon!</p>
                <p className="text-sm mt-2">Your submitted applications will appear here.</p>
                <Link to="/jobs" className="mt-6 inline-block bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-indigo-800 transition-all">
                  Browse Jobs
                </Link>
              </div>
            </div>
          )}

          {/* ── MESSAGES TAB ────────────────────────────── */}
          {activeNav === 'messages' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
                <span className="text-5xl mb-4 block">✉️</span>
                <p className="font-bold text-lg text-gray-700">Messages feature coming soon!</p>
                <p className="text-sm mt-2">This feature will be built by Dev 3.</p>
              </div>
            </div>
          )}

          {/* ── SETTINGS TAB ────────────────────────────── */}
          {activeNav === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
                <span className="text-5xl mb-4 block">⚙️</span>
                <p className="font-bold text-lg text-gray-700">Settings feature coming soon!</p>
                <p className="text-sm mt-2">This feature will be built by Dev 2.</p>
              </div>
            </div>
          )}

          {/* ── DASHBOARD TAB ───────────────────────────── */}
          {activeNav === 'dashboard' && (
            <div className="space-y-10">

              {/* Welcome Header */}
              <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Welcome back, {user?.name?.split(' ')[0] || 'User'}!
                  </h1>
                  <p className="text-gray-500 font-medium mt-1">Here's what's happening with your job search today.</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-gray-600 text-sm font-semibold">
                  <span>📅</span>
                  <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </section>

              {/* Stats Grid */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: 'Applied Jobs',
                    value: appliedCount.toString(),
                    sub: appliedCount > 0 ? `${appliedCount} applications sent` : 'Start applying today!',
                    subColor: 'text-indigo-700',
                    iconBg: 'bg-indigo-100',
                    icon: '📤'
                  },
                  {
                    label: 'Saved Jobs',
                    value: '0',
                    sub: 'Save jobs to apply later',
                    subColor: 'text-gray-400',
                    iconBg: 'bg-purple-100',
                    icon: '🔖'
                  },
                  {
                    label: 'Profile Views',
                    value: '0',
                    sub: 'Complete profile to get views',
                    subColor: 'text-orange-600',
                    iconBg: 'bg-orange-100',
                    icon: '👥'
                  },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                      <h3 className="text-4xl font-extrabold text-gray-900">{stat.value}</h3>
                      <p className={`text-xs font-semibold mt-2 ${stat.subColor}`}>{stat.sub}</p>
                    </div>
                    <div className={`w-14 h-14 ${stat.iconBg} rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}>
                      {stat.icon}
                    </div>
                  </div>
                ))}
              </section>

              {/* Dashboard Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Available Jobs Table */}
                <section className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      Available Jobs
                      <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs uppercase tracking-tighter">Live</span>
                    </h2>
                    <Link to="/jobs" className="text-indigo-700 text-sm font-bold hover:underline">View All</Link>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                          <tr>
                            {['Job Title', 'Company', 'Location', 'Salary', ''].map(h => (
                              <th key={h} className="px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-gray-400">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {recommendedJobs.length > 0 ? recommendedJobs.map(job => (
                            <tr key={job._id} className="hover:bg-gray-50 transition-colors group">
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-lg">
                                    {job.company?.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-gray-900">{job.title}</p>
                                    <p className="text-xs text-gray-400 font-medium">{job.type}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <p className="text-sm font-semibold text-gray-600">{job.company}</p>
                              </td>
                              <td className="px-6 py-5">
                                <p className="text-sm text-gray-500">{job.location}</p>
                              </td>
                              <td className="px-6 py-5">
                                <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
                                  {formatSalary(job)}
                                </span>
                              </td>
                              <td className="px-6 py-5 text-right">
                                <Link to={`/jobs/${job._id}`} className="text-xs font-bold text-indigo-700 hover:underline">
                                  Apply →
                                </Link>
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                <p className="font-bold">No jobs available yet</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Right Sidebar */}
                <aside className="space-y-8">

                  {/* Profile Strength */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">Profile Strength</h3>
                      <span className="text-indigo-700 font-bold text-sm">40%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-700 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">
                      Complete your <span className="text-gray-900 font-bold">Profile</span> to get 3x more visibility from employers.
                    </p>
                    <button className="w-full py-3 bg-gray-100 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-all">
                      Update Profile
                    </button>
                  </div>

                  {/* Recommended Jobs */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">Matches for you</h3>
                    <div className="space-y-3">
                      {loadingJobs ? (
                        <p className="text-gray-400 text-sm animate-pulse">Loading jobs...</p>
                      ) : recommendedJobs.length > 0 ? (
                        recommendedJobs.map(job => (
                          <Link
                            to={`/jobs/${job._id}`}
                            key={job._id}
                            className="block p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-300 transition-all cursor-pointer"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-bold">{job.title}</p>
                                <p className="text-xs text-gray-500 font-medium">{job.company} · {job.location}</p>
                              </div>
                              <span className="bg-indigo-50 text-indigo-700 p-1.5 rounded-lg text-sm">⚡</span>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{formatSalary(job)}</span>
                              <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{job.type}</span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">No jobs available</p>
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex md:hidden justify-around items-center py-2 px-4 z-50">
        <button onClick={() => setActiveNav('dashboard')} className={`flex flex-col items-center gap-1 ${activeNav === 'dashboard' ? 'text-indigo-700' : 'text-gray-400'}`}>
          <span>📊</span><span className="text-xs font-bold">Home</span>
        </button>
        <button onClick={() => setActiveNav('jobs')} className={`flex flex-col items-center gap-1 ${activeNav === 'jobs' ? 'text-indigo-700' : 'text-gray-400'}`}>
          <span>💼</span><span className="text-xs">Jobs</span>
        </button>
        <button onClick={() => setActiveNav('applications')} className={`flex flex-col items-center gap-1 ${activeNav === 'applications' ? 'text-indigo-700' : 'text-gray-400'}`}>
          <span>📄</span><span className="text-xs">Apps</span>
        </button>
        <button onClick={() => setActiveNav('messages')} className={`flex flex-col items-center gap-1 ${activeNav === 'messages' ? 'text-indigo-700' : 'text-gray-400'}`}>
          <span>✉️</span><span className="text-xs">Chat</span>
        </button>
        <button onClick={() => setActiveNav('settings')} className={`flex flex-col items-center gap-1 ${activeNav === 'settings' ? 'text-indigo-700' : 'text-gray-400'}`}>
          <span>👤</span><span className="text-xs">Profile</span>
        </button>
      </nav>

    </div>
  )
}