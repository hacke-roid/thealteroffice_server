const express = require("express");
const { loginUser, getUserDetails } = require("../controllers/authController");
const verifyGoogleToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/login", verifyGoogleToken, loginUser);
router.get("/userdetails/:userId", getUserDetails);
module.exports = router;
