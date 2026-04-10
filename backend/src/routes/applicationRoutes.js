const express = require('express')
const router = express.Router()
const Application = require('../models/Application')
const Job = require('../models/Job')
const { protect } = require('../middleware/authMiddleware')

// GET /api/applications/my-applications (job seeker)
router.get('/my-applications', protect, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location type salary')
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: applications.length, applications })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// GET /api/applications/my-job-applicants (employer)
router.get('/my-job-applicants', protect, async (req, res) => {
  try {
    const myJobs = await Job.find({ postedBy: req.user._id })
    const jobIds = myJobs.map(j => j._id)
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('applicant', 'name email avatar role')
      .populate('job', 'title company location type')
      .sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: applications.length, applications })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router