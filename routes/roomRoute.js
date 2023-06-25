const express = require("express");
const Room = require("../models/roomModel");
const {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const router = express.Router();

// Get all rooms
router.get("/", getAllRooms);

// Get one room
router.get("/:id", getRoom);

// Create one room
router.post("/", createRoom);

// Update one room
router.put("/:id", updateRoom);

// Delete one room
router.delete("/:id", deleteRoom);

module.exports = router;
