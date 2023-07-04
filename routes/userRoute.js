const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  logoutUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// Get all users
router.get("/", protect, getAllUsers);

// Get one user
router.get("/:id", protect, getUser);

// Create one user
router.post("/", createUser);

// Update one user
router.put("/:id", protect, updateUser);

// Delete one user
router.delete("/:id", protect, deleteUser);

// Auth a user
router.post("/login", authUser);

// Logout a user
router.post("/logout", logoutUser);

module.exports = router;
