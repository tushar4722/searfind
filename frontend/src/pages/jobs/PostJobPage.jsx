import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jobService from '../../services/jobService'
import { useAuth } from '../../context/AuthContext'

export default function PostJobPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    jobTitle: '',
    companyName: '',
    jobType: 'Full-time',
    location: '',
    experienceLevel: 'Entry',
    salaryMin: '',
    salaryMax: '',
    jobDescription: '',
    requirements: '',
  })
  const { user } = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const jobData = {
        title:       form.jobTitle,
        description: form.jobDescription,
        company:     form.companyName,
        location:    form.location,
        type:        form.jobType.toLowerCase(),
        experience:  form.experienceLevel.toLowerCase(),
        salary: {
          min:    Number(form.salaryMin),
          max:    Number(form.salaryMax),
          period: 'yearly'
        },
        requirements: form.requirements
      }
      await jobService.createJob(jobData)
      alert('✅ Job posted successfully!')
      navigate('/jobs')
    } catch (error) {
      alert('❌ Failed to post job. Please login as employer first!')
      console.error(error)
    }
  }

  const handleDraft = async () => {
    console.log('Saved as draft:', form)
    alert('Draft saved!')
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link to="/jobs" className="text-2xl font-extrabold tracking-tight text-indigo-700">
            SearFind
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Dashboard</Link>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">My Jobs</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Applicants</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Messages</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">🔔</button>
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">👤</button>
            <button className="bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all">
              Post a Job
            </button>
          </div>
        </div>
        <div className="bg-gray-100 h-px"></div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Page Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Create Job Posting
            </h1>
            <p className="text-gray-500">
              Find your next great hire. Fill in the details below to reach thousands of qualified professionals.
            </p>
          </header>

          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* Section 1: Job Basics */}
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-indigo-700">ℹ️</span>
                <h2 className="text-xl font-bold text-gray-900">Job Basics</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Job Title */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500">Job Title</label>
                  <input
                    name="jobTitle"
                    type="text"
                    placeholder="e.g. Senior Product Designer"
                    value={form.jobTitle}
                    onChange={handleChange}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none transition-all text-gray-900"
                    required
                  />
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500">Company Name</label>
                  <input
                    name="companyName"
                    type="text"
                    placeholder="Your Company Ltd."
                    value={form.companyName}
                    onChange={handleChange}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none transition-all text-gray-900"
                    required
                  />
                </div>

                {/* Job Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500">Job Type</label>
                  <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none transition-all text-gray-900"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                    <option>Internship</option>
                  </select>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500">Location</label>
                  <div className="relative">
                    <input
                      name="location"
                      type="text"
                      placeholder="City, State or Remote"
                      value={form.location}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none transition-all text-gray-900"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📍</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Job Details */}
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-indigo-700">💰</span>
                <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Experience Level */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500">Experience Level</label>
                  <select
                    name="experienceLevel"
                    value={form.experienceLevel}
                    onChange={handleChange}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none transition-all text-gray-900"
                  >
                    <option>Entry</option>
                    <option>Mid</option>
                    <option>Senior</option>
                    <option>Lead</option>
                    <option>Executive</option>
                  </select>
                </div>

                {/* Salary Range */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500">Salary Range (Annual)</label>
                  <div className="flex items-center gap-3">
                    <input
                      name="salaryMin"
                      type="text"
                      placeholder="Min"
                      value={form.salaryMin}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-900"
                    />
                    <span className="text-gray-300">—</span>
                    <input
                      name="salaryMax"
                      type="text"
                      placeholder="Max"
                      value={form.salaryMax}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Descriptions */}
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-indigo-700">📝</span>
                <h2 className="text-xl font-bold text-gray-900">Descriptions</h2>
              </div>
              <div className="space-y-6">

                {/* Job Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500">Job Description</label>
                  <div className="bg-gray-50 rounded-lg border border-gray-200">
                    {/* Toolbar */}
                    <div className="flex gap-2 p-2 bg-white rounded-t-lg border-b border-gray-100">
                      <button type="button" className="p-1 hover:bg-gray-100 rounded font-bold text-sm">B</button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded italic text-sm">I</button>
                      <button type="button" className="p-1 hover:bg-gray-100 rounded text-sm">≡</button>
                    </div>
                    <textarea
                      name="jobDescription"
                      value={form.jobDescription}
                      onChange={handleChange}
                      className="w-full bg-white border-none focus:ring-0 rounded-b-lg p-4 text-gray-900 text-sm resize-none outline-none"
                      placeholder="Describe the role, team, and impact..."
                      rows={6}
                      required
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-500">Key Requirements</label>
                  <textarea
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-900 text-sm resize-none"
                    placeholder="List the essential skills and qualifications..."
                    rows={4}
                  />
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleDraft}
                className="text-gray-500 font-semibold hover:text-indigo-700 transition-colors px-6 py-3"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl active:scale-95 transition-all"
              >
                Post Job
              </button>
            </div>

          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-gray-50 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-7xl mx-auto">
          <div className="mb-6 md:mb-0">
            <div className="font-bold text-gray-900 text-lg mb-2">SearFind Professional</div>
            <p className="text-xs tracking-wide uppercase text-gray-500">© 2024 SearFind Professional. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="text-xs tracking-wide uppercase text-gray-500 hover:text-indigo-500 hover:underline transition-all">Employer Help Center</a>
            <a href="#" className="text-xs tracking-wide uppercase text-gray-500 hover:text-indigo-500 hover:underline transition-all">Privacy Policy</a>
            <a href="#" className="text-xs tracking-wide uppercase text-gray-500 hover:text-indigo-500 hover:underline transition-all">Terms of Service</a>
            <a href="#" className="text-xs tracking-wide uppercase text-gray-500 hover:text-indigo-500 hover:underline transition-all">Cookie Settings</a>
          </div>
        </div>
      </footer>

    </div>
  )
}