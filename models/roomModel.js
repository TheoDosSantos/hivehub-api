const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Room name is required"],
        },
        slot: {
            type: Number,
            required: true,
            default: 1,
        },
        hourlyRate: {
            type: Number,
            required: true,
            default: 2,
        },
        description: {
            type: String,
            required: [true, "Room description is required"],
        },
        arduinoID: {
            type: String,
            required: [true, "Room ArduinoID is required"],
        },
        disponibility: {
            type: String,
            required: false,
            default: "Disponible",
        },

    },
    {
        timestamps: true,
    }
)

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;