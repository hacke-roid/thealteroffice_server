const redis = require("redis");

const redisClient = redis.createClient({ url: process.env.REDIS_URI });

redisClient.connect()
    .then(() => console.log("✅ Redis Connected"))
    .catch(err => console.error("❌ Redis Connection Error:", err));

module.exports = redisClient;
