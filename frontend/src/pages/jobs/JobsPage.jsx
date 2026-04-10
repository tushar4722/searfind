import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jobService from '../../services/jobService'

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    fullTime: true, remote: false, contract: false,
    junior: false, midLevel: true, senior: false
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const data = await jobService.getAllJobs()
      if (data.jobs && data.jobs.length > 0) {
        setJobs(data.jobs)
      }
    } catch (error) {
      console.error('fetchJobs error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      const data = await jobService.getAllJobs({ search, location })
      if (data.jobs) setJobs(data.jobs)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSave = (id) => {
    setJobs(jobs.map(j => j._id === id ? { ...j, saved: !j.saved } : j))
  }

  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const formatSalary = (job) => {
    if (job.salary?.min && job.salary?.max) {
      return `$${(job.salary.min / 1000).toFixed(0)}k - $${(job.salary.max / 1000).toFixed(0)}k`
    }
    return 'Salary not specified'
  }

  const formatTime = (job) => {
    if (job.createdAt) {
      const diff = Date.now() - new Date(job.createdAt).getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      if (days === 0) return 'Today'
      if (days === 1) return '1 day ago'
      return `${days} days ago`
    }
    return 'Recently'
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-6 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight text-indigo-700">SearFind</span>
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#" className="text-indigo-700 font-semibold border-b-2 border-indigo-700 pb-1">Jobs</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Companies</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Salaries</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Career Advice</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-all">
              Sign In
            </Link>
            <Link to="/post-job" className="bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all">
              Post a Job
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20 max-w-screen-2xl mx-auto px-6">

        {/* Search Hero */}
        <section className="py-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  placeholder="Job Title, Keywords, or Company"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📍</span>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  placeholder="City, State, or Zip Code"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-indigo-700 text-white px-10 py-4 rounded-lg font-bold hover:bg-indigo-800 transition-colors"
              >
                Find Jobs
              </button>
            </div>
          </div>
        </section>

        <div className="flex gap-8 pb-20">

          {/* Sidebar Filters */}
          <aside className="hidden lg:flex flex-col gap-6 w-64 shrink-0">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <span className="text-gray-400">⚙</span>
              </div>

              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Job Type</h3>
                <div className="space-y-3">
                  {[
                    { key: 'fullTime', label: 'Full-time' },
                    { key: 'remote', label: 'Remote' },
                    { key: 'contract', label: 'Contract' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleFilter(key)}>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${filters[key] ? 'bg-indigo-700 border-indigo-700' : 'border-gray-300'}`}>
                        {filters[key] && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <span className="text-sm text-gray-600">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Experience Level</h3>
                <div className="space-y-3">
                  {[
                    { key: 'junior', label: 'Junior (0-2 yrs)' },
                    { key: 'midLevel', label: 'Mid-Level' },
                    { key: 'senior', label: 'Senior' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleFilter(key)}>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${filters[key] ? 'bg-indigo-700 border-indigo-700' : 'border-gray-300'}`}>
                        {filters[key] && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <span className="text-sm text-gray-600">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Salary Range</h3>
                <input className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-700" type="range" />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-400">$40k</span>
                  <span className="text-xs text-gray-400">$200k+</span>
                </div>
              </div>

              <button className="w-full py-3 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition-all">
                Apply Filters
              </button>
            </div>

            <div className="px-2 space-y-2">
              <a href="#" className="flex items-center gap-3 p-3 text-gray-500 hover:bg-white rounded-lg transition-all">
                <span>🔖</span><span className="text-sm">Saved Jobs</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 text-gray-500 hover:bg-white rounded-lg transition-all">
                <span>🔔</span><span className="text-sm">Notifications</span>
              </a>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-bold text-2xl">
                Recommended for you
                <span className="ml-2 text-sm font-normal text-gray-400">({jobs.length} jobs)</span>
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Sort by:</span>
                <select className="bg-transparent border-none focus:ring-0 font-semibold text-gray-900 cursor-pointer">
                  <option>Newest First</option>
                  <option>Salary: High to Low</option>
                </select>
              </div>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="text-indigo-700 font-bold text-lg animate-pulse">Loading jobs...</div>
              </div>
            )}

            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4" onClick={() => toggleSave(job._id)}>
                      <span className={`cursor-pointer text-xl ${job.saved ? 'text-indigo-700' : 'text-gray-300 group-hover:text-indigo-400'} transition-colors`}>
                        🔖
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-xl">
                        {job.companyLogo
                          ? <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain rounded-lg" />
                          : job.company?.charAt(0).toUpperCase()
                        }
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-indigo-700">{job.company}</p>
                        <p className="text-xs text-gray-400">{formatTime(job)}</p>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-700 transition-colors leading-tight">
                      {job.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <span>{job.isRemote ? '🌐' : '📍'}</span>
                      <span>{job.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${job.type === 'contract' ? 'bg-orange-100 text-orange-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full">
                        {formatSalary(job)}
                      </span>
                    </div>

                    {/* ✅ Uses job._id — correct! */}
                    <button
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="w-full py-3 bg-gray-100 group-hover:bg-indigo-700 group-hover:text-white font-bold rounded-lg transition-all"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!loading && jobs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <span className="text-6xl mb-4">💼</span>
                <p className="text-xl font-bold">No jobs found</p>
                <p className="text-sm mt-2">Try different search terms</p>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <button className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all">
                Load More Listings ↓
              </button>
            </div>
          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 w-full bg-white shadow-lg px-6 py-4 z-50 flex justify-around items-center">
        <Link to="/jobs" className="flex flex-col items-center gap-1 text-indigo-700">
          <span>💼</span><span className="text-xs font-bold">Jobs</span>
        </Link>
        <a href="#" className="flex flex-col items-center gap-1 text-gray-400">
          <span>🔖</span><span className="text-xs">Saved</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-gray-400">
          <span>🔔</span><span className="text-xs">Alerts</span>
        </a>
        <Link to="/dashboard" className="flex flex-col items-center gap-1 text-gray-400">
          <span>👤</span><span className="text-xs">Profile</span>
        </Link>
      </nav>

    </div>
  )
}