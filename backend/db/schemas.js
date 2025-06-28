const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    uniusername: String,
    unipassword: String,
    personalData: { email: String, phone: String },
    recurringAppointments: [{ // Keep recurring embedded (small, stable)
        room: String,
        hour: String,
        day: String
    }]
})

const appointmentSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    room: String,
    hour: String,
    date: Date,
    status: String
})


const users = mongoose.model("users", userSchema)
const appointment = mongoose.model("appointment", appointmentSchema)

module.exports = {users, appointment}