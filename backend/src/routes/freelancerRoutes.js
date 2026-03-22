const express = require("express");
const router = express.Router();
const {
  getFreelancers,
  getFreelancerById,
  createFreelancer,
  updateFreelancer,
  deleteFreelancer,
  getMyFreelancerProfile,
  addReview,
} = require("../controllers/freelancerController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getFreelancers);
router.get("/my-profile", protect, getMyFreelancerProfile);
router.get("/:id", getFreelancerById);
router.post("/", protect, createFreelancer);
router.put("/:id", protect, updateFreelancer);
router.delete("/:id", protect, deleteFreelancer);
router.post("/:id/review", protect, addReview);

module.exports = router;