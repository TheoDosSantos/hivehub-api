const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");

// Get all rooms
const getAllRooms = asyncHandler(async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.status(200).json(rooms);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get one room
const getRoom = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    return res.status(200).json(room);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create one room
const createRoom = asyncHandler(async (req, res) => {
  try {
    const room = await Room.create(req.body);
    return res.status(200).json(room);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update one room
const updateRoom = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndUpdate(id, req.body);
    if (!room) {
      res.status(404);
      throw new Error(error.message);
    }
    const updatedRoom = await Room.findById(id);
    return res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete one room
const deleteRoom = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      res.status(404);
      throw new Error(error.message);
    }
    return res.status(200).json(room);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
