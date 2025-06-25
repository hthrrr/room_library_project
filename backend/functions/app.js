const express = require('express');
const connectDB = require('../config/db');
const settingsRouter = require('./routes/settings.routes');

const app = express();




app.use(express.json());
app.use("/api/setings", settingsRouter)



app.listen(3000, () => {
    connectDB()
    console.log("Server is running on port 3000");
})
