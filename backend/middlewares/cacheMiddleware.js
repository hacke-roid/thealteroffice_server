const redisClient = require("../utils/auth");

const cacheAnalytics = async (req, res, next) => {
    try {
        const { alias } = req.params;
        const cachedData = await redisClient.get(`analytics:${alias}`);

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        next();
    } catch (error) {
        console.error("Redis cache error:", error);
        next();
    }
};

module.exports = { cacheAnalytics };
