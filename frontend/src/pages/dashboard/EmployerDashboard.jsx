import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import jobService from '../../services/jobService'
import api from '../../services/api'

const navItems = [
  { icon: '📊', label: 'Dashboard',       key: 'dashboard' },
  { icon: '💼', label: 'Posted Jobs',     key: 'posted' },
  { icon: '👥', label: 'Applicants',      key: 'applicants' },
  { icon: '✉️', label: 'Messages',        key: 'messages' },
  { icon: '🏢', label: 'Company Profile', key: 'company' },
]

export default function EmployerDashboard() {
  const [search, setSearch]       = useState('')
  const [activeNav, setActiveNav] = useState('dashboard')
  const [myJobs, setMyJobs]       = useState([])
  const [applicants, setApplicants] = useState([])
  const [stats, setStats]         = useState({ postedJobs: 0, totalApplicants: 0, activeJobs: 0 })
  const { user, logout }          = useAuth()
  const navigate                  = useNavigate()

  useEffect(() => {
    fetchMyJobs()
    fetchApplicants()
  }, [])

  const fetchMyJobs = async () => {
    try {
      const data = await jobService.getMyJobs()
      if (data.jobs) {
        setMyJobs(data.jobs)
        setStats({
          postedJobs:      data.jobs.length,
          activeJobs:      data.jobs.filter(j => j.status === 'active').length,
          totalApplicants: data.jobs.reduce((sum, j) => sum + (j.totalApplications || 0), 0)
        })
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    }
  }

  const fetchApplicants = async () => {
    try {
      const response = await api.get('/applications/my-job-applicants')
      if (response.data.applications) {
        setApplicants(response.data.applications)
      }
    } catch (error) {
      console.error('Failed to fetch applicants:', error)
    }
  }

  const getInitials = () => user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'E'

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen font-sans">

      {/* Top Navbar */}
      <header className="fixed top-0 w-full z-50 h-16 bg-white shadow-sm flex justify-between items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold text-indigo-700 tracking-tight">SearFind</span>
          <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
            <span className="text-gray-400 text-sm mr-2">🔍</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-gray-400 outline-none"
              placeholder="Search applicants or jobs..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">🔔</button>
          <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">⚙️</button>
          <div className="h-8 w-px bg-gray-200 mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
              {getInitials()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-none">{user?.name || 'Employer'}</p>
              <p className="text-xs text-gray-500 mt-1 capitalize">{user?.role || 'employer'}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-gray-200 bg-gray-50 flex flex-col py-6">
        <div className="px-6 mb-6">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 flex items-center justify-center rounded-lg text-indigo-700 font-bold text-sm">
                {getInitials()}
              </div>
              <div>
                <p className="text-sm font-bold">{user?.name || 'Employer'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'Employer'}</p>
              </div>
            </div>
            <Link to="/post-job" className="w-full bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all">
              + Post a Job
            </Link>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveNav(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeNav === item.key
                  ? 'bg-indigo-50 text-indigo-700 font-semibold translate-x-1'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
              {item.key === 'applicants' && applicants.length > 0 && (
                <span className="ml-auto bg-indigo-700 text-white text-xs px-2 py-0.5 rounded-full">
                  {applicants.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-1 border-t border-gray-200 pt-4 px-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-all">
            <span>❓</span><span className="text-sm font-semibold">Help Center</span>
          </a>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all">
            <span>🚪</span><span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-24 px-8 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* ── POSTED JOBS TAB ─────────────────────── */}
          {activeNav === 'posted' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Posted Jobs</h2>
                <Link to="/post-job" className="bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-800">
                  + Post New Job
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Job Title', 'Location', 'Type', 'Applicants', 'Status', ''].map(h => (
                        <th key={h} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {myJobs.length > 0 ? myJobs.map(job => (
                      <tr key={job._id} className="hover:bg-gray-50 group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-700 font-bold">
                              {job.company?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{job.title}</p>
                              <p className="text-xs text-gray-400">{job.company}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{job.type}</td>
                        <td className="px-6 py-4 font-bold text-lg">{job.totalApplications || 0}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            job.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => navigate(`/jobs/${job._id}`)} className="text-indigo-700 text-xs font-bold hover:underline">
                            View →
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                          <span className="text-4xl block mb-2">💼</span>
                          <p className="font-bold">No jobs posted yet</p>
                          <Link to="/post-job" className="mt-3 inline-block bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold">Post First Job</Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── APPLICANTS TAB ──────────────────────── */}
          {activeNav === 'applicants' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Applicants
                  <span className="ml-2 text-sm font-normal text-gray-400">({applicants.length} total)</span>
                </h2>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Applicant', 'Email', 'Applied For', 'Location', 'Date', 'Status'].map(h => (
                        <th key={h} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {applicants.length > 0 ? applicants.map(app => (
                      <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
                              {app.applicant?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <p className="font-bold text-gray-900">{app.applicant?.name || 'Unknown'}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{app.applicant?.email || '-'}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900 text-sm">{app.job?.title || '-'}</p>
                          <p className="text-xs text-gray-400">{app.job?.type}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{app.job?.location || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                            ✓ Applied
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-16 text-center text-gray-400">
                          <span className="text-5xl block mb-3">👥</span>
                          <p className="font-bold text-lg text-gray-700">No applicants yet</p>
                          <p className="text-sm mt-1">Applicants will appear here when people apply to your jobs</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── MESSAGES TAB ────────────────────────── */}
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

          {/* ── COMPANY TAB ─────────────────────────── */}
          {activeNav === 'company' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
                <span className="text-5xl mb-4 block">🏢</span>
                <p className="font-bold text-lg text-gray-700">Company Profile feature coming soon!</p>
                <p className="text-sm mt-2">This feature will be built by Dev 2.</p>
              </div>
            </div>
          )}

          {/* ── DASHBOARD TAB ───────────────────────── */}
          {activeNav === 'dashboard' && (
            <div>
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Employer Dashboard</h1>
                  <p className="text-gray-500 mt-2 font-medium">
                    Welcome back, {user?.name?.split(' ')[0] || 'Employer'}. Here's your recruitment overview.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200">
                  <span>📅</span>
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl border border-gray-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><span className="text-6xl">💼</span></div>
                  <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Posted Jobs</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-bold">{stats.postedJobs}</h3>
                    <span className="text-green-600 text-xs font-bold">Total</span>
                  </div>
                  <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-700 rounded-full" style={{ width: stats.postedJobs > 0 ? '66%' : '0%' }}></div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><span className="text-6xl">👥</span></div>
                  <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Total Applicants</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-bold">{applicants.length}</h3>
                    <span className="text-green-600 text-xs font-bold">Applications</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-4">Across all job postings</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 border-b-4 border-b-indigo-700 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><span className="text-6xl">⚡</span></div>
                  <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Active Jobs</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-bold">{stats.activeJobs}</h3>
                    <span className="text-gray-400 text-xs font-bold">Currently Hiring</span>
                  </div>
                  <div className="mt-4">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">{stats.activeJobs} Active</span>
                  </div>
                </div>
              </div>

              {/* Recent Applicants Table */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-8">
                <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Recent Applicants</h2>
                    <p className="text-sm text-gray-500 mt-1">People who applied to your job postings</p>
                  </div>
                  <button onClick={() => setActiveNav('applicants')} className="text-indigo-700 text-sm font-bold hover:underline">
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        {['Applicant', 'Email', 'Applied For', 'Date'].map(h => (
                          <th key={h} className="px-8 py-4 text-xs font-bold uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {applicants.slice(0, 5).length > 0 ? applicants.slice(0, 5).map(app => (
                        <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
                                {app.applicant?.name?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <p className="font-bold text-gray-900">{app.applicant?.name || 'Unknown'}</p>
                            </div>
                          </td>
                          <td className="px-8 py-4 text-sm text-gray-500">{app.applicant?.email || '-'}</td>
                          <td className="px-8 py-4">
                            <p className="font-semibold text-gray-900 text-sm">{app.job?.title || '-'}</p>
                          </td>
                          <td className="px-8 py-4 text-sm text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="px-8 py-10 text-center text-gray-400">
                            <p className="font-bold">No applicants yet</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Job Postings Table */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Recent Job Postings</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your active recruitment campaigns</p>
                  </div>
                  <Link to="/post-job" className="text-indigo-700 text-sm font-bold hover:underline">+ Post New Job</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        {['Job Title', 'Applicants', 'Status', ''].map(h => (
                          <th key={h} className="px-8 py-4 text-xs font-bold uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {myJobs.length > 0 ? myJobs.map(job => (
                        <tr key={job._id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-lg">
                                {job.company?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{job.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{job.type} • {job.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">{job.totalApplications || 0}</span>
                              <span className="text-xs px-1.5 py-0.5 rounded font-bold bg-green-50 text-green-600">applicants</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                              job.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-2 text-gray-400 hover:text-indigo-700 transition-colors">✏️</button>
                              <button onClick={() => navigate(`/jobs/${job._id}`)} className="bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                                View Applicants
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="px-8 py-16 text-center">
                            <div className="flex flex-col items-center gap-3 text-gray-400">
                              <span className="text-5xl">💼</span>
                              <p className="font-bold text-lg">No jobs posted yet</p>
                              <Link to="/post-job" className="mt-2 bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-indigo-800">Post a Job</Link>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Promo Cards */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-indigo-700 p-8 rounded-2xl text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Boost Your Reach</h3>
                    <p className="text-indigo-100 mb-6 text-sm max-w-sm">Upgrade your job postings to get up to 5x more qualified applicants.</p>
                    <button className="bg-white text-indigo-700 font-bold px-6 py-2.5 rounded-xl text-sm shadow-md hover:shadow-xl transition-all">Get Premium Now</button>
                  </div>
                  <span className="absolute -bottom-4 -right-4 text-9xl opacity-10 group-hover:scale-125 transition-transform">🚀</span>
                </div>
                <div className="bg-orange-50 p-8 rounded-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Recruitment Tips</h3>
                    <p className="text-gray-500 mb-6 text-sm max-w-sm">Learn how to write better job descriptions and optimize your hiring flow.</p>
                    <button className="bg-white/70 border border-white/40 text-gray-800 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-white transition-all">Read Guide</button>
                  </div>
                  <span className="absolute -bottom-4 -right-4 text-9xl opacity-5 group-hover:scale-125 transition-transform">💡</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* FAB */}
      <button onClick={() => navigate('/post-job')} className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 text-2xl">+</button>

    </div>
  )
}