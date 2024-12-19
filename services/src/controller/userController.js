const User = require("../model/User");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully..." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).json({ message: "Incorrect password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.SECRET_KEY, // Secret key
      { expiresIn: "7d" } // Token expiration set to 7 days
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,  
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
