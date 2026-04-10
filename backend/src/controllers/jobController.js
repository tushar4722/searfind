const Job = require('../models/Job')
const Application = require('../models/Application')

// ─── GET ALL JOBS ────────────────────────────────────────────
const getAllJobs = async (req, res) => {
  try {
    const {
      search, location, type, experience,
      minSalary, maxSalary, page = 1, limit = 10
    } = req.query

    const filter = { status: 'active', isApproved: true }

    if (search) {
      filter.$or = [
        { title:   { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills:  { $in: [new RegExp(search, 'i')] } }
      ]
    }

    if (location)  filter.location          = { $regex: location, $options: 'i' }
    if (type)      filter.type              = type
    if (experience) filter.experience       = experience
    if (minSalary) filter['salary.min']     = { $gte: Number(minSalary) }
    if (maxSalary) filter['salary.max']     = { $lte: Number(maxSalary) }

    const skip = (Number(page) - 1) * Number(limit)

    const jobs = await Job.find(filter)
      .populate('postedBy', 'name avatar company')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))

    const total = await Job.countDocuments(filter)

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      jobs
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─── GET SINGLE JOB ─────────────────────────────────────────
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name avatar company')

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    res.status(200).json({ success: true, job })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─── CREATE JOB ─────────────────────────────────────────────
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      type,
      experience,
      salary,
      skills,
      requirements,   // ✅ Added
      deadline
    } = req.body

    const job = await Job.create({
      title,
      description,
      company,
      location,
      type,
      experience,
      salary,
      skills,
      requirements,   // ✅ Added
      deadline,
      postedBy: req.user._id
    })

    res.status(201).json({
      success: true,
      message: 'Job posted successfully!',
      job
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─── UPDATE JOB ─────────────────────────────────────────────
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this job' })
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: 'Job updated successfully!',
      job: updatedJob
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─── DELETE JOB ─────────────────────────────────────────────
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this job' })
    }

    await job.deleteOne()

    res.status(200).json({ success: true, message: 'Job deleted successfully!' })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─── APPLY TO JOB ───────────────────────────────────────────
const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    const alreadyApplied = await Application.findOne({
      job: req.params.id,
      applicant: req.user._id
    })

    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: 'You have already applied to this job' })
    }

    const application = await Application.create({
      job:         req.params.id,
      applicant:   req.user._id,
      coverLetter: req.body.coverLetter,
      resume:      req.body.resume
    })

    job.totalApplications += 1
    await job.save()

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ─── GET MY JOBS (Employer) ──────────────────────────────────
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 })

    res.status(200).json({ success: true, count: jobs.length, jobs })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getAllJobs, getJobById, createJob,
  updateJob, deleteJob, applyToJob, getMyJobs
}