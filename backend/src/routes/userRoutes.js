const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  uploadResume,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:id", getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/upload-avatar", protect, uploadAvatar);
router.post("/upload-resume", protect, uploadResume);

module.exports = router;