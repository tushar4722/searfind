import api from './api'

// Get all jobs with filters
const getAllJobs = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString()
  const response = await api.get(`/jobs?${params}`)
  return response.data
}

// Get single job
const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`)
  return response.data
}

// Create job
const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData)
  return response.data
}

// Update job
const updateJob = async (id, jobData) => {
  const response = await api.put(`/jobs/${id}`, jobData)
  return response.data
}

// Delete job
const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`)
  return response.data
}

// Apply to job
const applyToJob = async (id, applicationData) => {
  const response = await api.post(`/jobs/${id}/apply`, applicationData)
  return response.data
}

// Get my jobs (employer)
const getMyJobs = async () => {
  const response = await api.get('/jobs/my-jobs')
  return response.data
}

const jobService = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  getMyJobs
}

export default jobService