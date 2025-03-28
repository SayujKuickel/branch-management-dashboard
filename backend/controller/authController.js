const jwt = require("jsonwebtoken");
const db = require("../models");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await db.User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const validPassword = user.password === password;

    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    }

    const userPayload = { name: user.username };

    const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET);

    res.json({ user: username, accessToken });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error while logging in",
    });
  }
};
exports.register = async (req, res) => {
  try {
  } catch (error) {}
};
