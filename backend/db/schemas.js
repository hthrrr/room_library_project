const mongoose = require("mongoose")

const SettingsSchema = mongoose.Schema({
    
    orders: {
        type: [{
            // Define your dictionary structure here
            room: String,
            hour: String,
            day: String
        }],
        default: [],
        required: true
    },
    user: {
        type: String,
        required: true  
    }

})

const orderSchema = mongoose.Schema({
    room: String,
    hour: String,
    day: String,
    date: Date,
    user: String
})

const Orders = mongoose.model("Order", orderSchema)
const Settings = mongoose.model("Settings", SettingsSchema)

module.exports = {Settings, Orders}