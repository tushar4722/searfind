const express = require("express");
const router = express.Router();
router.get("/", (req, res) => res.json({ message: "Message routes ✅" }));
module.exports = router;