const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../Models/user.model");

// POST route for user registration
router.post(
  "/register",
  [
    // Validation middleware
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    try {
      // Validation result from the request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract user data from the request body
      const { username, email, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      // Create a new user instance
      const newUser = new User({
        username,
        email,
        password,
      });

      // Save the new user to the database
      await newUser.save();

      res.json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  }
);

// POST route for user login
router.post(
  "/login",
  [
    // Validation middleware for login
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    try {
      // Validation result from the request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract user data from the request body
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(400).json({ error: "User not found. Please register." });
      }

      // Check if the password is correct (insecure, use bcrypt in production)
      if (password === user.password) {
        // Successful login
        res.json({ message: "Login successful" });
      } else {
        // Incorrect password
        res.status(401).json({ error: "Incorrect password" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Error during login" });
    }
  }
);

module.exports = router;
