const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ✅ Create user
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const newUser = await User.create({ name, email, age });
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Error creating user", details: err.message });
  }
});

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users", details: err.message });
  }
});

// ✅ Get a single user
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await User.findById(id);

    if (!singleUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user", details: err.message });
  }
});

// ✅ Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user", details: err.message });
  }
});

// ✅ Update a user
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Error updating user", details: err.message });
  }
});

module.exports = router;
