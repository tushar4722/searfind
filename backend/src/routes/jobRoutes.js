const express = require('express')
const router = express.Router()
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  getMyJobs
} = require('../controllers/jobController')
const { protect } = require('../middleware/authMiddleware')

router.get('/',              getAllJobs)
router.get('/my-jobs',       protect, getMyJobs)
router.get('/:id',           getJobById)
router.post('/',             protect, createJob)
router.put('/:id',           protect, updateJob)
router.delete('/:id',        protect, deleteJob)
router.post('/:id/apply',    protect, applyToJob)

module.exports = router