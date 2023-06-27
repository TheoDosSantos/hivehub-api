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

// Get all rooms
router.get("/", getAllRooms);

// Get a room
router.get("/:id", getRoom);

// Create a room
router.post("/", createRoom);

// Update a room
router.put("/:id", updateRoom);

// Delete a room
router.delete("/:id", deleteRoom);

// Book a room
router.put("/book/:id", bookRoom);

// Get available rooms
router.get("/available/date", getAvailableRooms);

module.exports = router;
