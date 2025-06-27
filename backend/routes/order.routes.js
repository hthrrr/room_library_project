const express = require('express')
const {Settings, Orders} = require('../db/schemas')
const orderRoom = require('../controller/web_scraper')

const router =  express.Router()

router.post('/order_room', async (req, res) => {
    try {
        console.log('order_room api call')
        const room = req.body.room
        const day = req.body.day
        const hour = req.body.hour

        const date = getNextRelevantDate(day, hour)
        const unixTime = new Date(date).getTime()/1000
        console.log("ordering room" + room + " at " + date)
        console.log('unix time - ' + unixTime)
        const status = await orderRoom(room, unixTime)        
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/add_order', (req, res) => {
    try {
        const room = req.body.room
        cancel_order(room)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/get_orders', async (req, res) => {
    try{
    const user = req.body.user
    const usersOrders = await Orders.find({user: user})
    res.status(200).json({orders: usersOrders})
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})



const getNextRelevantDate = (dayOfWeek, hour) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const targetDay = days.indexOf(dayOfWeek.toLowerCase());
    
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    
    let daysToAdd = (targetDay - currentDay + 7) % 7;
    
    // If it's the same day but the hour has passed, move to next week
    if (daysToAdd === 0 && parseInt(hour) <= currentHour) {
        daysToAdd = 7;
    }
    
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + daysToAdd);
    targetDate.setHours(parseInt(hour), 0, 0, 0);
    
    const dateString =  targetDate.toISOString();
    console.log('date string - ' + dateString)
    return dateString;
}

module.exports = router