const express = require("express");
const { getUrlAnalytics } = require("../controllers/analyticsController");
const verifyGoogleToken = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/:alias", verifyGoogleToken, getUrlAnalytics);

module.exports = router;
