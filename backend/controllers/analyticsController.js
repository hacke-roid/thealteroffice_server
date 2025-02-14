const Url = require("../model/urlModel.js");

async function getUrlAnalytics(req, res) {
    try {
        const { alias } = req.params;
        const url = await Url.findOne({ alias });

        if (!url) return res.status(404).json({ message: "URL not found" });

        res.json({ totalClicks: url.clicks.length, analytics: url.clicks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics", error: error.message });
    }
}

module.exports = { getUrlAnalytics };
