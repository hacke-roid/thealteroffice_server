const shortid = require("shortid");
const User = require("../model/urlModel.js");
const redisClient = require("../utils/redisClient");
// const shortid = require("shortid");
// const { nanoid } = require("nanoid");

async function shortenUrl(req, res) {
  try {
    console.log(req.body)
    const { userId, longUrl, customAlias } = req.body;
    console.log(customAlias)
    let shortId = shortid(8);
    let urlData = await User.findOne({ userId: userId });
    // console.log(urlData)
    if (!urlData) {
      urlData = await User.create({
        userId: userId,
        url: {
          shortUrl: shortId,
          longUrl: longUrl,
          customAlias: customAlias,
          totalClicks: [],
        },
      });
    } else {
      urlData.url.push({
        shortUrl: shortId,
        longUrl: longUrl,
        customAlias: customAlias,
        totalClicks: [],
      });
      await urlData.save();
    }

    console.log(urlData)

    return res.status(201).json({
      error: false,
      message: "Short url created successfully",
      urlData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error shortening URL", error: error.message });
  }
}

const getData = async (req, res, next) => {
  try {
    let { userId } = req.params;
    // console.log(userId);
    const user = await User.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(user);
    return res
      .status(200)
      .json({ error: false, message: "User fetched successfully", user });
  } catch (err) {
    next(err);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    // console.log(shortId);
    const entry = await User.findOneAndUpdate(
      { "url.shortUrl": shortId }, // Look inside the array
      {
        $push: {
          "url.$.totalClicks": {
            timestamps: Date.now(),
          },
        },
      },
      { new: true } // Returns the updated document
    );

    if (!entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // Find the correct URL object
    const urlObject = entry.url.find((u) => u.shortUrl === shortId);
    
    if (!urlObject) {
      return res.status(404).json({ message: "Short URL not found in the document" });
    }

    console.log(urlObject);
    res.redirect(urlObject.longUrl);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { shortenUrl, redirectUrl, getData };
