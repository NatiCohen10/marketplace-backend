const User = require("../models/users.model");

async function getUserById(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password, ...userWithoutPassword } = user._doc;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (error.name === "CastError") {
      console.log(
        `user.controller, getUserById. user not found with id: ${userId}`
      );
      return res.status(404).json({ message: "user not found" });
    }
    console.log(
      `user.controller, getUserById. Error while getting user with id: ${userId}`,
      error.name
    );
    res.status(500).json({ message: error.message });
  }
}

module.exports = getUserById;
