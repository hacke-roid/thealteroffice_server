const User = require("../model/db.js");

async function loginUser(req, res) {
  try {
    console.log("Extracted User:", req.user); // Debugging
    if (!req.user)
      return res.status(401).json({ message: "User authentication failed" });

    const { email, name, picture } = req.user; // Extract user details from token

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, picture });
      await user.save();
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const getUserDetails = async (req, res, next) => {
  try {
    let { userId } = req.params;
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(201)
      .json({ error: false, message: "User Details", user });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { loginUser, getUserDetails };
