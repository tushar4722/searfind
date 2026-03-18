const express = require("express");
const router = express.Router();
router.get("/", (req, res) => res.json({ message: "Learning routes working ✅" }));
module.exports = router;