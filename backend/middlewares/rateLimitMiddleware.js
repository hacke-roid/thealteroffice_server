const rateLimit = require("express-rate-limit");

const urlShortenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each user to 10 URL shortenings per 15 minutes
  message: "Too many requests, please try again later.",
});

module.exports = { urlShortenLimiter };
