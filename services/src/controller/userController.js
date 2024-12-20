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

// Update user
exports.updateUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          res.status(500).json(error);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json({ message: "Account has been updated." });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json({ message: "Invalid user Id..." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Account has been deleted." });
      } catch (error) {
        res.status(404).json(error);
      }
    } else {
      return res.status(403).json({ message: "Invalid user id." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get single user
exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {password,createdAt,updatedAt,...others} = user._doc
    res.status(200).json(others);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Follow a user
// Unfollow a user
