require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const roomRoute = require("./routes/roomRoute");
const userRoute = require("./routes/userRoute");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;
const FRONT_URL = process.env.FRONT_URL;

const corsOptions = {
  credentials: true,
  origin: [FRONT_URL, "http://example.com"],
  optionsSuccessStatus: 200,
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

//Routes

app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Connect to DB
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
