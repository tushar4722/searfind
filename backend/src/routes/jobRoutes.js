const express = require("express");
const router = express.Router();
const {
  getJobs, getJobById, createJob,
  updateJob, deleteJob, applyJob,
  getMyApplications, getMyJobs
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getJobs);
router.get("/my-jobs", protect, getMyJobs);
router.get("/my-applications", protect, getMyApplications);
router.get("/:id", getJobById);
router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
router.post("/:id/apply", protect, applyJob);

module.exports = router;