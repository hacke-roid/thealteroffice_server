const express = require("express");
const {
  shortenUrl,
  redirectUrl,
  getData,
} = require("../controllers/urlController");
const verifyGoogleToken = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:shortId", redirectUrl);
router.get("/user/:userId", getData);

module.exports = router;
