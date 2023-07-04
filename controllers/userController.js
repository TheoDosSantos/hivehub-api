const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get one user
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create one user
const createUser = asyncHandler(async (req, res) => {
  try {
    const { mail } = req.body;
    const userExist = await User.findOne({ mail });
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    } else {
      const user = await User.create(req.body);
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          firstname: user.firstname,
          mail: user.mail,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update one user
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error(error.message);
    } else {
      user.name = req.body.name || user.name;
      user.firstname = req.body.firstname || user.firstname;
      user.mail = req.body.mail || user.mail;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      return res.json({
        _id: user._id,
        name: user.name,
        firstname: user.firstname,
        mail: user.mail,
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete one user
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404);
      throw new Error(error.message);
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//Auth a user
const authUser = asyncHandler(async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail });
    if (user && (await user.matchPassword(password))) {
      res.cookie("jwt", generateToken(user._id), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.json({
        _id: user._id,
        name: user.name,
        firstname: user.firstname,
        mail: user.mail,
      });
    } else {
      res.status(401);
      throw new Error("Invalid mail or password");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//Logout a user
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  logoutUser,
};
