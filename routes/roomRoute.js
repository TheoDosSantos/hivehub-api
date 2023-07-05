const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  bookRoom,
  getAvailableRooms
} = require("../controllers/roomController");
const protect = require("../middleware/authMiddleware");

// Get all rooms
router.get("/", protect, getAllRooms);

// Get a room
router.get("/:id", protect, getRoom);

// Create a room
router.post("/", protect, createRoom);

// Update a room
router.put("/:id", protect, updateRoom);

// Delete a room
router.delete("/:id", protect, deleteRoom);

// Book a room
router.put("/book/:id", protect, bookRoom);

// Get available rooms
router.post("/available/date", protect, getAvailableRooms);

module.exports = router;
