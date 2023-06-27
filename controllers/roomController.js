const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");
const moment = require("moment");

const today = moment(new Date()).format("yyyy-MM-DD[T]HH:mm");
console.log(today);

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

// Get a room
const getRoom = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404);
      throw new Error("Cannot get room");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a room
const createRoom = asyncHandler(async (req, res) => {
  try {
    const room = await Room.create(req.body);
    return res.status(200).json(room);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a room
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

// Delete a room
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

// Book a room
const bookRoom = asyncHandler(async (req, res) => {
  try {
    const { startDateTime, endDateTime, userid } = req.body;
    const room = await Room.findById(req.params.id);
    if (room) {
      room.booking.push({
        startDate: startDateTime,
        endDate: endDateTime,
        user: userid,
      });
      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } else {
      res.status(404);
      throw new Error("Cannot get meeting room");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Find available rooms
const getAvailableRooms = asyncHandler(async (req, res) => {
  try {
    const { startDateTime, endDateTime } = req.body;
    const rooms = await Room.find({});
    const availableRooms = rooms.filter((room) => {
      const booking = room.booking;
      const isAvailable = booking.every((book) => {
        return (
          moment(startDateTime).isBefore(book.startDate) ||
          moment(endDateTime).isAfter(book.endDate)
        );
      });
      return isAvailable;
    });
    res.json(availableRooms);
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
  bookRoom,
  getAvailableRooms,
};
