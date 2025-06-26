const express = require('express');
const connectDB = require('./config/db');
const settingsRouter = require('./routes/settings.routes');
const orderRouter = require('./routes/order.routes');

const app = express();


app.use(express.json());    
app.use("/api/settings", settingsRouter)
app.use("/api/order", orderRouter)
app.use(express.static('../frontend/public'))

app.post('/', (req, res) => {
    res.send("Hello World");
    console.log("Hello World");
})

app.listen(3000, () => {
    connectDB()
    console.log("Server is running on port 3000");
    console.log("localhost")
})
