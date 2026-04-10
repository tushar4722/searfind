import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import jobService from '../../services/jobService'
import { useAuth } from '../../context/AuthContext'

export default function JobDetailPage() {
  const [activeTab, setActiveTab] = useState('description')
  const [saved, setSaved] = useState(false)
  const [job, setJob] = useState(null)
  const [similarJobs, setSimilarJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [applyError, setApplyError] = useState(null)

  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()

  useEffect(() => {
    fetchJob()
    fetchSimilarJobs()
  }, [id])

  const fetchJob = async () => {
    setLoading(true)
    try {
      const data = await jobService.getJobById(id)
      if (data.job) setJob(data.job)
    } catch (error) {
      console.error('Failed to fetch job:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSimilarJobs = async () => {
    try {
      const data = await jobService.getAllJobs()
      if (data.jobs) {
        setSimilarJobs(data.jobs.filter(j => j._id !== id).slice(0, 3))
      }
    } catch (error) {
      console.error('Failed to fetch similar jobs:', error)
    }
  }

  const handleApply = async () => {
    if (!user) {
      alert('Please login to apply for this job!')
      navigate('/login')
      return
    }
    setApplying(true)
    setApplyError(null)
    try {
      await jobService.applyToJob(id, {
        coverLetter: '',
        resume: user.resume || ''
      })
      setApplied(true)
      alert('✅ Application submitted successfully!')
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to apply!'
      setApplyError(msg)
      alert('❌ ' + msg)
    } finally {
      setApplying(false)
    }
  }

  const formatSalary = (job) => {
    if (job?.salary?.min && job?.salary?.max) {
      return `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}`
    }
    return 'Salary not specified'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-indigo-700 font-bold text-xl animate-pulse">Loading job...</p>
    </div>
  )

  if (!job) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 font-bold text-xl">Job not found!</p>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/jobs" className="text-xl font-bold tracking-tight text-indigo-700">SearFind</Link>
            <nav className="hidden md:flex gap-6 items-center">
              <Link to="/jobs" className="text-indigo-700 font-semibold border-b-2 border-indigo-700 pb-1 text-sm">Find Jobs</Link>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm">Companies</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm">Salaries</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors text-sm">Interviews</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-all">🔔</button>
            <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-all">🔖</button>
            {user ? (
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            ) : (
              <Link to="/login" className="bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="bg-gray-100 h-px w-full"></div>
      </header>

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">

        {/* Hero Section */}
        <section className="bg-white rounded-xl p-8 mb-10 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-3xl">
              {job.companyLogo
                ? <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain rounded-xl" />
                : job.company?.charAt(0).toUpperCase()
              }
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-indigo-700 font-bold text-lg">{job.company}</span>
                <span className="text-indigo-700 text-sm">✔</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2 text-gray-500 text-sm">
                <span>📍 {job.location}</span>
                <span>💰 {formatSalary(job)}</span>
                <span>💼 {job.type}</span>
                <span>🕐 {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px]">

            {/* Apply Error */}
            {applyError && (
              <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs text-center">
                ❌ {applyError}
              </div>
            )}

            {/* Apply Now Button */}
            <button
              onClick={handleApply}
              disabled={applying || applied}
              className={`w-full py-4 px-8 rounded-lg font-bold text-center shadow-lg active:scale-95 transition-all disabled:opacity-70 ${
                applied
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-indigo-700 hover:bg-indigo-800 text-white'
              }`}
            >
              {applying ? '⏳ Applying...' : applied ? '✅ Applied!' : 'Apply Now'}
            </button>

            {/* Save Button */}
            <button
              onClick={() => setSaved(!saved)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-indigo-700 py-3 px-8 rounded-lg font-semibold text-center transition-all"
            >
              {saved ? '🔖 Saved' : 'Save for Later'}
            </button>

            {/* Login prompt if not logged in */}
            {!user && (
              <p className="text-xs text-gray-400 text-center">
                <Link to="/login" className="text-indigo-700 font-bold hover:underline">
                  Login
                </Link> to apply for this job
              </p>
            )}
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main Content */}
          <div className="lg:w-2/3 flex flex-col gap-8">

            {/* Tabs */}
            <nav className="flex border-b border-gray-200 gap-8">
              {[
                { key: 'description', label: 'Job Description' },
                { key: 'requirements', label: 'Requirements' },
                { key: 'company', label: 'Company Info' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-4 font-bold transition-colors ${
                    activeTab === tab.key
                      ? 'text-indigo-700 border-b-2 border-indigo-700'
                      : 'text-gray-400 hover:text-indigo-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Tab Content */}
            <div className="bg-white rounded-xl p-8 border border-gray-100">

              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">The Role</h3>
                  <p className="text-gray-500 leading-relaxed mb-6 whitespace-pre-line">
                    {job.description || 'No description provided.'}
                  </p>

                  {job.skills && job.skills.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 mb-8 border-l-4 border-indigo-700">
                      <h4 className="font-bold text-gray-900 mb-3">Technical Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, i) => (
                          <span key={i} className="px-4 py-1.5 bg-indigo-700 text-white rounded-full text-xs font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                      📊 {job.experience} level
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                      💼 {job.type}
                    </span>
                    {job.isRemote && (
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        🌐 Remote
                      </span>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div>
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Requirements</h3>
                  <p className="text-gray-500 leading-relaxed whitespace-pre-line">
                    {job.requirements || 'No requirements specified.'}
                  </p>
                  {job.skills && job.skills.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-bold text-gray-900 mb-3">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, i) => (
                          <span key={i} className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'company' && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">About {job.company}</h3>
                  <p className="text-gray-500 leading-relaxed mb-4">
                    {job.company} is hiring for {job.title} position based in {job.location}.
                    {job.isRemote ? ' This is a remote position.' : ''}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>💼</span> {job.type} position
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>📊</span> {job.experience} level experience required
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>💰</span> {formatSalary(job)}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>📅</span> Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 flex flex-col gap-8">

            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Similar Jobs</h3>
              <div className="flex flex-col gap-4">
                {similarJobs.length > 0 ? (
                  similarJobs.map(similarJob => (
                    <div
                      key={similarJob._id}
                      onClick={() => navigate(`/jobs/${similarJob._id}`)}
                      className="bg-white p-5 rounded-xl border border-gray-100 hover:translate-x-1 transition-transform cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-lg">
                          {similarJob.companyLogo
                            ? <img src={similarJob.companyLogo} alt={similarJob.company} className="w-full h-auto" />
                            : similarJob.company?.charAt(0).toUpperCase()
                          }
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="font-bold text-gray-900">{similarJob.title}</h4>
                          <p className="text-xs text-gray-500">{similarJob.company} • {similarJob.location}</p>
                          <p className="text-xs font-bold text-indigo-700 mt-1">{formatSalary(similarJob)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No similar jobs found</p>
                )}
              </div>
              <button
                onClick={() => navigate('/jobs')}
                className="w-full mt-6 text-sm font-bold text-indigo-700 hover:underline"
              >
                View all jobs →
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Job Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Company</span>
                  <span className="font-semibold text-gray-900">{job.company}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Location</span>
                  <span className="font-semibold text-gray-900">{job.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Job Type</span>
                  <span className="font-semibold text-gray-900">{job.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-semibold text-gray-900">{job.experience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Salary</span>
                  <span className="font-semibold text-indigo-700">{formatSalary(job)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Remote</span>
                  <span className="font-semibold text-gray-900">{job.isRemote ? 'Yes' : 'No'}</span>
                </div>
              </div>

              {/* Apply button in sidebar too */}
              <button
                onClick={handleApply}
                disabled={applying || applied}
                className={`w-full mt-6 py-3 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-70 ${
                  applied
                    ? 'bg-green-600 text-white'
                    : 'bg-indigo-700 hover:bg-indigo-800 text-white'
                }`}
              >
                {applying ? '⏳ Applying...' : applied ? '✅ Applied!' : 'Apply Now'}
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center z-50">
        <Link to="/dashboard" className="flex flex-col items-center gap-1 text-indigo-700">
          <span>📊</span><span className="text-xs font-medium">Dashboard</span>
        </Link>
        <a href="#" className="flex flex-col items-center gap-1 text-gray-400">
          <span>💼</span><span className="text-xs font-medium">Applied</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-gray-400">
          <span>❤️</span><span className="text-xs font-medium">Saved</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-gray-400">
          <span>✉️</span><span className="text-xs font-medium">Messages</span>
        </a>
      </nav>

    </div>
  )
}